/// <reference path="../ts/_all.ts" />

namespace Application.Controller
{
	'use strict'
	
	// Declarations
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
	export class GameController
	{
		public currentGame: Application.Model.Game;
		
		constructor(game: IResult<Application.Model.Game>,
			private $stateParams: angular.ui.IStateParamsService)
		{
			this.currentGame = new Application.Model.Game(game.data);
		}
		
		public canOpenGame() : boolean
		{
			return this.currentGame.state !== 'open';
		}
		
		public canSeeHistory() : boolean
		{
			return this.currentGame.state === 'playing'
				|| this.currentGame.state === 'finished';
		}
	}
}