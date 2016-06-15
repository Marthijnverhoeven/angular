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
					templateUrl: "partials/index.html"
				}).state('settings', {
					url: "/settings",
					templateUrl: "partials/style.html"
				});
		}
		
		private appendAuthenticationStates() : void
		{
			this.$stateProvider
				.state('login', {
					url: "/login",
					templateUrl: "partials/login.html",
					controller: function($scope, AuthService: Application.Service.AuthService) {
						this.authUrl = function()
						{
							return AuthService.authenticationUrl();
						};
					},
					controllerAs: "loginCtrl"
				})
				.state('logout', {
					url: "/logout",
					templateUrl: "partials/empty.html",
					controller: function($state: angular.ui.IStateService, AuthService: Application.Service.AuthService) {
						AuthService.user = <Application.Model.User>{};
						$state.go('index');
					}
				})
				.state('authentication', {
					url: "/authCallback?username&token", //this.configuration.authCallback,
					templateUrl: "partials/empty.html", 
					controller: function($scope, $state: angular.ui.IStateService, AuthService: Application.Service.AuthService)
					{
						if($state.params['username'] && $state.params['token'])
						{
							AuthService.setUser($state.params['username'], $state.params['token']);
							$state.go('games.all');
						}
						else
						{
							alert('Login failed');
							$state.go('login');
						}
					}
				});
		
		}
		
		private appendGameStates() : void
		{
			this.$stateProvider
				.state('game', {
					url: "/game/{id}",
					abstract: true,
					templateUrl: "partials/game.html",
					controller: 'gameController',
					controllerAs: 'gameCtrl',
					resolve: {
						game: function(GameService: Application.Service.GameService, $stateParams)
						{
							return GameService.read($stateParams.id);
						}
					},
					data: { reqAuth: true }
				})
				.state('game.board', { // todo: substate
					url: "/board",
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
					},
					data: { reqAuth: true }
				})
				.state('game.history', {
					url: "/history",
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
					},
					data: { reqAuth: true }
				})
		}
		
		private appendListStates() : void
		{
			this.$stateProvider
				.state('games', {
					url: "/games",
					abstract: true,
					templateUrl: "partials/gamelist-controls.html",
					controller: 'gameCreateController',
					controllerAs: 'gamesCtrl',
					resolve: {
						templates: function(ApplicationService: Application.Service.ApplicationService)
						{									
							return ApplicationService.templates();
						}
					},
					data: { reqAuth: true }
				})
				.state('games.all', {
					url: "/all",
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
					data: { reqAuth: true }
				})
				.state('created', {
					url: "/me",
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