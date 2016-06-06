/// <reference path="../ts/_all.ts" />

namespace Application.Services
{
	export class GameService
	{
		constructor()
		{ }
		
		public start(id : number) : void
		{
			// POST - /games/{id}/start
			throw new Error('NotImplementedError');
		}
		
		public join(id : number) : void
		{
			// POST - /games/{id}/players
			throw new Error('NotImplementedError');
		}
		
		public tiles(id : number) : Application.Models.Tile[]
		{
			// GET - /games/{id}/tiles
			throw new Error('NotImplementedError');
		}
		
		public match(id : number, body : any) : void
		{
			// POST - /games/{id}/tiles/matches
			throw new Error('NotImplementedError');
		}
	}
}