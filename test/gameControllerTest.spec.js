describe("GameController", function() {
	var gameController;
	var gameService;
	var httpBackend;
	var scope;
	
	// initialize the app
	beforeEach(module('mahjongMadness'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
		// The scope for the controller
		scope = $rootScope.$new();
		// Get the service which will be injected
		// gameService = $injector.get('GameService');
		// For mocking the backend
		httpBackend = $httpBackend;

		// Stubbing with sinon
		/*
		personService.sayHello = sinon.stub();
		personService.sayHello.withArgs('Martijn').returns('Stub says hi Martijn');
		personService.sayHello.returns('Hi from stub');
		*/
		
		// This is the controller we're going to test
		gameController = $controller('gameController', { $scope: scope });
		gameListController = $controller('gameListController', { $scope: scope });
	}));

	it('should mock the httpbackend', function(){
		// Given
		var currentGame = gameController.currentGame();
		// Nu expecten we het omdat we in de test zitten.
		// Bij de before of beforeEach kunnen we ook whenPost stubben
		/*
		httpBackend
			.expectPOST('http://api.myApp.com/persons/' + person.id + '/courses', { code: expectedCode })
			.respond(404, { err: expectedError });
		*/

		// When
		/*
		gameController.addCourse(person, expectedCode);
		httpBackend.flush(); // Voer synchroon uit ipv asynchroon
		*/
		// Then
		//expect(scope.error).to.equal(expectedError);
		//expect(person.courses).to.have.length(0);

		expect(currentGame).to.be.undefined;
	});

	it('should check gameListController', function(){
		gameListController.getAllGames();

		//expect(gameList).to.eventually.have.property("foo");
		sleepFor(5000);
		var gameList = gameListController.allGames;
		console.log(gameList);
		expect(gameList[0]).to.not.be.undefined;

		function sleepFor(sleepDuration) {
			var now = new Date().getTime();
			while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
		}
	});
});
