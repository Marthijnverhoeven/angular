/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	'use strict'
	
	// Services
	declare type GameListService = Application.Service.GameListService;
	declare type UserService = Application.Service.UserService;
	declare type ApplicationService = Application.Service.ApplicationService;
	
	// Models
	declare type Game = Application.Model.Game;
	
	export class GameListController
	{
		public user = {
			id: '1'
		}
		
		constructor(
			private $scope,
			private $state: angular.ui.IStateService,
			public UserService: UserService,
			public GameListService: GameListService,
			public ApplicationService: ApplicationService)
		{
			console.log('ctor gamelistctrl');
			
			this.$scope.newGame = {
				template: ApplicationService.availableTemplates[0]._id,
				minPlayers: 2,
				maxPlayers: 4
			};
		}
		
		public canCreateGame(template : string, minPlayers : number, maxPlayers : number)
		{
			return (template != null || template != undefined)
				&& minPlayers <= maxPlayers;
		}
		
		public createGame(template : string, minPlayers : number, maxPlayers : number) : void
		{
			console.log(
				template,
				minPlayers,
				maxPlayers
			);
			
			this.GameListService.create(template, minPlayers, maxPlayers);
			this.$state.go('state', { id: 'somehting' });
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