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

			for(var tile of this.tiles) {
				if(!!tile.match && !!tile.match.foundBy)
				{
					matchedList[tile.match.foundBy].push(tile);
				}
				
			}

			return matchedList;
		}
		
		// FSK
		
		public setTiles(tiles: Tile[])
		{
			this.tiles = tiles;
			this.resetBlockedTiles();
		}
		
		public canJoin(user: User) : boolean
		{
			var self = this;
			return self.state === 'open'
				&& self.players.length < self.maxPlayers
				&& (() : boolean => {
					for(var player of self.players)
					{
						if(player._id == user.name)
						{
							return false;
						}
					}
					return true;
				})(); 
		}
		
		public canStart(user: User) : boolean
		{
			var self = this;
			return self.state === 'open'
				&& self.createdBy._id === user.name
				&& self.players.length >= self.minPlayers;
		}
		
		public addMatchedTile(tile1: Tile, tile2: Tile)
		{
			var self = this;
			for(var i = 0; i< self.tiles.length; i++)
			{
				if(self.tiles[i]._id === tile1._id)
				{
					self.tiles[i].match = tile1.match;
					continue;
				}
				
				if(self.tiles[i]._id === tile2._id)
				{
					self.tiles[i].match = tile2.match;
				}
			}
			self.resetBlockedTiles();
		}
		
		public matchTile(tile: Tile, onMatch: (tile1: Tile, tile2: Tile) => void) : void
		{
			var self = this;
			
			if(tile.matchAttempt.isSelected)
			{
				console.log('unselecting');
				tile.matchAttempt.isSelected = false;
				return;
			}
			else // tile.matchAttempt.isSelected === false 
			{
				tile.matchAttempt.isSelected = true;
				
				var selected = self.getSelectedIndice();
				if(selected.length == 2)
				{
					var tile1 = self.tiles[selected[0]];
					var tile2 = self.tiles[selected[1]];
					if(tile1.canMatch(tile2))
					{
						console.log('match');
						tile1.matchAttempt.isMatched = true;
						tile2.matchAttempt.isMatched = true;
						tile1.matchAttempt.isSelected = false;
						tile2.matchAttempt.isSelected = false;
						onMatch(tile1, tile2);
						self.resetBlockedTiles();
						return;
					}
					console.log('no match');
					tile1.matchAttempt.isSelected = false;
					tile2.matchAttempt.isSelected = false;
					return;
				}
				console.log('misc');
				tile.matchAttempt.isSelected = true;
				return;
			}
		}
		
		private resetBlockedTiles()
		{
			var self = this;
			for(var tile of self.tiles)
			{				
				tile.isTileBlockedBy(self.tiles);
			}
		}
		
		public canAttemptMatch() : boolean
		{
			// currentPlayere is player, gamestate is cool etc.
			return this.getSelectedIndice().length < 2;
		}
		
		public getTile(id: string) : Tile
		{
			for(var tile of this.tiles)
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
			for(var i = 0; i < self.tiles.length; i++)
			{
				if(self.tiles[i].matchAttempt.isSelected)
				{
					selected.push(i);
				}
			}
			return selected;
		}
		
		public isTileBlocked(tile: Tile) : boolean
		{
			return tile.isTileBlockedBy(this.tiles);
		}
	}
}