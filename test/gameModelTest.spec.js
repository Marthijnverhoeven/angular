describe("TileModel", function() {
	it('should check an array of tiles', function(){
		var game1 = new Application.Model.Game();

		var tile1 = new Application.Model.Tile();
		tile1.xPos = 10;
		tile1.yPos = 10;
		tile1.zPos = 1;

		var tile2 = new Application.Model.Tile();
		tile2.xPos = 8;
		tile2.yPos = 11;
		tile2.zPos = 1;

		var tile3 = new Application.Model.Tile();
		tile3.xPos = 12;
		tile3.yPos = 9;
		tile3.zPos = 1;

		var tile4 = new Application.Model.Tile();
		tile4.xPos = 8;
		tile4.yPos = 10;
		tile4.zPos = 2;

		var tile5 = new Application.Model.Tile();
		tile5.xPos = 15;
		tile5.yPos = 15;
		tile5.zPos = 2;

		var tile6 = new Application.Model.Tile();
		tile6.xPos = 18;
		tile6.yPos = 18;
		tile6.zPos = 2;

		var list1 = [tile1, tile2, tile3, tile4, tile5, tile6];

		game1.tiles = list1;

		//Expecting tile1 being blocked by the tiles in list1

		console.log(game1.getAvailableTiles());
		expect(game1.getAvailableTiles()).to.not.be.empty;
	});

	it('should check an array of matched tiles', function(){
		var game1 = new Application.Model.Game();
		
		var player1 = { 	"_id": "idTest1",
							"name": "player1",
							"__v": 1,
							"id": "idTest1" };
		
		var player2 = { 	"_id": "idTest2",
							"name": "player2",
							"__v": 2,
							"id": "idTest2" };

		var players = [player1, player2];

		game1.players = players;

		var match1 = {
				"foundBy": player1.name,
				"otherTileId": "",
				"foundOn": "" 
			};

		var tile1 = new Application.Model.Tile();
		tile1.xPos = 10;
		tile1.yPos = 10;
		tile1.zPos = 1;
		tile1.match = match1;

		var match2 = {
				"foundBy": player1.name,
				"otherTileId": "",
				"foundOn": "" 
			};

		var tile2 = new Application.Model.Tile();
		tile2.xPos = 8;
		tile2.yPos = 11;
		tile2.zPos = 1;
		tile2.match = match2;

		var match3 = {
				"foundBy": player1.name,
				"otherTileId": "",
				"foundOn": "" 
			};

		var tile3 = new Application.Model.Tile();
		tile3.xPos = 12;
		tile3.yPos = 9;
		tile3.zPos = 1;
		tile3.match = match3;

		var match4 = {
				"foundBy": player2.name,
				"otherTileId": "",
				"foundOn": "" 
			};

		var tile4 = new Application.Model.Tile();
		tile4.xPos = 8;
		tile4.yPos = 10;
		tile4.zPos = 2;
		tile4.match = match4;

		var match5 = {
				"foundBy": player2.name,
				"otherTileId": "",
				"foundOn": "" 
			};

		var tile5 = new Application.Model.Tile();
		tile5.xPos = 15;
		tile5.yPos = 15;
		tile5.zPos = 2;
		tile5.match = match5;

		var match6 = {
				"foundBy": player2.name,
				"otherTileId": "",
				"foundOn": "" 
			};

		var tile6 = new Application.Model.Tile();
		tile6.xPos = 18;
		tile6.yPos = 18;
		tile6.zPos = 2;
		tile6.match = match6;

		var list1 = [tile1, tile2, tile3, tile4, tile5, tile6];

		game1.matched = list1;

		//Verbeter dit nog.
		expect(game1.getMatchedTiles).to.not.be.empty;
	});
});
