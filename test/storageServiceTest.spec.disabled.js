describe("Storage Service Test", function () {
	var storageService;
	var httpBackend;
	var scope;
	var gameListService;

	// initialize the app
	beforeEach(module('mahjongMadness'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function ($rootScope, $controller, $httpBackend, $injector) {
		scope = $rootScope.$new();

		httpBackend = $httpBackend;
		
		storageService = $injector.get('StorageService');
	}));

	it('should store a key-value pair', function () {
		var result = storageService.store("testkey", {name: "testname"});
		
		expect(result).to.not.be.null;
		console.log(result);
	});
});
