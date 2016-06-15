describe("Filter: filterForPlayer tests", function () {
	var filterForPlayer;
	
	beforeEach(module('mahjongMadness'));

	beforeEach(inject(function ($rootScope, _filterForPlayerFilter_) {
		filterForPlayer = _filterForPlayerFilter_;
	}));

	it('should return all tiles', function () {
		var tiles = [
			{ match: { foundBy: 'jake' } },
			{ match: { foundBy: 'jake' } },
			{ match: { foundBy: 'jake' } },
		]
		
		var result = filterForPlayer(tiles);
		
		expect(result).to.have.length.of(3);
	});
	
	it('should return all tiles for name', function () {
		var tiles = [
			{ match: { foundBy: 'jake' } },
			{ match: { foundBy: 'jake' } },
			{ match: { foundBy: 'Hanzo' } },
		]
		var name = 'jake';
		
		var result = filterForPlayer(tiles, name);
		
		expect(result).to.have.length.of(2);
		expect(result).to.not.deep.include.members([{ match: { foundBy: 'Hanzo' } }])
	});
	
	it('should return no tiles', function () {
		var tiles = [
			{ match: { foundBy: 'jake' } },
			{ match: { foundBy: 'Herry' } },
			{ match: { foundBy: 'Hanzo' } },
		]
		var name = 'Bob';
		
		var result = filterForPlayer(tiles, name);
		
		expect(result).to.not.be.null;
		expect(result).to.have.length.of(0);
	});
});