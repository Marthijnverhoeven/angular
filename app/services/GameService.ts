/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	// Lib
	declare type IHttpService = angular.IHttpService;
	declare type IPromise<T> = angular.IPromise<T>;
	
	// Models
	declare type Tile = Application.Model.Tile;
	declare type Game = Application.Model.Game;
	
	export class GameService
	{
		constructor(private $http: IHttpService, private configuration: Application.Constant.Configuration)
		{ }
		
		// GET - /games/{id}
		public read(id : string, onSuccess?: (game: Game) => void, onError?: (error) => void) : angular.IPromise<Game>
		{
			var fallback = () => {};
			
			onError = onError || fallback;
			onSuccess = onSuccess || fallback;
			
			var self = this;
			return self.request<Game>(
				'GET',
				'/games/' + id,
				null,
				(result: angular.IHttpPromiseCallbackArg<Game>) =>
				{
					onSuccess(new Application.Model.Game(result.data));
				},
				onError
			);
		}
		
		// POST - /games/{id}/start
		public start(id : string, onSuccess: (gameId: string) => void, onError: (error) => void) : IPromise<any>
		{
			var self = this;
			return self.request(
				'POST',
				'/games/' + id + '/start',
				null,
				(result: angular.IHttpPromiseCallbackArg<any>) =>
				{
					onSuccess(id);
				},
				onError	
			);
		}
		
		// POST - /games/{id}/players
		public join(id : string, onSuccess: (gameId: string) => void, onError: (error) => void) : IPromise<any>
		{
			var self = this;
			return self.request(
				'POST',
				'/games/' + id + '/players',
				null,
				(result: angular.IHttpPromiseCallbackArg<any>) =>
				{
					onSuccess(id);
				},
				onError			
			);
		}
		
		// GET - /games/{id}/tiles
		public tiles(id : string, onSuccess?: (tiles: Tile[]) => void, onError?: (error) => void) : IPromise<Tile[]>
		{
			var fallback = () => {};
			
			onSuccess = onSuccess || fallback;
			onError = onError || fallback;
			
			var self = this;
			return self.request(
				'GET',
				'/games/' + id + '/tiles',
				null,
				(result: angular.IHttpPromiseCallbackArg<Tile[]>) =>
				{
					var tiles = []
					for(var tileLiteral of result.data)
					{
						tiles.push(new Application.Model.Tile(tileLiteral));
					}
					onSuccess(tiles);
				},
				onError
			);
		}
		
		// POST - /games/{id}/tiles/matches
		public match(id : string, tile1Id: string, tile2Id: string, onSuccess: (tiles) => void, onError: (error) => void) : IPromise<any> 
		{
			console.log('match', tile1Id, tile2Id);
			var self = this;
			return self.request(
				'POST',
				'/games/' + id + '/tiles/matches',
				{ tile1Id: tile1Id, tile2Id: tile2Id },
				(result: angular.IHttpPromiseCallbackArg<any>) => 
				{
					onSuccess(result.data);
				},
				onError
			);
		}
		
		private request<T>(method: string, url: string, data: any, onSuccess: (result: angular.IHttpPromiseCallbackArg<T>) => void, onError: (result: angular.IHttpPromiseCallbackArg<any>) => void) : angular.IPromise<T>
		{
			var self = this;
			var options = <any>{
				method: method,
				url: self.configuration.apiUrl + url
			}
			if(data)
			{
				options.data = data;
			}
			var promise = this.$http<T>(options)
			promise.then(onSuccess, onError);
			return promise;
		}
	}
}