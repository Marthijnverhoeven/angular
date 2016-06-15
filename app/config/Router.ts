/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	// Globals
	declare var io: SocketIOStatic;
	
	// Blub
	declare type IResult<T> = angular.IHttpPromiseCallbackArg<T>;
	
	export class Router
	{		
		constructor(
			private configuration,
			private $stateProvider : angular.ui.IStateProvider,
			private $urlRouterProvider: angular.ui.IUrlRouterProvider)
		{
			this.$urlRouterProvider
				.otherwise("/index");
				
			this.appendBaseStates();
			this.appendAuthenticationStates();
			this.appendGameStates();
			this.appendListStates();
		}
		
		private appendBaseStates() : void
		{
			this.$stateProvider
				.state('index', {
					url: "/index",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel":
						{
							templateUrl: "partials/index.html",
							controller: function($http)
							{
								var socket = io('http://mahjongmayhem.herokuapp.com?gameId=575e8feab62cb21100dc6275');
								// start, end, playerJoined, match
								socket.on('start', () =>
								{
									console.log('game started');
								}).on('end', () =>
								{
									console.log('game ended');
								}).on('playerJoined', (player) =>
								{
									console.log('player joined');
									console.log(player);	
								}).on('match', (matchedTiles) =>
								{
									console.log('match made');
									console.log(matchedTiles);
								});
								
								// 
								// $scope.$on('$destroy', () =>
								// {
								// 	socket.close();
								// });
							} 
						}
					}
				});
		}
		
		private appendAuthenticationStates() : void
		{
			this.$stateProvider
				.state('login', {
					url: "/login",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel": {
							templateUrl: "partials/login.html",
							controller: function($scope, AuthService: Application.Service.AuthService) {
								this.authUrl = function()
								{
									return AuthService.authenticationUrl();
								};
							},
							controllerAs: "loginCtrl"
						}
					}
				})
				.state('authentication', {
					url: "/authCallback?username&token", //this.configuration.authCallback,
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewMainPanel": { 	
							templateUrl: "partials/empty.html", 
							controller: function($scope, $state: angular.ui.IStateService, AuthService: Application.Service.AuthService)
							{
								if($state.params['username'] && $state.params['token'])
								{
									AuthService.setUser($state.params['username'], $state.params['token']);
									$state.go('allGames');
								}
								else
								{
									alert('Login failed');
									$state.go('login');
								}
							}
						}
					}
					
				});
		
		}
		
		private appendGameStates() : void
		{
			this.$stateProvider
				.state('game', { // done
					url: "/game/{id}",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/game.html",
							controller: function(
								game: IResult<Application.Model.Game>)
							{
								this.currentGame = game.data;
							},
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								}
							}
						},
						"viewMainPanel": {
							templateUrl: 'partials/game-board.html',
							controller: function(
								game: IResult<Application.Model.Game>,
								tiles: IResult<Application.Model.Tile[]>)
							{
								this.currentGame = new Application.Model.Game(game.data);
								
								var tileObjects = []
								for(var tileLiteral of tiles.data)
								{
									tileObjects.push(new Application.Model.Tile(tileLiteral));
								}
								this.currentGame.tiles = tileObjects;
							},
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								},
								tiles: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.tiles($stateParams.id);
								}
							}
						}
					},
					data: { reqAuth: true }
				})
				.state('board', { // todo: substate
					url: "/game/{id}/board",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/game.html",
							controller: function(
								game: IResult<Application.Model.Game>)
							{
								this.currentGame = game.data;
							},
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								}
							}
						},
						"viewMainPanel": {
							templateUrl: 'partials/game-board.html',
							controller: function(
								game: IResult<Application.Model.Game>,
								tiles: IResult<Application.Model.Tile[]>)
							{
								game.data.tiles = tiles.data;
								this.currentGame = game.data;
							},
							controllerAs: 'gameCtrl',
							resolve: {
								game: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.read($stateParams.id);
								},
								tiles: function(GameService: Application.Service.GameService, $stateParams)
								{
									return GameService.tiles($stateParams.id);
								}
							}
						}
					},
					data: { reqAuth: true }
				})
				.state('matched', { // todo: substate
					url: "/game/{id}/matched",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/empty.html" }
					},
					data: { reqAuth: true }
				})
				.state('view', { // todo: substate
					url: "/game/{id}/view",
					views: {
						"viewSidePanel": { templateUrl: "partials/empty.html" },
						"viewBigPanel": { templateUrl: "partials/empty.html" }
					},
					data: { reqAuth: true }
				});
		}
		
		private appendListStates() : void
		{
			this.$stateProvider
				.state('allGames', {
					url: "/games",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/gamelist-controls.html",
							controller: function(
								templates: IResult<any>, // todo: create model
								$state: angular.ui.IStateService,
								configuration: Application.Constant.Configuration,
								GameListService: Application.Service.GameListService)
							{
								this.templates = templates.data;
								this.newGame = {
									template: templates[0],
									minPlayers: 1,
									maxPlayer: 2
								}
								this.minPlayers = configuration.minPlayers;
								this.maxPlayer = configuration.maxPlayers;
								this.canCreateGame = function(template: string, min: number, max: number) : boolean
								{
									return true;
								}
								this.createGame = function(template: string, min: number, max: number) : void
								{									
									GameListService.create(template, min, max,
										(game) =>
										{
											$state.go('game', { id: game._id });
										},
										(error) =>
										{
											alert('De game kon niet aangemaakt worden, probeer het later opnieuw.');
											console.error(error);
										}
									);
								}
							},
							controllerAs: 'gamesCtrl',
							resolve: {
								templates: function(ApplicationService: Application.Service.ApplicationService)
								{									
									return ApplicationService.templates();
								}
							}
						},
						"viewMainPanel": {
							templateUrl: "partials/gamelist.html",
							controller: function(
								games: IResult<Application.Model.Game[]>,
								$state: angular.ui.IStateService,
								GameService: Application.Service.GameService,
								AuthService: Application.Service.AuthService)
							{								
								this.games = games.data;
								this.canJoinGame = function(game: Application.Model.Game) : boolean
								{
									return game.state === 'open'
										&& game.players.length < game.maxPlayers
										&& (() : boolean => {
											for(var player of game.players)
											{
												if(player.id == AuthService.user.id)
												{
													return false;
												}
											}
											return true;
										})(); 
								};
								this.joinGame = function(game: Application.Model.Game) : void
								{
									GameService.join(game._id,
										(id) =>
										{
											$state.go('game', { id: id });
										},
										(error) =>
										{
											alert('De game kon niet aangemaakt worden, probeer het later opnieuw.');
											console.error(error);
										}
									);
								};
								this.canStartGame = function(game: Application.Model.Game) : boolean
								{
									return true;
								}
								this.startGame = function(game: Application.Model.Game)
								{
									GameService.start(game._id,
										(id) =>
										{
											$state.go('game', { id: id });
										},
										(error) =>
										{
											alert('De game kon niet gestart worden, probeer het later opnieuw.');
											console.error(error);
										}
									);
								}
							},
							controllerAs: 'gamesCtrl',
							resolve: {
								games: function(GameListService: Application.Service.GameListService)
								{
									return GameListService.readAll();
								}
							},
						}
					},
					data: { reqAuth: true }
				})
				.state('myGames', {
					url: "/games/me",
					views: {
						"viewSidePanel": {
							templateUrl: "partials/gamelist-controls.html",
							controller: function(
								templates: any, // todo: create model
								$state: angular.ui.IStateService,
								configuration: Application.Constant.Configuration,
								GameListService: Application.Service.GameListService)
							{
								this.templates = templates;
								this.newGame = {
									template: templates[0],
									minPlayers: 1,
									maxPlayer: 2
								}
								this.minPlayers = configuration.minPlayers;
								this.maxPlayer = configuration.maxPlayers;
								this.canCreateGame = function(template: string, min: number, max: number) : boolean
								{
									return false;
								}
								this.createGame = function(template: string, min: number, max: number) : void
								{									
									GameListService.create(template, min, max,
										(game) =>
										{
											$state.go('game', { id: game._id });
										},
										(error) =>
										{
											alert('De game kon worden gejoind, misschien is deze al vol.');
											console.error(error);
										}
									);
								}
							},
							controllerAs: 'gamesCtrl',
							resolve: {
								templates: function(ApplicationService: Application.Service.ApplicationService)
								{									
									return ApplicationService.templates();
								}
							}
						},
						"viewMainPanel": {
							templateUrl: "partials/gamelist.html",
							controller: function(
								games: Application.Model.Game[],
								$state: angular.ui.IStateService,
								GameService: Application.Service.GameService,
								AuthService: Application.Service.AuthService)
							{
								this.games = games;
								this.canJoinGame = function(game: Application.Model.Game) : boolean
								{
									return game.state === 'open'
										&& game.players.length < game.maxPlayers
										&& (() : boolean => {
											for(var player of game.players)
											{
												if(player.id == AuthService.user.id)
												{
													return false;
												}
											}
											return true;
										})(); 
								};
								this.joinGame = function(game: Application.Model.Game) : void
								{
									GameService.join(game._id,
										(id) =>
										{
											$state.go('game', { id: id });
										},
										(error) =>
										{
											alert('De game kon worden gejoind, misschien is deze al vol.');
											console.error(error);
										}
									);
								};
							},
							controllerAs: 'gamesCtrl',
							resolve: {
								games: function(GameListService: Application.Service.GameListService)
								{
									return GameListService.readCreated();
								}
							},
						}
					},
					data: { reqAuth: true }
				});
		}
	}
	
	export var $inject = ['configuration', '$stateProvider', '$urlRouterProvider'];
	
	export function RouterFactory(configuration, $stateProvider, $urlRouterProvider)
	{
		return new Router(configuration, $stateProvider, $urlRouterProvider);
	}
}