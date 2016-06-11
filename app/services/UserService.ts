/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	declare type User = Application.Model.User;
	
	export class UserService
	{
		public user : User = <User>{};
		
		constructor(private configuration : Application.Constant.Configuration)
		{ }
		
		public authenticationUrl() : string
		{
			// encodeURI || encodeURIComponent 
			var callback = encodeURIComponent(this.configuration.baseUrl + this.configuration.authCallback);
			return this.configuration.apiUrl + '/auth/avans?callbackUrl=' + callback;
		}
		
		public setUser(username: string, token: string) : void
		{
			this.user.name = username;
			this.user.token = token;
		}
	}
}