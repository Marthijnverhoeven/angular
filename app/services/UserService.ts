/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	declare type User = Application.Model.User;
	
	export class UserService
	{
		public user : User = { name: 'Marthijn', id: '1', token: 'tests' };
		
		constructor(private configuration : any)
		{ }
		
		public authenticationUrl() : string
		{
			// encodeURI || encodeURIComponent 
			var callback = encodeURIComponent(this.configuration.baseUrl + this.configuration.authCallback);
			return 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=' + callback;
		}
	}
}