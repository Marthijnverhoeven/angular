var _ = require('underscore');
var games = [
	{ id: 2, title: "Mario", players: ["a", "b", "c", "d"] },
	{ id: 3, title: "Rayman", players: ["henk", "heenk"] }
];

module.exports = function ($timeout) {
	return {
		GET: function (id, callBack) {

			$timeout(function () {
				if (_.isFunction(id)) {
					callBack = id; //First param is the callback
					return callBack(games);
				}
				else {
					var result = _.findWhere(games, { id: id });
					return callBack(result);

				}

			}, 1000);
		},
		PUT: function (game) {
			//stub
		},
		POST: function (game) {
			var ids = [];
			
			for(i = 0; i < games.length; i++) {
				ids.push(games[i].id);
			}
			
			var largest = Math.max.apply(Math, ids);
			var newID = largest + 1;

			game.id = newID;
			games.push(game);
		},
		DELETE: function (game) {
			//fake

		}
	}
}