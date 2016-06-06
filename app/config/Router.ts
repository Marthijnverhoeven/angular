/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	export class Router
	{
		private $inject : string[] = ['configuration', '$stateProvider', '$urlRouterProvider'];
		
		constructor(
			private configuration : Application.Config.IConfiguration,
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
							controller: function($scope, UserService) {
								console.log($scope, UserService);
								this.url = UserService.authenticationUrl();
							},
							controllerAs: "loginCtrl"
						}
					}
				})
				.state('authentication', {
					url: this.configuration.authCallback,
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel": { templateUrl: "partials/index.html" }
					}
				});
		
		}
		
		private appendGameStates() : void
		{
			this.$stateProvider
				.state('game', {
					url: "/game/{id}",
					params: { },
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/gameBoard.html" }
					},
					resolve: { }
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
					}
				});
		}
		
		public static Factory()
		{
			var configuration = (configuration, $stateProvider, $urlRouterProvider) =>
			{
				return new Router(configuration, $stateProvider, $urlRouterProvider);
			};

			configuration['$inject'] = this.$inject;

			return configuration;
		}
	}
}