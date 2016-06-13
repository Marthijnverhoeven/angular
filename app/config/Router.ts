/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	// Globals
	declare var io: SocketIOStatic;
	
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
						"viewMainPanel":
						{
							templateUrl: "partials/index.html",
							controller: function()
							{
								var socket = io('http://mahjongmayhem.herokuapp.com?gameId=575e8feab62cb21100dc6275');
								// start, end, playerJoined, match
								socket.on('start', () =>
								{
									console.log('game started');
								}).on('end', () =>
								{
									console.log('game ended');
								}).on('playerJoined', (player) =>
								{
									console.log('player joined');
									console.log(player);	
								}).on('match', (matchedTiles) =>
								{
									console.log('match made');
									console.log(matchedTiles);
								});
								
								// 
								// $scope.$on('$destroy', () =>
								// {
								// 	socket.close();
								// });
							} 
						}
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
							controller: function($scope, $state: angular.ui.IStateService, UserService: Application.Service.UserService)
							{
								UserService.setUser($state.params['username'], $state.params['token']);
								$state.go('allGames');
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
							controller: function(GameService: Application.Service.GameService, GameListService: Application.Service.GameListService)
							{
								GameService.currentGame = GameListService.currentGame;
								this.GameService = GameService;
							},
							controllerAs: 'gameCtrl'
						},
						"viewMainPanel": {
							templateUrl: 'partials/game-board.html',
							controller: 'gameController',
							controllerAs: 'gameCtrl'
						}
					},
					resolve: {
						game: function(GameListService: Application.Service.GameListService, $stateParams)
						{
							return GameListService.read($stateParams.id);
						}
					},
					data: {
						// authenticate: true
					}
				})
				.state('board', {
					url: "/game/{id}/board",
					views: {
						"viewSidePanel": { templateUrl: "partials/game.html" },
						"viewMainPanel": { templateUrl: "partials/game-board.html" }
					},
					resolve: {
						game: function(GameListService: Application.Service.GameListService, $stateParams)
						{
							return GameListService.read($stateParams.id);
						}
					},
				})
				.state('matched', {
					url: "/game/{id}/matched",
					// params: { },
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/matched.html" }
					},
					resolve: {
						game: function(GameListService: Application.Service.GameListService, $stateParams)
						{
							return GameListService.read($stateParams.id);
						}
					}
				})
				.state('view', {
					url: "/game/{id}/view",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/empty.html" }
					},
					resolve: {
						game: function(GameListService: Application.Service.GameListService, $stateParams)
						{
							return GameListService.read($stateParams.id);
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
						"viewSidePanel": {
							templateUrl: "partials/gamelist-controls.html",
							controller: 'gameListController',
							controllerAs: 'gameList'
						},
						"viewMainPanel": {
							templateUrl: "partials/gamelist.html",
							controller: 'gameListController',
							controllerAs: 'gameList'
						}
					},
					resolve: {
						templates: function(ApplicationService: Application.Service.ApplicationService)
						{
							return ApplicationService.templates();
						},
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
							templateUrl: "partials/gamelist-created.html",
							controller: 'gameListController',
							controllerAs: 'gameList'
						}
					},
					resolve: {
						templates: function(ApplicationService: Application.Service.ApplicationService)
						{
							return ApplicationService.templates();
						},
						createdGames: function(GameListService: Application.Service.GameListService)
						{
							return GameListService.readCreated();
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