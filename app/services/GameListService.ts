/// <reference path="../ts/_all.ts" />

namespace Application.Service {
	'use strict';

	// Libs
	declare type IHttpService = angular.IHttpService;

	// Models
	declare type Game = Application.Model.Game;

	export class GameListService {
		constructor(
			private $http: IHttpService,
			private configuration: Application.Constant.Configuration,
			private AuthService: Application.Service.AuthService)
		{ }

		// POST - /games
		public create(template: string, minPlayers: number, maxPlayers: number, onSuccess: (game: Game) => void, onError: (error) => void): angular.IPromise<Game> {
			var self = this;
			return self.request<Game>(
				'POST',
				'/games',
				{
					templateName: template,
					minPlayers: minPlayers,
					maxPlayers: maxPlayers
				},
				(result: angular.IHttpPromiseCallbackArg<Game>) => {
					onSuccess(new Application.Model.Game(result.data));
				},
				onError
			);
		}

		// GET - /games
		public readAll(args?: { name: string, value: string }[], onSuccess?: (games: Game[]) => void, onError?: (error) => void): angular.IPromise<Game[]>
		{	
			var fallback = () => { };

			onSuccess = onSuccess || fallback;
			onError = onError || fallback;

			var argumentString: string = "";
			if (args != null) {
				for (var i = 0; i < args.length; i++) {
					if (i != 0) {
						argumentString += "&";
					}
					else {
						argumentString += "?";
					}
					argumentString += args[i].name;
					argumentString += "=";
					argumentString += args[i].value;
				}
			}

			var self = this;
			return self.request<Game[]>(
				'GET',
				'/games' + argumentString,
				null,
				(result: angular.IHttpPromiseCallbackArg<Game[]>) => {
					var games = [];
					for (var game of result.data) {
						games.push(new Application.Model.Game(game));
					}
					onSuccess(games);
				},
				onError
			);
		}

		// GET - /games
		public readCreated(onSuccess?: (games: Game[]) => void, onError?: (error) => void): angular.IPromise<Game[]> {
			var fallback = () => { };

			onSuccess = onSuccess || fallback;
			onError = onError || fallback;

			var self = this;
			return self.request<Game[]>(
				'GET',
				'/games?createdBy=' + self.AuthService.user.name,
				null,
				(result: angular.IHttpPromiseCallbackArg<Game[]>) => {
					var games = [];
					for (var game of result.data) {
						games.push(new Application.Model.Game(game));
					}
					onSuccess(games);
				},
				onError
			);
		}

		// DELETE - /games/{id}
		public delete(id: string, onSuccess: (gameId: string) => void, onError: (error) => void): angular.IPromise<any> {
			var self = this;
			return self.request<any>(
				'DELETE',
				'/games/' + id,
				null,
				(result: angular.IHttpPromiseCallbackArg<any>) => {
					onSuccess(id);
				},
				onError
			);
		}

		private request<T>(method: string, url: string, data: any, onSuccess: (result: angular.IHttpPromiseCallbackArg<T>) => void, onError: (result: angular.IHttpPromiseCallbackArg<any>) => void): angular.IPromise<T> {
			var self = this;
			var promise = this.$http<T>({
				method: method,
				url: self.configuration.apiUrl + url,
				data: data || {}
			});
			promise.then(onSuccess, onError);
			return promise;
		}
	}
}