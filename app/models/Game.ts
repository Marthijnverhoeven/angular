/// <reference path="../ts/_all.ts" />

namespace Application.Model
{
	export class Game
	{
		_id: string;
		createdBy: 
		{
			_id: string,
			name: string,
			__v: number,
			id: string
		};
		createdOn: string;
		startedOn: string;
		endedOn: string;
		gameTemplate: {
			_id: string,
			__v: number,
			id: string
		};
		__v: number;
		players: {
			_id: string,
			name: string,
			__v: number,
			id: string
		}[];
		maxPlayers: number;
		minPlayers: number;
		state: string;
		id: string;
		tiles: Tile[];
		matched: Tile[];

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

		public getMatchedTiles() : any {
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