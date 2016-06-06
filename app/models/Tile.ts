namespace Application.Models
{
	export class Tile
	{
		// "tile": {
		// 	"_id": 48,
		// 	"suit": "Bamboo",
		// 	"name": "4",
		// 	"matchesWholeSuit": false,
		// 	"__v": 0,
		// 	"id": "48"
		// }
		id: number;
		x: number;
		y: number;
		z: number;
		name: string;
		suit: string;
		matchesWholeSuit: boolean;
		
		constructor(tileData : any)
		{
			if(!tileData)
				throw new Error('no tileData');
				
			this.id = tileData._id;
			this.x = tileData.x;
			this.y = tileData.y;
			this.z = tileData.z;
			this.name = tileData.tile.name;
			this.suit = tileData.tile.suit;
			this.matchesWholeSuit = tileData.tile.matchesWholeSuit;
		}
		
		private isOnTop(tile : Tile) : boolean
		{
			var self = this;
			if((self.x -1 === tile.x || self.x === tile.x || self.x + 1 === tile.x)
				&& (self.y -1 === tile.y || self.y === tile.y || self.y + 1 === tile.y))
			{
				return true;
			}
			return false;
		}
		
		private isLeftOrRight(tile: Tile) : boolean
		{
			var self = this;
			if((self.x - 2 === tile.x || self.x + 2 === tile.x)
				&& (self.y - 1 === tile.y || self.y === tile.y || self.y + 1 === tile.y))
			{
				return true;
			}
			return false;
		}
		
		public canMatch(tiles : Tile[]) : boolean
		{
			for(var tile of tiles)
			{
				if(!this.isOnTop(tile) && this.isLeftOrRight(tile)) {
					
				}
			}
			return null;
		}
	}
}
