describe("Game List Model Test", function () {
	var gameController;
	var gameService;
	var httpBackend;
	var scope;
	var gameListService;

	// Test data
	var game = {
		"_id": "575e6a06b62cb21100dc5208",
		"createdBy": {
			"_id": "jwa.vermeulen@student.avans.nl",
			"name": "Joost Vermeulen",
			"__v": 0
		},
		"createdOn": "2016-06-13T08:08:38.860Z",
		"gameTemplate": {
			"_id": "Rooster",
			"__v": 0,
			"id": "Rooster"
		},
		"__v": 0,
		"startedOn": "2016-06-13T08:08:48.394Z",
		"players": [
			{
				"_id": "jwa.vermeulen@student.avans.nl",
				"name": "Joost Vermeulen",
				"__v": 0
			}
		],
		"maxPlayers": 1,
		"minPlayers": 1,
		"state": "playing",
		"id": "575e6a06b62cb21100dc5208"
	};

	var games = [
		{
			"_id": "575ea54eb62cb21100dc709e",
			"createdBy": {
				"_id": "r.smith@student.avans.nl",
				"name": "Ryan Smith",
				"__v": 0
			},
			"createdOn": "2016-06-13T12:21:34.708Z",
			"gameTemplate": {
				"_id": "Dragon",
				"__v": 0,
				"id": "Dragon"
			},
			"__v": 0,
			"startedOn": "2016-06-13T12:21:42.276Z",
			"players": [
				{
					"_id": "r.smith@student.avans.nl",
					"name": "Ryan Smith",
					"__v": 0
				}
			],
			"maxPlayers": 1,
			"minPlayers": 1,
			"state": "playing",
			"id": "575ea54eb62cb21100dc709e"
		},
		{
			"_id": "575ea505b62cb21100dc700d",
			"createdBy": {
				"_id": "rjl.ernens@student.avans.nl",
				"name": "Roel Ernens",
				"__v": 0
			},
			"createdOn": "2016-06-13T12:20:21.073Z",
			"gameTemplate": {
				"_id": "Ox",
				"__v": 0,
				"id": "Ox"
			},
			"__v": 1,
			"players": [
				{
					"_id": "rjl.ernens@student.avans.nl",
					"name": "Roel Ernens",
					"__v": 0
				},
				{
					"_id": "p.mulders1@Student.avans.nl",
					"name": "Paul Mulders",
					"__v": 0
				}
			],
			"maxPlayers": 32,
			"minPlayers": 2,
			"state": "open",
			"id": "575ea505b62cb21100dc700d"
		}];

	var myGames = [{
		"_id": "575e8feab62cb21100dc6275",
		"createdBy": {
			"_id": "fs.karsodimedjo@student.avans.nl",
			"name": "Fahiem Karsodimedjo",
			"__v": 0
		},
		"createdOn": "2016-06-13T10:50:18.793Z",
		"gameTemplate": {
			"_id": "Snake",
			"__v": 0,
			"id": "Snake"
		},
		"__v": 1,
		"players": [
			{
				"_id": "fs.karsodimedjo@student.avans.nl",
				"name": "Fahiem Karsodimedjo",
				"__v": 0
			},
			{
				"_id": "p.mulders1@Student.avans.nl",
				"name": "Paul Mulders",
				"__v": 0
			}
		],
		"maxPlayers": 4,
		"minPlayers": 2,
		"state": "open",
		"id": "575e8feab62cb21100dc6275"
	},
		{
			"_id": "575e8fb1b62cb21100dc61e4",
			"createdBy": {
				"_id": "fs.karsodimedjo@student.avans.nl",
				"name": "Fahiem Karsodimedjo",
				"__v": 0
			},
			"createdOn": "2016-06-13T10:49:21.573Z",
			"gameTemplate": {
				"_id": "Shanghai",
				"__v": 0,
				"id": "Shanghai"
			},
			"__v": 2,
			"players": [
				{
					"_id": "fs.karsodimedjo@student.avans.nl",
					"name": "Fahiem Karsodimedjo",
					"__v": 0
				},
				{
					"_id": "mjf.hoskam@student.avans.nl",
					"name": "Mike Hoskam",
					"__v": 0
				},
				{
					"_id": "p.mulders1@Student.avans.nl",
					"name": "Paul Mulders",
					"__v": 0
				}
			],
			"maxPlayers": 4,
			"minPlayers": 2,
			"state": "open",
			"id": "575e8fb1b62cb21100dc61e4"
		},
		{
			"_id": "575e88edb62cb21100dc6031",
			"createdBy": {
				"_id": "fs.karsodimedjo@student.avans.nl",
				"name": "Fahiem Karsodimedjo",
				"__v": 0
			},
			"createdOn": "2016-06-13T10:20:29.535Z",
			"gameTemplate": {
				"_id": "Shanghai",
				"__v": 0,
				"id": "Shanghai"
			},
			"__v": 2,
			"players": [
				{
					"_id": "fs.karsodimedjo@student.avans.nl",
					"name": "Fahiem Karsodimedjo",
					"__v": 0
				},
				{
					"_id": "nc.snakenborg@student.avans.nl",
					"name": "Niels Snakenborg",
					"__v": 0
				},
				{
					"_id": "p.mulders1@Student.avans.nl",
					"name": "Paul Mulders",
					"__v": 0
				}
			],
			"maxPlayers": 4,
			"minPlayers": 2,
			"state": "open",
			"id": "575e88edb62cb21100dc6031"
		}];

	// initialize the app
	beforeEach(module('mahjongMadness'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function ($rootScope, $controller, $httpBackend, $injector) {
		scope = $rootScope.$new();

		httpBackend = $httpBackend;

		gameListService = $injector.get('GameListService');
		gameListService.UserService.user.name = "fs.karsodimedjo@student.avans.nl";
	}));

	it('should get a specific game', function () {
		httpBackend.expectGET("http://mahjongmayhem.herokuapp.com/games/" + game.id).respond(200, game);
		httpBackend.expectGET("partials/empty.html").respond(200);
		httpBackend.expectGET("partials/index.html").respond(200);
		gameListService.read(game.id);
		httpBackend.flush();

		var currentGame = gameListService.currentGame;

		expect(currentGame._id).to.equal(game.id);
	});

	it('should get a list of games', function () {
		httpBackend.expectGET("http://mahjongmayhem.herokuapp.com/games").respond(200, games);
		httpBackend.expectGET("partials/empty.html").respond(200);
		httpBackend.expectGET("partials/index.html").respond(200);
		gameListService.readAll();
		httpBackend.flush();

		var allGames = gameListService.allGames;
		expect(allGames.length).to.equal(2);
	});

	it('should get a list of games created by me', function () {
		httpBackend.expectGET("http://mahjongmayhem.herokuapp.com/games?createdBy=" + gameListService.UserService.user.name).respond(200, myGames);
		httpBackend.expectGET("partials/empty.html").respond(200);
		httpBackend.expectGET("partials/index.html").respond(200);
		gameListService.readCreated();
		httpBackend.flush();

		var createdGames = gameListService.createdGames;
		expect(createdGames.length).to.equal(3);

		for(i = 0; i < createdGames.length; i++) {
			expect(createdGames[i].createdBy._id).to.equal("fs.karsodimedjo@student.avans.nl");
		}
	});
});
