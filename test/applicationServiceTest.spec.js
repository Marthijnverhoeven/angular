describe("Application Service Test", function () {
	var gameController;
	var gameService;
	var httpBackend;
	var scope;
	var gameListService;

	// test data
	var templates = [
		{
			"_id": "Shanghai",
			"__v": 0,
			"tiles": [
				{
					"xPos": 3,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 5,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 7,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 9,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 11,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 13,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 15,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 17,
					"yPos": 1,
					"zPos": 0
				}
			],
			"id": "Shanghai"
		},
		{
			"_id": "Rooster",
			"__v": 0,
			"tiles": [
				{
					"xPos": 1,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 13,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 15,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 17,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 19,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 21,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 25,
					"yPos": 1,
					"zPos": 0
				},
				{
					"xPos": 27,
					"yPos": 1,
					"zPos": 0
				}
			],
			"id": "Rooster"
		}]

	var template = {
		"_id": "Rooster",
		"__v": 0,
		"tiles": [
			{
				"xPos": 1,
				"yPos": 1,
				"zPos": 0
			},
			{
				"xPos": 13,
				"yPos": 1,
				"zPos": 0
			},
			{
				"xPos": 15,
				"yPos": 1,
				"zPos": 0
			},
			{
				"xPos": 17,
				"yPos": 1,
				"zPos": 0
			},
			{
				"xPos": 19,
				"yPos": 1,
				"zPos": 0
			},
			{
				"xPos": 21,
				"yPos": 1,
				"zPos": 0
			},
			{
				"xPos": 25,
				"yPos": 1,
				"zPos": 0
			},
			{
				"xPos": 27,
				"yPos": 1,
				"zPos": 0
			}
		],
		"id": "Rooster"
	};

	var gamestates = [
		{
			"state": "open",
			"count": 853
		},
		{
			"state": "playing",
			"count": 825
		},
		{
			"state": "finished",
			"count": 185
		}
	];

	// initialize the app
	beforeEach(module('mahjongMadness'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function ($rootScope, $controller, $httpBackend, $injector) {
		scope = $rootScope.$new();

		httpBackend = $httpBackend;

		applicationService = $injector.get('ApplicationService');
	}));

	it('should get all game templates', function () {
		httpBackend.expectGET("http://mahjongmayhem.herokuapp.com/gametemplates/").respond(200, templates);
		httpBackend.expectGET("partials/empty.html").respond(200);
		httpBackend.expectGET("partials/index.html").respond(200);
		applicationService.templates();
		httpBackend.flush();

		var availableTemplates = applicationService.availableTemplates;

		expect(availableTemplates.length).to.equal(2);

		for (i = 0; i < availableTemplates.length; i++) {
			expect(availableTemplates[i].tiles.length).to.equal(8);
		}
	});

	it('should get a specific game template', function () {
		httpBackend.expectGET("http://mahjongmayhem.herokuapp.com/gametemplates/" + template.id).respond(200, template);
		httpBackend.expectGET("partials/empty.html").respond(200);
		httpBackend.expectGET("partials/index.html").respond(200);
		applicationService.template(template.id);
		httpBackend.flush();

		var currentTemplate = applicationService.currentTemplate;

		expect(currentTemplate.tiles.length).to.equal(8);

		for (i = 0; i < currentTemplate.tiles.length; i++) {
			expect(currentTemplate.tiles[i].xPos).to.not.be.null;
		}
	});

	it('should get a list of gamestates', function () {
		httpBackend.expectGET("http://mahjongmayhem.herokuapp.com/gamestates").respond(200, gamestates);
		httpBackend.expectGET("partials/empty.html").respond(200);
		httpBackend.expectGET("partials/index.html").respond(200);
		applicationService.states();
		httpBackend.flush();

		var availableGamestates = applicationService.availableGamestates;

		expect(availableGamestates.length).to.equal(3);

		for (i = 0; i < availableGamestates.length; i++) {
			expect(availableGamestates[i].state).to.not.be.null;
		}
	});
});
