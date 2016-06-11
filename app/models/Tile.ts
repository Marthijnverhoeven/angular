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
		_id: string;
		
		/**
		 * Checks if given tile is on blocking on top of current instance.
		 */
		private isOnTop(tile : Tile) : boolean
		{
			var self = this;
			return ((self.xPos -1 === tile.xPos || self.xPos === tile.xPos || self.xPos + 1 === tile.xPos)
				&& (self.yPos -1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos));
		}
		
		/**
		 * Checks if given tile is blocking to the left or the right of current instance.
		 */
		private isLeftOrRight(tile: Tile) : boolean
		{
			var self = this;
			return ((self.xPos - 2 === tile.xPos || self.xPos + 2 === tile.xPos)
				&& (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos))
		}
		
		public canMatch(tiles : Tile[]) : boolean
		{
			var self = this;
			for(var tile of tiles)
			{
				if(!self.isOnTop(tile) && this.isLeftOrRight(tile)) {
					
				}
			}
			return null;
		}
	}
}
