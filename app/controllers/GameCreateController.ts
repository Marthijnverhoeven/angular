/// <reference path="../ts/_all.ts" />

namespace Application.Controller
{
	'use strict'
	
	// Declarations
	declare var io: SocketIOStatic;
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
	export class GameCreateController
	{
		public templates: any[];
		public newGame: any;
		public minPlayers: number;
		public maxPlayers: number;
		
		constructor(
			templates: IResult<any>, // todo: create model
			private $state: angular.ui.IStateService,
			private configuration: Application.Constant.Configuration,
			private GameListService: Application.Service.GameListService)
		{
			this.templates = templates.data;
			this.newGame = {
				template: templates[0],
				minPlayers: 1,
				maxPlayer: 2
			}
			this.minPlayers = configuration.minPlayers;
			this.maxPlayers = configuration.maxPlayers;
		}
		
		public canCreateGame(template: string, min: number, max: number) : boolean
		{
			return template != null
				&& min <= max;
		}
		
		public createGame(template: string, min: number, max: number) : void
		{					
			var self = this;				
			self.GameListService.create(template, min, max,
				(game) =>
				{
					self.$state.go('game', { id: game._id });
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