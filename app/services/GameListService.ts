/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict';
	
	// Libs
	declare var _ : UnderscoreStatic;
	declare type IHttpService = angular.IHttpService;
	
	// Temps
	declare type callback<T> = (data: T) => void;
	
	// Models
	declare type Game = Application.Model.Game;
	
	export class GameListService
	{
		private games = [
			<Game>{
				"_id": "5759d218e22c671100821f5a",
				"createdBy": {
					"_id": "rjl.ernens@student.avans.nl",
					"name": "Roel Ernens",
					"__v": 0
				},
				"createdOn": "2016-06-09T20:31:20.802Z",
				"gameTemplate": {
					"_id": "Ox",
					"__v": 0,
					"id": "Ox"
				},
				"__v": 0,
				"players": [
				{
					"_id": "rjl.ernens@student.avans.nl",
					"name": "Roel Ernens",
					"__v": 0
				}
				],
				"maxPlayers": 32,
				"minPlayers": 2,
				"state": "open",
				"id": "5759d218e22c671100821f5a"
			},
			<Game>{
				"_id": "5759d106e22c671100821ec9",
				"createdBy": {
				"_id": "rjl.ernens@student.avans.nl",
				"name": "Roel Ernens",
				"__v": 0
				},
				"createdOn": "2016-06-09T20:26:46.524Z",
				"gameTemplate": {
				"_id": "Ox",
				"__v": 0,
				"id": "Ox"
				},
				"__v": 0,
				"players": [
				{
					"_id": "rjl.ernens@student.avans.nl",
					"name": "Roel Ernens",
					"__v": 0
				}
				],
				"maxPlayers": 32,
				"minPlayers": 2,
				"state": "open",
				"id": "5759d106e22c671100821ec9"
			}
		]
		
		public allGames: Game[];
		public currentGame: Game;
		public createdGame: Game;
		
		constructor(private $http: IHttpService, private configuration: Application.Constant.Configuration)
		{
			this.allGames = [];
		}
		
		// POST - /games
		public create(template : string, minPlayers : number, maxPlayers : number) : angular.IPromise<Game>
		{
			var self = this;
			return self.request<Game>(
				'POST',
				'/games',
				(result: angular.IHttpPromiseCallbackArg<Game>) =>
				{
					self.createdGame = result.data;
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				},
				{
					template: template,
					minPlayers: minPlayers,
					maxPlayers: maxPlayers
				}
			);
		}
		
		// GET - /games
		public readAll() : angular.IPromise<Game[]>
		{
			var self = this;
			return self.request<Game[]>(
				'GET',
				'/games',
				(result: angular.IHttpPromiseCallbackArg<Game[]>) =>
				{
					self.allGames = result.data
					// onSuccess(result.data);
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}
			);
		}
		
		// GET - /games/{id}
		public read(id : number) : angular.IPromise<Game>
		{
			var self = this;
			return self.request<Game>(
				'GET',
				'/games/' + id,
				(result: angular.IHttpPromiseCallbackArg<Game>) =>
				{
					self.currentGame = result.data
					// onSuccess(result.data);
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}
			);
		}
		
		// DELETE - /games/{id}
		public delete(id : number, onSuccess?: callback<any>, onError?: callback<any>) : angular.IPromise<any>
		{
			var self = this;
		 	return self.request<any>(
				'DELETE',
				'/games/' + id,
				(result: angular.IHttpPromiseCallbackArg<any>) =>
				{
					onSuccess(result.data);
				},
				onError
			);	
		}
		
		private request<T>(method: string, url: string, onSuccess?: (result: angular.IHttpPromiseCallbackArg<T>) => void, onError?: (result: angular.IHttpPromiseCallbackArg<any>) => void, data?: any) : angular.IPromise<T>
		{
			console.log(url);
			var self = this;
			var promise = this.$http<T>({
				method: method,
				url: self.configuration.apiUrl + url
			});
			promise.then(onSuccess, onError);
			return promise;
		}
		
		// public GET(id, callBack) {
		// 	var self = this;
		// 	self.$timeout(function () {
		// 		if (_.isFunction(id)) {
		// 			callBack = id; //First param is the callback
		// 			return callBack(self.games);
		// 		}
		// 		else {
		// 			var result = _.findWhere(self.games, { id: id });
		// 			return callBack(result);
		// 		}

		// 	}, 1000);
		// }
		
		// public PUT(game) {
		// 	// stub
		// 	throw new Error('NotImplementedError');
		// }
		
		// public POST(game) {
		// 	var self = this;
		// 	var ids = [];
			
		// 	for(var i = 0; i < self.games.length; i++) {
		// 		ids.push(self.games[i].id);
		// 	}
			
		// 	var largest = Math.max.apply(Math, ids);
		// 	var newID = largest + 1;

		// 	game.id = newID;
		// 	self.games.push(game);
		// }
		
		// public DELETE(game) {
		// 	// fake
		// 	throw new Error('NotImplementedError');
		// }
	}
}