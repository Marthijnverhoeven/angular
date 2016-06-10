/// <reference path="../ts/_all.ts" />

namespace Application.Services
{
	export class ApplicationService
	{
		constructor()
		{ }
		
		public templates() : any
		{
			// GET - /gametemplates
			throw new Error('NotImplementedError');
		}
		
		public template(id : number) : any
		{
			// GET - /gametemplates/{id}
			throw new Error('NotImplementedError');
		}
		
		public states() : any
		{
			// GET - /gamestates
			throw new Error('NotImplementedError');
		}
	}
}