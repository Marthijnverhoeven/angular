/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	'use strict'
	
	// Services
	declare type GameListService = Application.Service.GameListService;
	declare type GameService = Application.Service.GameService;
	declare type AuthService = Application.Service.AuthService;
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
			public AuthService: AuthService,
			public GameListService: GameListService,
			public GameService: GameService,
			public ApplicationService: ApplicationService)
		{
			this.$scope.newGame = {
				template: ApplicationService.availableTemplates[0]._id,
				minPlayers: 2,
				maxPlayers: 4
			};
		}
		
		public canJoinGame(game: Game) : boolean
		{
			return true;
		}
		
		public joinGame(game: Game) : void
		{
			this.GameService.join(game._id,
				() =>
				{
					alert('Joined');
				},
				(error) =>
				{
					alert('error');
				}
			);
		}
		
		public canCreateGame(template : string, minPlayers : number, maxPlayers : number)
		{
			return (template != null || template != undefined)
				&& minPlayers <= maxPlayers;
		}
		
		public createGame(template : string, minPlayers : number, maxPlayers : number) : void
		{
			this.GameListService.create(template, minPlayers, maxPlayers, 
				(data) =>
				{
					this.$state.go('view', { id: data._id });
				},
				(error) => 
				{
					alert(error);
				}
			);
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