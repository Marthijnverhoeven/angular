module.exports = function(GameFactory, $scope){
	var self = this;//$scope;

	//### Properties ###
	self.user = "Marthijn";
	self.games = [];
	init();

	//### Constructor ###
	function init(){
		GameFactory.GET(function(games){
			self.games = games;
			console.log(games);
		});
	};
	
	/*
	self.init = function(){
		GameFactory.GET(function(games){
			self.games = games;
			console.log(games);
		});
	};
	*/

	//### Methods ###
	self.newGame = function(_title){
		//self.game = { title: "Title", players: [self.user] };
		//self.games.push({ title: _title, players: [self.user] });
		GameFactory.POST({ title: _title, players: [self.user] });
		GameFactory.GET(function(games){
			self.games = games;
			console.log(games);
		});
	};

	self.saveGame = function(){
		self.games.push(self.game);
		self.game = null;
	};

	self.joinGame = function(game){
		if(game.players.length != 4 )
			game.players.push(self.user);
	};

	self.canJoinGame = function(game){
		
		if(game.players.length == 4) {
			return false;
		}

		console.log(game.players);

		for(i = 0; i < game.players.length; i++) {
			console.log(game.players[i]);
			if(game.players[i] == self.user) {
				return false;
			}
		}

		/*if($.inArray(self.user, game.players) != -1)
			return false;*/

		return true;
	}
};