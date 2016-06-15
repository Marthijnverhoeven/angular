/// <reference path="../ts/_all.ts" />

namespace Application.Controller
{
	'use strict'
	
	// Declarations
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
	export class GameHistoryController
	{
		public currentGame: Application.Model.Game;
		public selectedPlayer: any;
		
		constructor(
			game: IResult<Application.Model.Game>,
			tiles: IResult<Application.Model.Tile[]>,
			private $filter)
		{
			var self = this;
			this.currentGame = new Application.Model.Game(game.data);
								
			var tileObjects = []
			for(var tileLiteral of tiles.data)
			{
				tileObjects.push(new Application.Model.Tile(tileLiteral));
			}
			this.currentGame.setTiles(tileObjects);
			
			// this.selectedPlayer = this.currentGame.players[0]
		}
		
		public onEven(i: number) : string
		{
			return i % 2 == 0
				? '' // 0, 2, 4
				: 'margin-right: 20px;' // 1, 3, 5
		}
	}
}