/// <reference path="../ts/_all.ts" />

namespace Application.Filter
{
	'use strict'
	
	export class OwnedGames
	{
		private $inject : string[] = [];
		
		public filter()
		{
			return function(games, userId) {
				console.error(userId);
				
				var filtered = [];
				if(userId)
				{
					for(var game of games)
					{
						console.error(game);
						if(game.createdBy.id === userId) {
							filtered.push(game);
						}
					}
				}
				return userId 
					? filtered
					: games;
			}
		}

        public static Factory()
		{
			var instance = new OwnedGames();
			var filter = instance.filter;
			filter['$inject'] = [];
            return filter;
        }
	}
}