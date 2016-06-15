/// <reference path="../ts/_all.ts" />

namespace Application.Controller
{
	'use strict'
	
	// Declarations
	declare var io: SocketIOStatic;
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
	export class GameBoardController
	{
		public currentGame: Application.Model.Game;
		
		constructor(
			$scope,
			game: IResult<Application.Model.Game>,
			tiles: IResult<Application.Model.Tile[]>,
			private $stateParams: angular.ui.IStateParamsService,
			private SocketService: Application.Service.SocketService)
		{
			var self = this;
			
			SocketService.connect([self.$stateParams['id']]);
			SocketService.onStart(() =>
			{
				alert('Game started');
				self.currentGame.state = "playing"
			});
			
			SocketService.onEnd(() =>
			{
				alert('Game ended');
				self.currentGame.state = "finished"
			})
			SocketService.onJoined((player) =>
			{
				console.log(player);
				alert('A new competitor appeared (or something)');
				self.currentGame.players.push(player);
			})
			SocketService.onMatch((matchedTiles) =>
			{
				// console.log(matchedTiles[0].match.foundBy + ' found a match!');
				self.currentGame.addMatchedTile(matchedTiles[0], matchedTiles[1]);
			});
			
			
			this.currentGame = new Application.Model.Game(game.data);
								
			var tileObjects = []
			for(var tileLiteral of tiles.data)
			{
				tileObjects.push(new Application.Model.Tile(tileLiteral));
			}
			this.currentGame.setTiles(tileObjects);
		}
		
		public getCurrentGame()
		{
			return this.currentGame;
		}
	}
}