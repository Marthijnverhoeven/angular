/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	declare type User = Application.Model.User;
	
	export class AuthService
	{
		public user : User = <User> {
			// name: 'fs.karsodimedjo@student.avans.nl',
			// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImZzLmthcnNvZGltZWRqb0BzdHVkZW50LmF2YW5zLm5sIg.htVG8dEuA4EM89b_HwwLUWh9qv_vPzO_fHRDEFna8qI'
		};
		
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
		
		public isLoggedIn() : boolean
		{
			return !!this.user.name && !!this.user.token;
		}
	}
}