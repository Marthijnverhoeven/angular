namespace Application.Services
{	
	export interface IGameFactory
	{
		GET(id, callBack);
		PUT(game);
		POST(game);
		DELETE(game);
	}
	
	export class GameFactory
	{
		private games = [
			{ id: 2, title: "Mario", players: ["a", "b", "c", "d"] },
			{ id: 3, title: "Rayman", players: ["henk", "heenk"] }
		]
		
		constructor(private $timeout)
		{ }
		
		public GET(id, callBack) {
			var self = this;
			self.$timeout(function () {
				if (_.isFunction(id)) {
					console.log(self.games);
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
			//stub
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
			//fake
		}
	}
}