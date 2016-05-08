/// <reference path='_all.ts' />

namespace Application
{
	'use strict';
	let mahjongMadness = angular.module('mahjongMadness', []);
	
	console.log('TEST');
	
	mahjongMadness.service('GameFactory', Application.Services.GameFactory);
	mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
}
