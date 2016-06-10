/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict';
	declare var _ : any;
	
	// declare type SuccessCallback<T> = (data: T) => void;
	// declare type ErrorCallback<T> = (error: Error, data: T) => void;
	declare type onSuccess<T> = Application.Model.SuccessCallback<T>;
	declare type onError<T> = Application.Model.ErrorCallback<T>;
	declare type Game = Application.Model.Game;
	
	export class GameListService
	{
		private games = [
			<Game>{
				"_id": "5759d218e22c671100821f5a",
				"createdBy": {
					"_id": "rjl.ernens@student.avans.nl",
					"name": "Roel Ernens",
					"__v": 0
				},
				"createdOn": "2016-06-09T20:31:20.802Z",
				"gameTemplate": {
					"_id": "Ox",
					"__v": 0,
					"id": "Ox"
				},
				"__v": 0,
				"players": [
				{
					"_id": "rjl.ernens@student.avans.nl",
					"name": "Roel Ernens",
					"__v": 0
				}
				],
				"maxPlayers": 32,
				"minPlayers": 2,
				"state": "open",
				"id": "5759d218e22c671100821f5a"
			},
			<Game>{
				"_id": "5759d106e22c671100821ec9",
				"createdBy": {
				"_id": "rjl.ernens@student.avans.nl",
				"name": "Roel Ernens",
				"__v": 0
				},
				"createdOn": "2016-06-09T20:26:46.524Z",
				"gameTemplate": {
				"_id": "Ox",
				"__v": 0,
				"id": "Ox"
				},
				"__v": 0,
				"players": [
				{
					"_id": "rjl.ernens@student.avans.nl",
					"name": "Roel Ernens",
					"__v": 0
				}
				],
				"maxPlayers": 32,
				"minPlayers": 2,
				"state": "open",
				"id": "5759d106e22c671100821ec9"
			}
		]
		
		constructor(private $http)
		{ }
		
		public create(template : string, minPlayers : number, maxPlayers : number) : Game
		{
			// POST - /games
			throw new Error('NotImplementedError');
		}
		
		public readAll(onSuccess : onSuccess<Game[]>, onError : onError<Game[]>) : void
		{
			// GET - /games
			throw new Error('NotImplementedError');
		}
		
		public read(id : number) : Game
		{
			// GET - /games/{id}
			throw new Error('NotImplementedError');
		}
		
		public delete(id : number) : void
		{
			// DELETE - /games/{id}
			throw new Error('NotImplementedError');	
		}
		
		// public GET(id, callBack) {
		// 	var self = this;
		// 	self.$timeout(function () {
		// 		if (_.isFunction(id)) {
		// 			callBack = id; //First param is the callback
		// 			return callBack(self.games);
		// 		}
		// 		else {
		// 			var result = _.findWhere(self.games, { id: id });
		// 			return callBack(result);
		// 		}

		// 	}, 1000);
		// }
		
		// public PUT(game) {
		// 	// stub
		// 	throw new Error('NotImplementedError');
		// }
		
		// public POST(game) {
		// 	var self = this;
		// 	var ids = [];
			
		// 	for(var i = 0; i < self.games.length; i++) {
		// 		ids.push(self.games[i].id);
		// 	}
			
		// 	var largest = Math.max.apply(Math, ids);
		// 	var newID = largest + 1;

		// 	game.id = newID;
		// 	self.games.push(game);
		// }
		
		// public DELETE(game) {
		// 	// fake
		// 	throw new Error('NotImplementedError');
		// }
	}
}