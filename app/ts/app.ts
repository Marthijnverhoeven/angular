/// <reference path='_all.ts' />

namespace Application
{
	'use strict';
	let mahjongMadness = angular.module('mahjongMadness', ['ui.router', 'ngRoute']);
	
	mahjongMadness.factory('httpRequestInterceptor', Application.Factory.HttpInterceptorFactory);
	
	mahjongMadness.config(Application.Config.RouterFactory);
	mahjongMadness.config(Application.Config.InitializerFactory); 
	
	mahjongMadness.run(function($rootScope: ng.IRootScopeService, $state, AuthService: Application.Service.AuthService, SocketService: Application.Service.SocketService){
		$rootScope.$on("$stateChangeStart",
			function(event, toState, toParams, fromState, fromParams) 
			{
				// Force disconnect sockets
				SocketService.disconnect();
				
				// Check authorization;
				if(toState.data && toState.data.reqAuth && !AuthService.isLoggedIn())
				{
					alert('u\'r nut uthuntucutud, u\'ll bu ruduructud tu lugun.');
					$state.transitionTo("login");
					event.preventDefault();
				}
			}
		)
	}); 
	
	mahjongMadness.constant('configuration', Application.Constant.ConfigurationFactory); 
	
	mahjongMadness.directive('tile', Application.Directive.TileDirectiveFactory);
	
	mahjongMadness.filter('matchedTiles', Application.Filter.MatchedTilesFactory);
	mahjongMadness.filter('filterForPlayer', Application.Filter.FilterForPlayerFactory);
	
	mahjongMadness.service('ParameterReaderService', Application.Service.ParameterReaderService);
	mahjongMadness.service('ApplicationService', Application.Service.ApplicationService);
	mahjongMadness.service('StorageService', Application.Service.StorageService);	
	mahjongMadness.service('GameListService', Application.Service.GameListService);
	mahjongMadness.service('SocketService', Application.Service.SocketService);
	mahjongMadness.service('AuthService', Application.Service.AuthService);
	mahjongMadness.service('GameService', Application.Service.GameService);
	mahjongMadness.service('StorageService', Application.Service.StorageService);
	
	mahjongMadness.controller('appController', Application.Controller.AppController);
	mahjongMadness.controller('gameHistoryController', Application.Controller.GameHistoryController);
	mahjongMadness.controller('gameCreateController', Application.Controller.GameCreateController);
	mahjongMadness.controller('gameBoardController', Application.Controller.GameBoardController);
	mahjongMadness.controller('gameController', Application.Controller.GameController);
	mahjongMadness.controller('gamesController', Application.Controller.GamesController);
	
	mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
	mahjongMadness.controller('styleController', Application.Controllers.StyleController);
}