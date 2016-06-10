namespace Application.Model
{
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
				&& (self.zPos +1 === tile.zPos));
		}
		
		/**
		 * Returns true if the tile is being blocked on the side by the given tile.
		 */
		public isTileBlockedOnTheSideBy(tile: Tile) : boolean
		{
			var self = this;

			//The given tile is in the same spot as this tile, therefore it is not being blocked
			if(self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
				return false;
			}

			return ((self.xPos - 2 === tile.xPos || self.xPos + 2 === tile.xPos)
				&& (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
				&& (self.zPos === tile.zPos));
		}
		
		public isTileBlockedBy(tiles : Tile[]) : boolean
		{
			var self = this;
			for(var tile of tiles)
			{
				if(self.isTileBlockedOnTopBy(tile) || this.isTileBlockedOnTheSideBy(tile)) {
					return true;
				}
			}
			return false;
		}
	}
}
