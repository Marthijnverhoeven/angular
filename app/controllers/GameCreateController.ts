/// <reference path="../ts/_all.ts" />

namespace Application.Controller
{
	'use strict'
	
	// Declarations
	declare var io: SocketIOStatic;
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
	export class GameCreateController
	{
		public templates: string[];
		public newGame: any;
		public minPlayers: number;
		public maxPlayers: number;
		
		constructor(
			templates: IResult<any>, // todo: create model
			private $state: angular.ui.IStateService,
			private configuration: Application.Constant.Configuration,
			private GameListService: Application.Service.GameListService)
		{
			this.newGame = {
				template: templates.data[0]._id,
				minPlayers: 1,
				maxPlayers: 2
			}
			this.templates = templates.data;
			this.minPlayers = configuration.minPlayers;
			this.maxPlayers = configuration.maxPlayers;
		}
		
		public canCreateGame() : boolean
		{
			return this.newGame.template != null
				&& this.newGame.minPlayers <= this.newGame.maxPlayers;
		}
		
		public createGame() : void
		{					
			var self = this;				
			console.log(this.newGame.template);
			self.GameListService.create(this.newGame.template, this.newGame.minPlayers, this.newGame.maxPlayers,
				(game) =>
				{
					// self.$state.go('myGames'); 
					self.$state.go(self.$state.current, {}, {reload: true});
				},
				(error) =>
				{
					alert('De game kon niet aangemaakt worden, probeer het later opnieuw.');
					console.error(error);
				}
			);
		}
	}
}