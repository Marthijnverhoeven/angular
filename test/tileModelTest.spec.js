describe("TileModel", function() {
	it('should check top', function(){
		//console.log(Application.Model.Tile);

		var tile1 = new Application.Model.Tile({});
		tile1.xPos = 1;
		tile1.yPos = 1;
		tile1.zPos = 1;

		var tile2 = new Application.Model.Tile({});
		tile2.xPos = 2;
		tile2.yPos = 0;
		tile2.zPos = 2;

		var tile3 = new Application.Model.Tile({});
		tile3.xPos = 4;
		tile3.yPos = 4;
		tile3.zPos = 2;

		var tile4 = new Application.Model.Tile({});
		tile4.xPos = 3;
		tile4.yPos = 1;
		tile4.zPos = 1;

		//Expecting tile1 being blocked on top by tile2
		expect(tile1.isTileBlockedOnTopBy(tile2)).to.be.true;

		//Expecting tile1 not being blocked on top by tile3
		expect(tile1.isTileBlockedOnTopBy(tile3)).to.be.false;

		//Expecting tile1 not being blocked on top by tile4
		expect(tile1.isTileBlockedOnTopBy(tile4)).to.be.false;
	});

	it('should check sides', function(){
		
		var tile1 = new Application.Model.Tile({});
		tile1.xPos = 10;
		tile1.yPos = 10;
		tile1.zPos = 1;

		var tile2 = new Application.Model.Tile({});
		tile2.xPos = 8;
		tile2.yPos = 11;
		tile2.zPos = 1;

		var tile3 = new Application.Model.Tile({});
		tile3.xPos = 12;
		tile3.yPos = 9;
		tile3.zPos = 1;

		var tile4 = new Application.Model.Tile({});
		tile4.xPos = 8;
		tile4.yPos = 10;
		tile4.zPos = 2;

		//Expecting tile1 being blocked on the side by tile 2
		expect(tile1.isTileBlockedOnTheSideBy(tile2)).to.be.true;

		//Expecting tile1 being blocked on the side by tile 3
		expect(tile1.isTileBlockedOnTheSideBy(tile3)).to.be.true;

		//Expecting tile1 not being blocked on the side by tile 4
		expect(tile1.isTileBlockedOnTheSideBy(tile4)).to.be.false;
	});

	it('should check an array of tiles', function(){
		
		var tile1 = new Application.Model.Tile({});
		tile1.xPos = 10;
		tile1.yPos = 10;
		tile1.zPos = 1;

		var tile2 = new Application.Model.Tile({});
		tile2.xPos = 8;
		tile2.yPos = 11;
		tile2.zPos = 1;

		var tile3 = new Application.Model.Tile({});
		tile3.xPos = 12;
		tile3.yPos = 9;
		tile3.zPos = 1;

		var tile4 = new Application.Model.Tile({});
		tile4.xPos = 8;
		tile4.yPos = 10;
		tile4.zPos = 2;

		var tile5 = new Application.Model.Tile({});
		tile4.xPos = 15;
		tile4.yPos = 15;
		tile4.zPos = 2;

		var list1 = [tile2, tile3, tile4];

		//Expecting tile1 being blocked by the tiles in list1
		expect(tile1.isTileBlockedBy(list1)).to.be.true;

		//Expecting tile5 not being blocked by the tiles in list1
		expect(tile5.isTileBlockedBy(list1)).to.be.false;
	});
});
