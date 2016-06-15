/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	export class AppController
	{
		constructor(private configuration: Application.Constant.Configuration)
		{ }
		
		public getMinPlayers()
		{
			return this.configuration.minPlayers;
		}
		
		public getMaxPlayers()
		{
			return this.configuration.maxPlayers;
		}
	}
}