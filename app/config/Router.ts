/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	// Globals
	declare var io: SocketIOStatic;
	
	// Blub
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
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
				}).state('settings', {
					url: "/settings",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel": { templateUrl: "partials/style.html"}
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
							controller: function($scope, AuthService: Application.Service.AuthService) {
								this.authUrl = function()
								{
									return AuthService.authenticationUrl();
								};
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
							controller: function($scope, $state: angular.ui.IStateService, AuthService: Application.Service.AuthService)
							{
								if($state.params['username'] && $state.params['token'])
								{
									AuthService.setUser($state.params['username'], $state.params['token']);
									$state.go('allGames');
								}
								else
								{
									alert('Login failed');
									$state.go('login');
								}
							}
						}
					}
					
				});
		
		}
		
		private appendGameStates() : void
		{
			this.$stateProvider
				.state('game', { // done
					url: "/game/{id}",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/game.html",
							controller: 'gameController',
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								}
							}
						},
						"viewMainPanel": {
							templateUrl: 'partials/game-board.html',
							controller: 'gameBoardController',
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								},
								tiles: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.tiles($stateParams.id);
								}
							}
						}
					},
					data: { reqAuth: true }
				})
				.state('board', { // todo: substate
					url: "/game/{id}/board",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/game.html",
							controller: 'gameBoardController', // todo: to GameController
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								},
								tiles: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.tiles($stateParams.id);
								}
							}
						},
						"viewMainPanel": {
							templateUrl: 'partials/game-board.html',
							controller: 'gameBoardController',
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								},
								tiles: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.tiles($stateParams.id);
								}
							}
						}
					},
					data: { reqAuth: true }
				})
				.state('matched', { // todo: substate
					url: "/game/{id}/matched",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/empty.html" }
					},
					data: { reqAuth: true }
				})
				.state('view', { // todo: substate
					url: "/game/{id}/view",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/empty.html" }
					},
					data: { reqAuth: true }
				});
		}
		
		private appendListStates() : void
		{
			this.$stateProvider
				.state('allGames', {
					url: "/games",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/gamelist-controls.html",
							controller: 'gameCreateController',
							controllerAs: 'gamesCtrl',
							resolve: {
								templates: function(ApplicationService: Application.Service.ApplicationService)
								{									
									return ApplicationService.templates();
								}
							}
						},
						"viewMainPanel": {
							templateUrl: "partials/gamelist.html",
							controller: 'gamesController',
							controllerAs: 'gamesCtrl',
							resolve: {
								games: function(GameListService: Application.Service.GameListService)
								{
									return GameListService.readAll();
								}
							},
						}
					},
					data: { reqAuth: true }
				})
				.state('myGames', {
					url: "/games/me",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/gamelist-controls.html",
							controller: 'gameCreateController',
							controllerAs: 'gamesCtrl',
							resolve: {
								templates: function(ApplicationService: Application.Service.ApplicationService)
								{									
									return ApplicationService.templates();
								}
							}
						},
						"viewMainPanel": {
							templateUrl: "partials/gamelist.html",
							controller: 'gamesController',
							controllerAs: 'gamesCtrl',
							resolve: {
								games: function(GameListService: Application.Service.GameListService)
								{
									return GameListService.readCreated();
								}
							},
						}
					},
					data: { reqAuth: true }
				});
		}
	}
	
	export var $inject = ['configuration', '$stateProvider', '$urlRouterProvider'];
	
	export function RouterFactory(configuration, $stateProvider, $urlRouterProvider)
	{
		return new Router(configuration, $stateProvider, $urlRouterProvider);
	}
}