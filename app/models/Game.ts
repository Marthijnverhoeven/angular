/// <reference path="../ts/_all.ts" />

namespace Application.Model
{	
	namespace Application.Model.Game
	{
		export class Player
		{
			_id: string;
			name: string;
			__v: number;
			id: string;
		}
		
		export class Template
		{
			_id: string;
			__v: number;
			id: string;
		}
	}
	
	export class Game
	{
		_id: string;
		createdBy: Application.Model.Game.Player;
		createdOn: string;
		startedOn: string;
		endedOn: string;
		gameTemplate: Application.Model.Game.Player;
		__v: number;
		players: Application.Model.Game.Player[];
		maxPlayers: number;
		minPlayers: number;
		state: string;
		id: string;
		
		tiles: Tile[];
		matched: Tile[];
		
		constructor(literal: any)
		{
			for(var key of Object.keys(literal))
			{
				this[key] = literal[key];
			}
		}

		public getAvailableTiles() : Tile[] {
			var available = [];
			
			for(var tile of this.tiles) {
				if(!tile.isTileBlockedBy(this.tiles)) {
					available.push(tile);
				}
			}

			return available;
		}

		public getUnavailableAvailableTiles() : Tile[] {
			var unAvailable = [];
			
			for(var tile of this.tiles) {
				if(tile.isTileBlockedBy(this.tiles)) {
					unAvailable.push(tile);
				}
			}

			return unAvailable;
		}

		public getMatchedTilesByPlayer() : any {
			var matchedList = {};

			for(var player of this.players) {
				matchedList[player.name] = [];
			}

			for(var tile of this.matched) {
				matchedList[tile.match.foundBy].push(tile);
			}

			return matchedList;
		}
	}
}