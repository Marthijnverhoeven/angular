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
	
	
	// Services
	
	
	export class GameService
	{
		public currentTiles: Tile[];
		public currentGame: Game;
		
		constructor(private $http: IHttpService, private configuration: Application.Constant.Configuration)
		{ }
		
		// POST - /games/{id}/start
		public start(id : number) : IPromise<any>
		{
			var self = this;
			return self.request(
				'POST',
				'/games/' + id + '/start',
				null,
				(result: angular.IHttpPromiseCallbackArg<any>) =>
				{ },
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}				
			);
		}
		
		// POST - /games/{id}/players
		public join(id : number) : IPromise<any>
		{
			var self = this;
			return self.request(
				'POST',
				'/games/' + id + '/tiles/matches',
				null,
				(result: angular.IHttpPromiseCallbackArg<any>) =>
				{ },
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}				
			);
		}
		
		// GET - /games/{id}/tiles
		public tiles(id : number) : IPromise<Tile[]>
		{
			var self = this;
			return self.request(
				'GET',
				'/games/' + id + '/tiles/matches',
				null,
				(result: angular.IHttpPromiseCallbackArg<Tile[]>) =>
				{
					self.currentTiles = result.data;
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}				
			);
		}
		
		// POST - /games/{id}/tiles/matches
		public match(id : number, tile1Id: string, tile2Id: string) : IPromise<any> 
		{
			var self = this;
			return self.request(
				'POST',
				'/games/' + id + '/tiles/matches',
				{ tile1Id: tile1Id, tile2Id: tile2Id },
				(result: angular.IHttpPromiseCallbackArg<any>) =>
				{ },
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}				
			);
		}
		
		private request<T>(method: string, url: string, data?: any, onSuccess?: (result: angular.IHttpPromiseCallbackArg<T>) => void, onError?: (result: angular.IHttpPromiseCallbackArg<any>) => void) : angular.IPromise<T>
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
	}
}