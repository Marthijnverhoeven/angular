/// <reference path='_all.ts' />

namespace Application
{
	'use strict';
	let mahjongMadness = angular.module('mahjongMadness', []);
	
	console.log('TEST');
	
	mahjongMadness.service('GameFactory', Application.Services.GameFactory);
	mahjongMadness.service('TileService', Application.Services.TileService);
	mahjongMadness.service('UserService', Application.Services.UserService);
	mahjongMadness.service('GameService', Application.Services.GameService);
	
	mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
	mahjongMadness.controller('gameController', Application.Controllers.GameController);
}
