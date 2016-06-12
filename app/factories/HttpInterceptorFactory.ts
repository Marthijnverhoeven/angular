
// mahjongMadness.factory('httpRequestInterceptor', 
// 	function (UserService, configuration) { 
// 		return { 
// 			request: function (config) {
// 				if (UserService.username && UserService.token) {
// 					config.headers["x-username"] = UserService.username
// 					config.headers["x-token"] = UserService.token;
// 				}
// 				// config.url = configuration.apiUrl + config.url;
// 				return config;
// 			}
// 		}
// 	}
// );

/// <reference path="../ts/_all.ts" />

namespace Application.Factory
{
	'use strict'
	
	declare type UserService = Application.Service.UserService;
	
	export var $inject = ['UserService'];
	
	export function HttpInterceptorFactory(UserService: UserService)
	{
		return {
			'request': (config: angular.IRequestConfig) =>
			{
				if(!(config.url.indexOf('partials') > -1))
				{
					console.log('request made: ' + config.url);
				}
				if (UserService.user && UserService.user.name && UserService.user.token) {
					config.headers = { "x-username": UserService.user.name, "x-token": UserService.user.token };
				}
				return config;
			}
		};
	}
}