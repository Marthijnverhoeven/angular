/// <reference path='_all.ts' />

namespace Application
{
	'use strict';
	let mahjongMadness = angular.module('mahjongMadness', ['ui.router', 'ngRoute']);
	
	console.log('TEST');
	
	
	
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

	// mahjongMadness.config(function ($httpProvider) { $httpProvider.interceptors.push('httpRequestInterceptor'); });
	
	mahjongMadness.factory('httpRequestInterceptor', Application.Factory.HttpInterceptorFactory);
	
	mahjongMadness.config(Application.Config.RouterFactory);
	mahjongMadness.config(Application.Config.InitializerFactory); 
	
	mahjongMadness.run(function($rootScope: ng.IRootScopeService, $state, UserService: Application.Service.UserService){
		$rootScope.$on("$stateChangeStart",
			function(event, toState, toParams, fromState, fromParams) 
			{
				if (toState.data && toState.data.authenticate && !UserService.isLoggedIn())
				{
					// User isn’t authenticated
					$state.transitionTo("login");
					event.preventDefault();
				}
			}
		)
	});
	
	mahjongMadness.constant('configuration', Application.Constant.ConfigurationFactory); 
	
	mahjongMadness.directive('tile', Application.Directive.TileDirectiveFactory);
	mahjongMadness.directive('user', Application.Directive.UserDirective.Factory());
	mahjongMadness.directive('gameitem', Application.Directive.GameItemDirective.Factory());
	
	mahjongMadness.filter('ownedGames', Application.Filter.OwnedGames.Factory());
	
	mahjongMadness.service('ApplicationService', Application.Service.ApplicationService);
	mahjongMadness.service('GameListService', Application.Service.GameListService);
	mahjongMadness.service('UserService', Application.Service.UserService);
	mahjongMadness.service('GameService', Application.Service.GameService);
	mahjongMadness.service('StorageService', Application.Service.StorageService);
	
	mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
	mahjongMadness.controller('gameController', Application.Controllers.GameController);
	mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
	mahjongMadness.controller('styleController', Application.Controllers.StyleController);
}