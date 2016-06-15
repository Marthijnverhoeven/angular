/// <reference path="../ts/_all.ts" />

namespace Application.Controller
{
	'use strict'
	
	// Declarations
	declare var io: SocketIOStatic;
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
	export class GamesController
	{
		public games: Application.Model.Game[];
		
		public selected
		
		constructor(
			games: IResult<Application.Model.Game[]>,
			public title: string,
			private $state: angular.ui.IStateService,
			private GameService: Application.Service.GameService,
			private AuthService: Application.Service.AuthService)
		{
			var gameObjects = [];
			for(var game of games.data)
			{
				gameObjects.push(new Application.Model.Game(game));
			}
			this.games = gameObjects;
		}
		
		public canOpenGame(game: Application.Model.Game) : boolean
		{
			return game.state !== 'open';
		}
		
		public canSeeHistory(game: Application.Model.Game) : boolean
		{
			return game.state === 'playing'
				|| game.state === 'finished';
		}
		
		public canJoinGame(game: Application.Model.Game) : boolean
		{
			var self = this;
			return game.canJoin(self.AuthService.user);
		};
		
		public joinGame(game: Application.Model.Game) : void
		{
			var self = this;
			self.GameService.join(game._id,
				(id) =>
				{
					game.players.push(<Application.Model.Game.Player>{ _id: self.AuthService.user.name, name: self.AuthService.user.name });
				},
				(error) =>
				{
					alert('De game kon niet aangemaakt worden, probeer het later opnieuw.');
					console.error(error);
				}
			);
		};
		
		public canStartGame(game: Application.Model.Game) : boolean
		{
			var self = this;
			return game.canStart(self.AuthService.user);
		}
		
		public startGame(game: Application.Model.Game)
		{
			var self = this;
			self.GameService.start(game._id,
				(id) =>
				{
					self.$state.go('game', { id: id });
				},
				(error) =>
				{
					alert('De game kon niet gestart worden, probeer het later opnieuw.');
					console.error(error);
				}
			);
		}
	}
}