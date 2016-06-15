/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	// Declarations
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
						"viewBigPanel": { templateUrl: "partials/style.html"}
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
				.state('logout', {
					url: "/logout",
					views: {
						"viewMainPanel": {
							templateUrl: "partials/empty.html",
							controller: function($state: angular.ui.IStateService, AuthService: Application.Service.AuthService) {
								AuthService.user = <Application.Model.User>{};
								$state.go('index');
							}
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
				.state('game', {
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
							controller: 'gameController', // todo: to GameController
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
				.state('history', {
					url: "/game/{id}/history",
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
							templateUrl: "partials/game-history.html",
							controller: 'gameHistoryController',
							controllerAs: 'gameHistoryCtrl',
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
								games: function(
									GameListService: Application.Service.GameListService,
									ParameterReaderService: Application.Service.ParameterReaderService)
								{
									var params = ParameterReaderService.getParams();
									return GameListService.readAll(params);
								},
								title: () => { return 'Overzicht'; },
								fromCreatedBy: () => { return false; }
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
								},
								title: () => { return 'Eigen spellen'; },
								fromCreatedBy: () => { return true; }
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