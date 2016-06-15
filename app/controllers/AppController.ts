/// <reference path="../ts/_all.ts" />

namespace Application.Controller
{
	export class AppController
	{
		constructor(private configuration: Application.Constant.Configuration, private AuthService: Application.Service.AuthService)
		{ }
		
		public authUrl()
		{
			return this.AuthService.authenticationUrl(); 
		};
		
		public isLoggedIn() : boolean
		{
			return this.AuthService.isLoggedIn();
		}
		
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