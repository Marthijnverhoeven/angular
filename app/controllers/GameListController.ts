/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	'use strict'
	
	// Services
	declare type GameListService = Application.Service.GameListService;
	
	// Models
	declare type Game = Application.Model.Game;
	
	export class GameListController
	{
		public user = {
			id: '1'
		}
		
		public allGames: Game[];
		
		constructor(
			private UserService,
			private GameListService : GameListService,
			private $scope,
			private $http)
		{
			this.allGames =[];
				/*<Game>{ "_id": "5759d218e22c671100821f5a", "createdBy": { "_id": "rjl.ernens@student.avans.nl", "name": "Roel Ernens", "__v": 0 }, "createdOn": "2016-06-09T20:31:20.802Z", "gameTemplate": { "_id": "Ox", "__v": 0, "id": "Ox" }, "__v": 0, "players": [ { "_id": "rjl.ernens@student.avans.nl", "name": "Roel Ernens", "__v": 0 } ], "maxPlayers": 32, "minPlayers": 2, "state": "open", "id": "5759d218e22c671100821f5a" },
				<Game>{ "_id": "5759d106e22c671100821ec9", "createdBy": { "_id": "rjl.ernens@student.avans.nl", "name": "Roel Ernens", "__v": 0 }, "createdOn": "2016-06-09T20:26:46.524Z", "gameTemplate": { "_id": "Ox", "__v": 0, "id": "Ox" }, "__v": 0, "players": [ { "_id":  "rjl.ernens@student.avans.nl", "name": "Roel Ernens", "__v": 0 } ], "maxPlayers": 32, "minPlayers": 2, "state": "open", "id": "5759d106e22c671100821ec9" }*/
			
			
			console.log('ctor gamelistctrl');
			this.getAllGames();
		}
		
		public getAllGames() : void
		{
			var self = this;
			self.GameListService.readAll(
				(games) => {
					self.allGames = games;
				},
				(error) => {
					alert("omg no :C");
					// console.error(error);
					throw error;
				}
			);
		}
		
		public getMyGames() : void
		{
			
		}
		
		public createGame(template : string, minPlayers : number, maxPlayers : number) : void
		{
			// todo: validate min < max;
			// todo: choose from list of templates
			// todo: make request
		}
		
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