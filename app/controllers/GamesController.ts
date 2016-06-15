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
		
		public filter: { [key: string] : any } = {};
		
		public states = ['playing', 'finished', 'open']
		
		constructor(
			games: IResult<Application.Model.Game[]>, 
			public title: string,
			private fromCreatedBy: boolean,
			private $scope: ng.IScope,
			private $state: angular.ui.IStateService,
			private AuthService: Application.Service.AuthService,
			private GameService: Application.Service.GameService,
			private GameListService: Application.Service.GameListService,
			private ParameterReaderService: Application.Service.ParameterReaderService)
		{
			this.setGames(games);
			this.filter['pageIndex'] = 0;
		}
		
		public RetrieveGames()
		{
			var self = this;
			var params = this.ParameterReaderService.getParams(self.filter);
			if(self.fromCreatedBy) {
				params.push({ name: "createdBy", value: self.AuthService.user.name });
			}
			return this.GameListService.readAll(params,
				(games: Application.Model.Game[]) => {
					self.games = games;
				},
				(error) => {
					alert('De lijst van spellen kon niet worden opgehaald, probeer het zo opnieuw.');
					throw error;
				}
			);
		}
		
		private getGame(id: string) : Application.Model.Game
		{
			for(var game of this.games)
			{
				if(game.id == id)
				{
					return game;
				}
			}
			return null;
		}
		
		public setGames(games: IResult<Application.Model.Game[]>)
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
			var startable = game.canStart(self.AuthService.user);
			return startable;
		}
		
		public startGame(game: Application.Model.Game)
		{
			var self = this;
			self.GameService.start(game._id,
				(id) =>
				{
					self.$state.go('game.board', { id: id });
				},
				(error) =>
				{
					alert('De game kon niet gestart worden, probeer het later opnieuw.');
					console.error(error);
				}
			);
		}
		
		public canPrevious()
		{
			return this.filter['pageIndex'] - 1 >= 0;
		}
		
		public toPrevious()
		{
			this.filter['pageIndex']--;
			console.log(this.filter);
			this.RetrieveGames();
		}
		
		public canNext()
		{
			return this.games.length > 0; //this.filter['pageIndex']
		}
		
		public toNext()
		{
			this.filter['pageIndex']++;
			console.log(this.filter);
			this.RetrieveGames();
		}
	}
}