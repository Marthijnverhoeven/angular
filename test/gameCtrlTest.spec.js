describe("GameController with state `open`", function () {
	var gameCtrl;
	var game = {
		data: {
			state: 'open'
		}
	}
	
	beforeEach(module('mahjongMadness'));

	beforeEach(inject(function ($rootScope, $controller, $injector) {
		scope = $rootScope.$new();
		gameCtrl = $controller('gameController', { scope: scope, game: game });
	}));

	it('should not be able to open a game', function () {
		var result = gameCtrl.canOpenGame();
		expect(result).to.be.false;
	});
	
	it('should not be able to see game history', function () {
		var result = gameCtrl.canSeeHistory();
		expect(result).to.be.false;
	});
});

describe("GameController with state `finished`", function () {
	var gameCtrl;
	var game = {
		data: {
			state: 'finished'
		}
	}
	
	beforeEach(module('mahjongMadness'));

	beforeEach(inject(function ($rootScope, $controller, $injector) {
		scope = $rootScope.$new();
		gameCtrl = $controller('gameController', { scope: scope, game: game });
	}));

	it('should be able to open a game', function () {
		var result = gameCtrl.canOpenGame();
		expect(result).to.be.true;
	});
	
	it('should be able to see game history', function () {
		var result = gameCtrl.canSeeHistory();
		expect(result).to.be.true;
	});
});

describe("GameController with state `playing`", function () {
	var gameCtrl;
	var game = {
		data: {
			state: 'playing'
		} 
	}
	
	beforeEach(module('mahjongMadness'));

	beforeEach(inject(function ($rootScope, $controller, $injector) {
		scope = $rootScope.$new();
		gameCtrl = $controller('gameController', { scope: scope, game: game });
	}));

	it('should be able to open a game', function () {
		var result = gameCtrl.canOpenGame();
		expect(result).to.be.true;
	});
	
	it('should be able to see game history', function () {
		var result = gameCtrl.canSeeHistory();
		expect(result).to.be.true;
	});
});