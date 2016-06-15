namespace Application.Model
{	
	namespace Application.Model.Tile
	{
		export class MatchAttempt
		{
			isMatched: boolean = false;
			isBlocked: boolean = false;
			isSelected: boolean = false;
		}
	}
	
	export class Tile
	{
		xPos: number;
		yPos: number;
		zPos: number;
		tile: {
			_id: number,
			suit: string,
			name: string,
			matchesWholeSuit: boolean,
			__v: number
		};
		match: {
      		foundBy: string,
      		otherTileId: string,
      		foundOn: string
    	}
		_id: string;
		
		matchAttempt: Application.Model.Tile.MatchAttempt;
		
		constructor(literal: any)
		{			
			for(var key of Object.keys(literal))
			{
				this[key] = literal[key];
			}
			
			this.matchAttempt = <Application.Model.Tile.MatchAttempt>{};
			this.matchAttempt.isMatched = (!!this.match && !!this.match.foundBy);
			this.matchAttempt.isSelected = false;
			this.matchAttempt.isBlocked = false;
		}
		
		public canAttemptMatch() : boolean
		{
			return !this.matchAttempt.isBlocked;
		}
		
		/**
		 * Returns true if the tile is being blocked on the top by the given tile.
		 */
		public isTileBlockedOnTopBy(tile : Tile) : boolean
		{
			var self = this;
			
			//The given tile is in the same spot as this tile, therefore it is not being blocked
			if(self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
				return false;
			}

			/* Just keep for when needed!
			console.log("ME    TILE x:" + self.xPos + " y:" + self.yPos + " z:" + self.yPos);
			console.log("OTHER TILE x:" + tile.xPos + " y:" + tile.yPos + " z:" + tile.yPos);

			console.log("Selected tile conflicting xpos: " + (self.xPos -1 == tile.xPos || self.xPos == tile.xPos || self.xPos + 1 == tile.xPos));
			console.log("Selected tile conflicting ypos: " + (self.yPos -1 == tile.yPos || self.yPos == tile.yPos || self.yPos + 1 == tile.yPos));
			console.log("Selected tile conflicting zpos: " + (self.zPos +1 == tile.zPos));
			*/
			
			return ((self.xPos -1 === tile.xPos || self.xPos === tile.xPos || self.xPos + 1 === tile.xPos)
				&& (self.yPos -1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
				&& (self.zPos +1 === tile.zPos)
				&& !tile.matchAttempt.isMatched);
		}
		
		/**
		 * Returns true if the tile is being blocked on the side by the given tile.
		 */
		public isTileBlockedOnTheSideBy(tiles: Tile[]) : boolean
		{
			var self = this;
			var leftFound = false;
			var rightFound = false;

			for(var tile of tiles)
			{
				if(self.isTileBlockedOnTheLeftBy(tile)) {
					leftFound = true;
				}

				if(self.isTileBlockedOnTheRightBy(tile)) {
					rightFound = true;
				}
			}

			return (rightFound && leftFound);
		}


		public isTileBlockedOnTheRightBy(tile: Tile) : boolean
		{
			var self = this;

			//The given tile is in the same spot as this tile, therefore it is not being blocked
			if(self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
				return false;
			}
			return ((self.xPos + 2 === tile.xPos)
				&& (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
				&& (self.zPos === tile.zPos)
				&& !tile.matchAttempt.isMatched);
		}

		public isTileBlockedOnTheLeftBy(tile: Tile) : boolean
		{
			var self = this;

			//The given tile is in the same spot as this tile, therefore it is not being blocked
			if(self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
				return false;
			}

			return ((self.xPos - 2 === tile.xPos)
				&& (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
				&& (self.zPos === tile.zPos)
				&& !tile.matchAttempt.isMatched);
		}
		
		public isTileBlockedBy(tiles : Tile[]) : boolean
		{
			var self = this;
			for(var tile of tiles)
			{
				if(self.isTileBlockedOnTopBy(tile) || self.isTileBlockedOnTheSideBy(tiles))
				{
					return self.matchAttempt.isBlocked = true;
				}
			}
			return self.matchAttempt.isBlocked = false;
		}
		
		public canMatch(tile: Tile) : boolean
		{
			// Elke tegel zit in een suit en heeft een naam,
			// als matches whole suit op false staat moet de naam ook overeen komen bij het matchen,
			// als dit op true staat hoeft de naam niet hetzelfde te zijn als de tegel waartegen je wilt matchen.
			// De suit moet dan nog wel overeenkomen natuurlijk!
			var self = this;
			return (self.tile.matchesWholeSuit // matchesWholeSuit === true
					&& self.tile.matchesWholeSuit === tile.tile.matchesWholeSuit // both tiles have same [matchesWholeSuit] 
					&& self.tile.suit === tile.tile.suit) // same suit
					||
					(!self.tile.matchesWholeSuit // matchesWholeSuit === false 
					&& self.tile.matchesWholeSuit === tile.tile.matchesWholeSuit // both tiles have same [matchesWholeSuit]
					&& self.tile.suit === tile.tile.suit // same suit
					&& self.tile.name === tile.tile.name); // same name
		}
	}
}
