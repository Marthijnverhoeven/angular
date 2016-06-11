/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	export class Router
	{		
		constructor(
			private configuration,
			private $stateProvider : angular.ui.IStateProvider,
			private $urlRouterProvider: angular.ui.IUrlRouterProvider)
		{
			this.$urlRouterProvider
				.otherwise("/index");
				
			this.appendBaseStates();
			this.appendAuthenticationStates();
			this.appendGameStates();
			this.appendListStates();
		}
		
		private appendBaseStates() : void
		{
			this.$stateProvider
				.state('index', {
					url: "/index",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel": { templateUrl: "partials/index.html" }
					}
				});
		}
		
		private appendAuthenticationStates() : void
		{
			this.$stateProvider
				.state('login', {
					url: "/login",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel": {
							templateUrl: "partials/login.html",
							controller: function($scope, UserService: Application.Service.UserService) {
								this.UserService = UserService;
							},
							controllerAs: "loginCtrl"
						}
					}
				})
				.state('authentication', {
					url: "/authCallback?username&token", //this.configuration.authCallback,
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel": { 	
							templateUrl: "partials/empty.html", 
							controller: function($scope, $http, $state, $stateParams, UserService: Application.Service.UserService)
							{
								UserService.setUser($stateParams.username, $stateParams.token);
							}
						}
					}
					
				});
		
		}
		
		private appendGameStates() : void
		{
			this.$stateProvider
				.state('game', {
					url: "/game/{id}",
					// params: { },
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/gameBoard.html" }
					},
					resolve: {
						game: function(GameListService: Application.Service.GameListService, $stateParams)
						{
							return GameListService.read($stateParams.id);
						}
					}
				})
				.state('matched', {
					url: "/matched",
					// params: { },
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/matched.html" }
					},
					resolve: {
						tiles: function(GameService: Application.Service.GameService, $stateParams)
						{
							return GameService.tiles($stateParams.id);
						}
					}
				});
		}
		
		private appendListStates() : void
		{
			this.$stateProvider
				.state('allGames', {
					url: "/games",
					views: {
						"viewSidePanel": { templateUrl: "partials/user.html" },
						"viewMainPanel": {
							templateUrl: "partials/gameList.html",
							controller: 'gameListController',
							controllerAs: 'gameList'
						}
					},
					resolve: {
						games: function(GameListService: Application.Service.GameListService)
						{
							return GameListService.readAll();
						}
					}
				})
				.state('myGames', {
					url: "/games/me",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/user.html" 
						},
						"viewMainPanel": {
							templateUrl: "partials/mygames.html",
							controller: 'gameListController',
							controllerAs: 'gameList'
						}
					},
					resolve: {
						games: function(GameListService: Application.Service.GameListService)
						{
							return GameListService.readAll();
						}
					}
				});
		}
	}
	
	export var $inject = ['configuration', '$stateProvider', '$urlRouterProvider'];
	
	export function RouterFactory(configuration, $stateProvider, $urlRouterProvider)
	{
		return new Router(configuration, $stateProvider, $urlRouterProvider);
	}
}