namespace Application.Controllers
{
	export interface IGameListController
	{
		newGame(_title);
		saveGame();
		joinGame(game);
		canJoinGame(game);
	}
	
	export class GameListController
	{
		private games;
		private game;
		private user = 'Marthijn';
		
		constructor(private GameFactory, $scope)
		{
			var self = this;
			GameFactory.GET(function(games){
				self.games = games;
			});
		}
		
		public newGame(_title) {
			var self = this;
			self.GameFactory.POST({ title: _title, players: [self.user] });
			self.GameFactory.GET(function(games){
				self.games = games;
			});
		}
		
		public saveGame() {
			var self = this;
			self.games.push(self.game); // not sure what self.game is
			self.game = null;
		}
		
		public joinGame(game) {
			var self = this;
			if(game.players.length != 4 ) {
				game.players.push(self.user);
			}
		}
		
		public canJoinGame(game) {
			var self = this;
			
			// game is full
			if(game.players.length == 4) {
				return false;
			}
			// user is already joined
			for(var i = 0; i < game.players.length; i++) {
				if(game.players[i] == self.user) {
					return false;
				}
			}

			return true;
		}
	}
}