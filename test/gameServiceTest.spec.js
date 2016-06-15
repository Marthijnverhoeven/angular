describe("Game Service Model Test", function () {
	var gameController;
	var gameService;
	var httpBackend;
	var scope;
	var gameListService;

	// test data
	var tiles = [
		{
			"xPos": 15,
			"yPos": 8,
			"zPos": 3,
			"tile": {
				"_id": 91,
				"suit": "Character",
				"name": "5",
				"matchesWholeSuit": false,
				"__v": 0,
				"id": "91"
			},
			"_id": "575e6a06b62cb21100dc5297"
		},
		{
			"xPos": 13,
			"yPos": 8,
			"zPos": 3,
			"tile": {
				"_id": 14,
				"suit": "Circle",
				"name": "4",
				"matchesWholeSuit": false,
				"__v": 0,
				"id": "14"
			},
			"_id": "575e6a06b62cb21100dc5296"
		},
		{
			"xPos": 24,
			"yPos": 7,
			"zPos": 3,
			"tile": {
				"_id": 47,
				"suit": "Bamboo",
				"name": "3",
				"matchesWholeSuit": false,
				"__v": 0,
				"id": "47"
			},
			"_id": "575e6a06b62cb21100dc5295"
		},
		{
			"xPos": 17,
			"yPos": 7,
			"zPos": 3,
			"tile": {
				"_id": 67,
				"suit": "Bamboo",
				"name": "8",
				"matchesWholeSuit": false,
				"__v": 0,
				"id": "67"
			},
			"_id": "575e6a06b62cb21100dc5294"
		},
		{
			"xPos": 15,
			"yPos": 6,
			"zPos": 3,
			"tile": {
				"_id": 96,
				"suit": "Character",
				"name": "7",
				"matchesWholeSuit": false,
				"__v": 0,
				"id": "96"
			},
			"_id": "575e6a06b62cb21100dc5293"
		},
		{
			"xPos": 13,
			"yPos": 6,
			"zPos": 3,
			"tile": {
				"_id": 128,
				"suit": "Dragon",
				"name": "Green",
				"matchesWholeSuit": false,
				"__v": 0,
				"id": "128"
			},
			"_id": "575e6a06b62cb21100dc5292"
		},
		{
			"xPos": 4,
			"yPos": 6,
			"zPos": 3,
			"tile": {
				"_id": 62,
				"suit": "Bamboo",
				"name": "7",
				"matchesWholeSuit": false,
				"__v": 0,
				"id": "62"
			},
			"_id": "575e6a06b62cb21100dc5291"
		}];

	// initialize the app
	beforeEach(module('mahjongMadness'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function ($rootScope, $controller, $httpBackend, $injector) {
		scope = $rootScope.$new();

		httpBackend = $httpBackend;

		gameService = $injector.get('GameService');
	}));

	it('should get tiles from a specific game', function () {
		httpBackend.expectGET("http://mahjongmayhem.herokuapp.com/games/575e6a06b62cb21100dc5208/tiles").respond(200, tiles);
		httpBackend.expectGET("partials/empty.html").respond(200);
		httpBackend.expectGET("partials/index.html").respond(200);
		gameService.tiles("575e6a06b62cb21100dc5208", success, fail);

		httpBackend.flush();

		function success(tiles) {
			expect(tiles.length).to.equal(7);

			for (i = 0; i < tiles.length; i++) {
				expect(tiles[i]._id).to.not.be.null;
			}
		}

		function fail(error) {
			expect(error).to.be.null;
			console.log(error);
		}
	});
});
