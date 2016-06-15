/// <reference path="../ts/_all.ts" />

namespace Application.Filter
{
	'use strict'
	
	export class FilterForPlayer
	{
		private $inject : string[] = [];
		
		public filter()
		{
			return function(tiles: Application.Model.Tile[], player: any)
			{
				if(player == undefined || !player)
					{
						console.log('returning tiles');
						return tiles;
					}
				var filtered = [];
				
				for (var tile of tiles)
				{
					if(tile.match.foundBy == player)
					{
						console.log('found by', player);
						filtered.push(tile);
					}
				}
				console.log('returning filtered', player);
				return filtered;
			}
		}
	}
	
	export var FilterForPlayerFactory = (() =>
	{
		var instance = new FilterForPlayer();
		var filter = instance.filter;
		filter['$inject'] = [];
		return filter;
	})()
}