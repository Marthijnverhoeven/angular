namespace Application.Services
{
	'use strict'
	
	export class UserService
	{
		public user : Application.Models.User = { name: 'Marthijn' };
		
		constructor(private configuration : any)
		{ }
		
		public authenticationUrl() : string
		{
			// encodeURI || encodeURIComponent 
			var callback = encodeURIComponent(this.configuration.authCallback);
			return 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=' + callback;
		}
	}
}