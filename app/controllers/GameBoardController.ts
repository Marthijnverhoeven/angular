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
		
		constructor(game: IResult<Application.Model.Game>,
			tiles: IResult<Application.Model.Tile[]>,
			private $stateParams: angular.ui.IStateParamsService)
		{
			var self = this;
			var socket = io('http://mahjongmayhem.herokuapp.com?gameId=' + self.$stateParams['id']);
			// start, end, playerJoined, match
			socket.on('start', () =>
			{
				alert('Game started');
				self.currentGame.state = "playing"
			}).on('end', () =>
			{
				alert('Game ended');
				self.currentGame.state = "finished"
			}).on('playerJoined', (player) =>
			{
				console.log(player);
				alert('A new competitor appeared (or something)');
				self.currentGame.players.push(player);
			}).on('match', (matchedTiles) =>
			{
				console.log(matchedTiles[0].match.foundBy + ' found a match!');
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
	}
}