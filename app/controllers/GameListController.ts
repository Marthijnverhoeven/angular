/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	'use strict'
	
	declare type GameListService = Application.Service.GameListService;
	
	export class GameListController
	{
		public allGames = [
			{ "asd": "1", createdBy: { id: '1' } },
			{ "asd": "a1", createdBy: { id: '1' } },
			{ "asd": "a123d", createdBy: { id: '1' } },
			{ "asd": "as124214d", createdBy: { id: '2' } },
		];
		public user = {
			id: '1'
		}
		
		constructor(
			private UserService,
			private GameListService : GameListService,
			private $scope,
			private $http)
		{ }
		
		// public myGames()
		// {
		// 	// return this.GameListService.readAll();
		// }
		
		// public openGame(game: Application.Models.Game)
		// {
		// 	this.$scope.selected = game;
		// 	// this.GameService.openGame(game);
		// }
		
		// public newGame(_title) {
		// 	var self = this;
		// 	// self.GameListService.POST({ title: _title, players: [self.user] });
		// 	// self.GameListService.GET('', function(games){
		// 	// 	self.games = games;
		// 	// });
		// }
		
		// public saveGame() {
		// 	var self = this;
		// 	self.games.push(self.game); // not sure what self.game is
		// 	self.game = null;
		// }
		
		// public joinGame(game) {
		// 	var self = this;
		// 	if(game.players.length != 4 ) {
		// 		game.players.push(self.user);
		// 	}
		// }
		
		// public canJoinGame(game) {
		// 	var self = this;
			
		// 	// game is full
		// 	if(game.players.length == 4) {
		// 		return false;
		// 	}
		// 	// user is already joined
		// 	for(var i = 0; i < game.players.length; i++) {
		// 		if(game.players[i] == self.user) {
		// 			return false;
		// 		}
		// 	}

		// 	return true;
		// }
	}
}