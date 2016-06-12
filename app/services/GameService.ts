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
	
	// Misc
	declare type matchResult = { isMatched: boolean, isSelected: boolean };
	
	export class GameService
	{
		public currentTiles: Tile[];
		public currentGame: Game;
		
		constructor(private $http: IHttpService, private configuration: Application.Constant.Configuration)
		{ }
		
		// POST - /games/{id}/start
		public start(id : string) : IPromise<any>
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
		public join(id : string) : IPromise<any>
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
		public tiles(id : string) : IPromise<Tile[]>
		{
			var self = this;
			return self.request(
				'GET',
				'/games/' + id + '/tiles',
				null,
				(result: angular.IHttpPromiseCallbackArg<Tile[]>) =>
				{
					self.currentTiles = []
					for(var tileLiteral of result.data)
					{
						self.currentTiles.push(new Application.Model.Tile(tileLiteral));
					}
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}				
			);
		}
		
		// POST - /games/{id}/tiles/matches
		public match(id : string, tile1Id: string, tile2Id: string) : IPromise<any> 
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
		
		public matchTile(tile: Tile) : void
		{
			var self = this;
			
			// remove tiles from selected tiles if it is selected
			// for(var i = 0; i < self.currentTiles.length; i++)
			// {
			// 	if(self.currentTiles[i]._id === tile._id && self.currentTiles[i].matchAttempt.isSelected)
			// 	{
			// 		// self.currentTiles[i].matchAttempt.isSelected = false;
			// 		// self.currentTiles[i].matchAttempt.isMatched = false;
			// 		tile.matchAttempt.isSelected = false;
			// 		tile.matchAttempt.isMatched = false;
			// 		return;
			// 	}
			// }
			
			if(tile.matchAttempt.isSelected)
			{
				console.log('unselecting');
				tile.matchAttempt.isSelected = false;
				return;
			}
			else // tile.matchAttempt.isSelected === false 
			{
				tile.matchAttempt.isSelected = true;
				var selected = this.getSelectedIndice();
				if(selected.length == 2)
				{
					var tile1 = self.currentTiles[selected[0]];
					var tile2 = self.currentTiles[selected[1]];
					if(tile1.canMatch(tile2))
					{
						// todo: match tiles
						console.log('match');
						tile1.matchAttempt.isMatched = true;
						tile2.matchAttempt.isMatched = true;
						tile1.matchAttempt.isSelected = false;
						tile2.matchAttempt.isSelected = false;
						return;
					}
					console.log('no match');
					console.log(tile1, tile2);
					tile1.matchAttempt.isSelected = false;
					tile2.matchAttempt.isSelected = false;
					return;
				}
				console.log('misc');
				tile.matchAttempt.isSelected = true;
				return;
			}
		}
		
		public canAddMatch(tile: Tile) : boolean
		{
			return this.getSelectedIndice().length < 2;
		}
		
		public getTile(id: string) : Tile
		{
			if(!this.currentTiles)
				throw new Error('Game not initialized.');
			for(var tile of this.currentTiles)
			{
				if(tile._id === id)
				{
					return tile;
				}
			}
		}
		
		private getSelectedIndice() : string[]
		{
			var self = this,
				selected = [];
			for(var i = 0; i < self.currentTiles.length; i++)
			{
				if(self.currentTiles[i].matchAttempt.isSelected)
				{
					selected.push(i);
				}
			}
			return selected;
		}
		
		public isTileBlocked(tile: Tile) : boolean
		{
			return tile.isTileBlockedBy(this.currentTiles);
		}
	}
}