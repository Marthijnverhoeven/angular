/// <reference path="../ts/_all.ts" />

namespace Application.Factory
{
	'use strict'
	
	declare type AuthService = Application.Service.AuthService;
	
	export var $inject = ['UserService'];
	
	export function HttpInterceptorFactory(AuthService: AuthService)
	{
		return {
			'request': (config: angular.IRequestConfig) => {
				if(config.url.indexOf('partials') <= -1) {
					console.log('request @' + config.url);
				}
				if (AuthService.user && AuthService.user.name && AuthService.user.token) {
					if(!config.headers)
					{
						config.headers = {};
					}
					config.headers["x-username"] = AuthService.user.name;
					config.headers["x-token"] = AuthService.user.token;
				}
				return config;
			}
		};
	}
}