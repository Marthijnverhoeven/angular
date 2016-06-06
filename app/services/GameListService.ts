/// <reference path="../ts/_all.ts" />

namespace Application.Services
{
	'use strict';
	declare var _ : any;
	
	declare type SuccessCallback<T> = (data: T) => void;
	declare type ErrorCallback<T> = (error: Error, data: T) => void;
	declare type Game = Application.Models.Game;
	
	export class GameListService
	{
		private games = [
			<Application.Models.Game>{ id: 2, title: "Mario", players: ["a", "b", "c", "d"] },
			<Application.Models.Game>{ id: 3, title: "Rayman", players: ["henk", "heenk"] }
		]
		
		constructor(private $timeout)
		{ }
		
		public create(template : string, minPlayers : number, maxPlayers : number) : Application.Models.Game
		{
			// POST - /games
			throw new Error('NotImplementedError');
		}
		
		public readAll(onSuccess : SuccessCallback<Game[]>, onError : ErrorCallback<Game[]>)
				: void
		{
			// GET - /games
			throw new Error('NotImplementedError');
		}
		
		public read(id : number) : Application.Models.Game
		{
			// GET - /games/{id}
			throw new Error('NotImplementedError');
		}
		
		public delete(id : number) : void
		{
			// DELETE - /games/{id}
			throw new Error('NotImplementedError');	
		}
		
		public GET(id, callBack) {
			var self = this;
			self.$timeout(function () {
				if (_.isFunction(id)) {
					callBack = id; //First param is the callback
					return callBack(self.games);
				}
				else {
					var result = _.findWhere(self.games, { id: id });
					return callBack(result);
				}

			}, 1000);
		}
		
		public PUT(game) {
			// stub
			throw new Error('NotImplementedError');
		}
		
		public POST(game) {
			var self = this;
			var ids = [];
			
			for(var i = 0; i < self.games.length; i++) {
				ids.push(self.games[i].id);
			}
			
			var largest = Math.max.apply(Math, ids);
			var newID = largest + 1;

			game.id = newID;
			self.games.push(game);
		}
		
		public DELETE(game) {
			// fake
			throw new Error('NotImplementedError');
		}
	}
}