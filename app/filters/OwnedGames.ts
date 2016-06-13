/// <reference path="../ts/_all.ts" />

namespace Application.Filter
{
	'use strict'
	
	// Models
	declare type Game = Application.Model.Game;
	
	export class OwnedGames
	{
		private $inject : string[] = [];
		
		public filter()
		{
			return function(games: Game[], userId: string) {
				console.log(games, userId);
				var filtered = [];
				if(userId && games)
				{
					for(var game of games)
					{
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