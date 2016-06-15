describe("Filter: matchedTiles tests", function () {
	var matchedTiles;
	
	beforeEach(module('mahjongMadness'));

	beforeEach(inject(function ($rootScope, _matchedTilesFilter_) {
		matchedTiles = _matchedTilesFilter_;
	}));

	it('should get zero matched with matchAttempt', function () {
		var tiles = [
			{ matchAttempt: { isMatched: false } },
			{ matchAttempt: { isMatched: false } },
			{ matchAttempt: { isMatched: false } },
		]
		
		var result = matchedTiles(tiles);
		 
		expect(result).to.have.length.of(0);
	});
	
	it('should get matched with matchAttempt', function () {
		var tiles = [
			{ matchAttempt: { isMatched: true } },
			{ matchAttempt: { isMatched: false } },
			{ matchAttempt: { isMatched: false } },
		]
		
		var result = matchedTiles(tiles);
		
		expect(result).to.have.length.of(1);
	});
	
	it('should get matched with match.foundBy', function () {
		var tiles = [
			{ match: { foundBy: 'faker' } },
			{ match: { foundBy: 'faker2' } },
			{ match: {} },
		]
		
		var result = matchedTiles(tiles);
		
		expect(result).to.have.length.of(2);
	});
	
	
});