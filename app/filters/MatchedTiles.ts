/// <reference path="../ts/_all.ts" />

namespace Application.Filter
{
	'use strict'
	
	export class MatchedTiles
	{
		private $inject : string[] = [];
		
		public filter()
		{
			return function(tiles: Application.Model.Tile[])
			{				
				var filtered = [];
				for(var tile of tiles)
				{
					if(tile.match && tile.match.foundBy || tile.matchAttempt.isMatched)
					{
						filtered.push(tile);
					}
				}
				return filtered;
			}
		}
	}
	
	export var MatchedTilesFactory = (() =>
	{
		var instance = new MatchedTiles();
		var filter = instance.filter;
		filter['$inject'] = [];
		return filter;
	})()
}