/// <reference path='_all.ts' />

namespace Application
{
	'use strict';
	let mahjongMadness = angular.module('mahjongMadness', ['ui.router', 'ngRoute']);
	
	console.log('TEST');
	
	mahjongMadness.config(Application.Config.Router.Factory());
	mahjongMadness.constant('configuration', Application.Config.Configuration.Factory()); 
	
	mahjongMadness.directive('user', Application.Directive.UserDirective.Factory());
	mahjongMadness.directive('gameitem', Application.Directive.GameItemDirective.Factory());
	
	mahjongMadness.filter('ownedGames', Application.Filter.OwnedGames.Factory());
	
	mahjongMadness.service('GameListService', Application.Service.GameListService);
	mahjongMadness.service('UserService', Application.Service.UserService);
	mahjongMadness.service('GameService', Application.Service.GameService);
	
	mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
	mahjongMadness.controller('gameController', Application.Controllers.GameController);
	mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
}