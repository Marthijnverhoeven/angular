describe("Parameter Reader Service Test", function () {
	var parameterReaderService;
	var configuration

	// initialize the app
	beforeEach(module('mahjongMadness'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function ($rootScope, $injector) {		
		parameterReaderService = $injector.get('ParameterReaderService');
		configuration = $injector.get('configuration');
	}));

	it('should get all parameters', function () {
		configuration.pageSize = 10;
		var testParams = {
			pageIndex: 2,
			createdBy: 'Faker',
			player: 'Hans',
			gameTemplate: 'Ox',
			state: 'game'
		}
		
		var params = parameterReaderService.getParams(testParams);
		
		expect(params).to.have.length.of(6);
		expect(params[0]).to.have.property('name');
		expect(params[0]).to.have.property('value');
		expect(params).to.deep.include.members([{ name: 'pageSize', value: '10' }])
	});
	
	it('should get 1 paramter', function () {
		configuration.pageSize = 2;
		var testParams = {}
		
		var params = parameterReaderService.getParams(testParams);
		
		expect(params).to.have.length.of(1);
		expect(params[0]).to.have.property('name');
		expect(params[0]).to.have.property('value');
		expect(params).to.deep.include.members([{ name: 'pageSize', value: '2' }])
	});
});
