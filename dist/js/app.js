var Application;
(function (Application) {
    var Model;
    (function (Model) {
        var Game = (function () {
            function Game() {
            }
            Game.prototype.canVisit = function () {
                return this.state == 'open';
            };
            return Game;
        }());
        Model.Game = Game;
    })(Model = Application.Model || (Application.Model = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Model;
    (function (Model) {
        var Tile = (function () {
            function Tile() {
            }
            Tile.prototype.isOnTop = function (tile) {
                var self = this;
                return ((self.xPos - 1 === tile.xPos || self.xPos === tile.xPos || self.xPos + 1 === tile.xPos)
                    && (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos));
            };
            Tile.prototype.isLeftOrRight = function (tile) {
                var self = this;
                return ((self.xPos - 2 === tile.xPos || self.xPos + 2 === tile.xPos)
                    && (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos));
            };
            Tile.prototype.canMatch = function (tiles) {
                var self = this;
                for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                    var tile = tiles_1[_i];
                    if (!self.isOnTop(tile) && this.isLeftOrRight(tile)) {
                    }
                }
                return null;
            };
            return Tile;
        }());
        Model.Tile = Tile;
    })(Model = Application.Model || (Application.Model = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Model;
    (function (Model) {
        var User = (function () {
            function User() {
            }
            return User;
        }());
        Model.User = User;
    })(Model = Application.Model || (Application.Model = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var GameListController = (function () {
            function GameListController(UserService, GameListService, $scope, $http) {
                this.UserService = UserService;
                this.GameListService = GameListService;
                this.$scope = $scope;
                this.$http = $http;
                this.user = {
                    id: '1'
                };
                console.log('ctor gamelistctrl');
            }
            GameListController.prototype.createGame = function (template, minPlayers, maxPlayers) {
            };
            return GameListController;
        }());
        Controllers.GameListController = GameListController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var GameController = (function () {
            function GameController(UserService, $http, $stateParams, $scope) {
                this.UserService = UserService;
                this.$scope = $scope;
                this.test = "test";
                console.log($stateParams);
                if ($stateParams.id === 0) {
                    $stateParams.id = '5541fc5b1872631100678bb4';
                }
                var self = this;
                var url = 'https://mahjongmayhem.herokuapp.com/games/' + $stateParams.id + '/tiles';
                $http.get(url).success(function (data) {
                    self.tiles = data;
                });
            }
            GameController.prototype.currentGame = function () {
                return this.$scope.selected;
            };
            GameController.prototype.matchesExist = function () {
                var self = this;
            };
            return GameController;
        }());
        Controllers.GameController = GameController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var NavigationController = (function () {
            function NavigationController($state, $scope, UserService) {
                this.$state = $state;
                this.$scope = $scope;
                this.UserService = UserService;
                this.navigationDictionary = {
                    'index': { title: 'Index', items: this.getItemsWithActive("index") },
                    'login': { title: 'Login', items: this.getItemsWithActive("login") },
                    'allGames': { title: 'All games', items: this.getItemsWithActive("allGames") },
                    'allGames.myGames': { title: 'My games', items: this.getItemsWithActive("myGames") }
                };
                console.log('nav ctor');
                var self = this;
                this.title = 'Error';
                this.menuitems = [];
                this.user = {};
                $scope.currState = $state;
                $scope.$watch('currState.current.name', function (newValue, oldValue) {
                    if (newValue !== undefined && !!newValue) {
                        var nav = self.navigationDictionary[newValue];
                        if (!!nav) {
                            self.title = nav.title || 'Error';
                            self.menuitems = nav.items || [];
                        }
                    }
                });
            }
            NavigationController.prototype.getItemsWithActive = function (active) {
                var items = [
                    { label: 'Index', state: 'index' },
                    { label: 'Login', state: 'login' },
                    { label: 'All games', state: 'allGames' },
                    { label: 'My games', state: 'myGames' }
                ];
                var activeAdded = false;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].state === active) {
                        items[i].active = 'active';
                        activeAdded = true;
                        break;
                    }
                }
                if (!activeAdded) {
                    items[0].active = 'active';
                }
                return items;
            };
            return NavigationController;
        }());
        Controllers.NavigationController = NavigationController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Service;
    (function (Service) {
        'use strict';
        var GameListService = (function () {
            function GameListService($http, configuration) {
                this.$http = $http;
                this.configuration = configuration;
                this.games = [
                    {
                        "_id": "5759d218e22c671100821f5a",
                        "createdBy": {
                            "_id": "rjl.ernens@student.avans.nl",
                            "name": "Roel Ernens",
                            "__v": 0
                        },
                        "createdOn": "2016-06-09T20:31:20.802Z",
                        "gameTemplate": {
                            "_id": "Ox",
                            "__v": 0,
                            "id": "Ox"
                        },
                        "__v": 0,
                        "players": [
                            {
                                "_id": "rjl.ernens@student.avans.nl",
                                "name": "Roel Ernens",
                                "__v": 0
                            }
                        ],
                        "maxPlayers": 32,
                        "minPlayers": 2,
                        "state": "open",
                        "id": "5759d218e22c671100821f5a"
                    },
                    {
                        "_id": "5759d106e22c671100821ec9",
                        "createdBy": {
                            "_id": "rjl.ernens@student.avans.nl",
                            "name": "Roel Ernens",
                            "__v": 0
                        },
                        "createdOn": "2016-06-09T20:26:46.524Z",
                        "gameTemplate": {
                            "_id": "Ox",
                            "__v": 0,
                            "id": "Ox"
                        },
                        "__v": 0,
                        "players": [
                            {
                                "_id": "rjl.ernens@student.avans.nl",
                                "name": "Roel Ernens",
                                "__v": 0
                            }
                        ],
                        "maxPlayers": 32,
                        "minPlayers": 2,
                        "state": "open",
                        "id": "5759d106e22c671100821ec9"
                    }
                ];
                this.allGames = [];
            }
            GameListService.prototype.create = function (template, minPlayers, maxPlayers) {
                var self = this;
                return self.request('POST', '/games', function (result) {
                    self.createdGame = result.data;
                }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                }, {
                    template: template,
                    minPlayers: minPlayers,
                    maxPlayers: maxPlayers
                });
            };
            GameListService.prototype.readAll = function () {
                var self = this;
                return self.request('GET', '/games', function (result) {
                    self.allGames = result.data;
                }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            GameListService.prototype.read = function (id) {
                var self = this;
                return self.request('GET', '/games/' + id, function (result) {
                    self.currentGame = result.data;
                }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            GameListService.prototype.delete = function (id, onSuccess, onError) {
                var self = this;
                return self.request('DELETE', '/games/' + id, function (result) {
                    onSuccess(result.data);
                }, onError);
            };
            GameListService.prototype.request = function (method, url, onSuccess, onError, data) {
                console.log(url);
                var self = this;
                var promise = this.$http({
                    method: method,
                    url: self.configuration.apiUrl + url
                });
                promise.then(onSuccess, onError);
                return promise;
            };
            return GameListService;
        }());
        Service.GameListService = GameListService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Service;
    (function (Service) {
        'use strict';
        var GameService = (function () {
            function GameService($http, configuration) {
                this.$http = $http;
                this.configuration = configuration;
            }
            GameService.prototype.start = function (id) {
                var self = this;
                return self.request('POST', '/games/' + id + '/start', null, function (result) { }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            GameService.prototype.join = function (id) {
                var self = this;
                return self.request('POST', '/games/' + id + '/tiles/matches', null, function (result) { }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            GameService.prototype.tiles = function (id) {
                var self = this;
                return self.request('GET', '/games/' + id + '/tiles/matches', null, function (result) {
                    self.currentTiles = result.data;
                }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            GameService.prototype.match = function (id, tile1Id, tile2Id) {
                var self = this;
                return self.request('POST', '/games/' + id + '/tiles/matches', { tile1Id: tile1Id, tile2Id: tile2Id }, function (result) { }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            GameService.prototype.request = function (method, url, data, onSuccess, onError) {
                console.log(url);
                var self = this;
                var promise = this.$http({
                    method: method,
                    url: self.configuration.apiUrl + url
                });
                promise.then(onSuccess, onError);
                return promise;
            };
            return GameService;
        }());
        Service.GameService = GameService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Service;
    (function (Service) {
        'use strict';
        var UserService = (function () {
            function UserService(configuration) {
                this.configuration = configuration;
                this.user = {};
            }
            UserService.prototype.authenticationUrl = function () {
                var callback = encodeURIComponent(this.configuration.baseUrl + this.configuration.authCallback);
                return this.configuration.apiUrl + '/auth/avans?callbackUrl=' + callback;
            };
            UserService.prototype.setUser = function (username, token) {
                this.user.name = username;
                this.user.token = token;
            };
            return UserService;
        }());
        Service.UserService = UserService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Factory;
    (function (Factory) {
        'use strict';
        Factory.$inject = ['UserService'];
        function HttpInterceptorFactory(UserService) {
            return {
                'request': function (config) {
                    if (UserService.user && UserService.user.name && UserService.user.token) {
                        config.headers = { "x-username": UserService.user.name, "x-token": UserService.user.token };
                    }
                    return config;
                }
            };
        }
        Factory.HttpInterceptorFactory = HttpInterceptorFactory;
    })(Factory = Application.Factory || (Application.Factory = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directive;
    (function (Directive) {
        var TileDirective = (function () {
            function TileDirective() {
                this.template = '<div ng-click="click()" class="tile {{ datasource.tile.suit }}-{{ datasource.tile.name }} {{ getEffects(isBlocked, isSelected) }}" style="left: {{ datasource.xPos * 25 + (datasource.zPos * 8) }}; top: {{ datasource.yPos * (349/480*50) - (datasource.zPos * 8) }}; z-index: {{ datasource.zPos }}"></div>';
                this.scope = {
                    datasource: '='
                };
            }
            TileDirective.prototype.controller = function ($scope) {
                var switchMatchedTile = function () {
                    if ($scope.isSelected) {
                    }
                    else {
                    }
                };
                $scope.getEffects = function (isBlocked, isSelected) {
                    return isBlocked
                        ? 'blocked'
                        : (isSelected
                            ? 'selected'
                            : '');
                };
                $scope.isSelected = false;
                $scope.isBlocked = Math.random() > 0.5;
                $scope.click = function () {
                    if ($scope.isBlocked)
                        return;
                    $scope.isSelected = !$scope.isSelected;
                    switchMatchedTile();
                };
            };
            return TileDirective;
        }());
        Directive.TileDirective = TileDirective;
        function TileDirectiveFactory() {
            return new TileDirective();
        }
        Directive.TileDirectiveFactory = TileDirectiveFactory;
    })(Directive = Application.Directive || (Application.Directive = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directive;
    (function (Directive) {
        var GameItemDirective = (function () {
            function GameItemDirective() {
                this.template = '' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                    'SITNRD' +
                    '</div>' +
                    '<div class="panel-body">' +
                    '<ul class="list-group">' +
                    '<li class="list-group-item disabled">' +
                    'Spelers' +
                    '</li>' +
                    '<a ng-repeat="player in game.players" class="list-group-item" ui-sref="user({ player: player })">{{ player }}</a>' +
                    '</ul>' +
                    '</div>' +
                    '</div>';
                GameItemDirective.prototype.link = function (scope, element, attrs) {
                };
            }
            GameItemDirective.Factory = function () {
                var directive = function () {
                    return new GameItemDirective();
                };
                directive['$inject'] = [];
                return directive;
            };
            return GameItemDirective;
        }());
        Directive.GameItemDirective = GameItemDirective;
    })(Directive = Application.Directive || (Application.Directive = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directive;
    (function (Directive) {
        var UserDirective = (function () {
            function UserDirective() {
                this.template = '' +
                    '<div class="col-lg-8 col-lg-offset-2">' +
                    '{{ name }}' +
                    '</div>';
                this.name = "Noot noot!";
            }
            UserDirective.Factory = function () {
                var directive = function () {
                    return new UserDirective();
                };
                directive['$inject'] = [];
                return directive;
            };
            return UserDirective;
        }());
        Directive.UserDirective = UserDirective;
    })(Directive = Application.Directive || (Application.Directive = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Filter;
    (function (Filter) {
        'use strict';
        var OwnedGames = (function () {
            function OwnedGames() {
                this.$inject = [];
            }
            OwnedGames.prototype.filter = function () {
                return function (games, userId) {
                    var filtered = [];
                    if (userId && games) {
                        for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
                            var game = games_1[_i];
                            console.error(game);
                            if (game.createdBy.id === userId) {
                                filtered.push(game);
                            }
                        }
                    }
                    return userId
                        ? filtered
                        : games;
                };
            };
            OwnedGames.Factory = function () {
                var instance = new OwnedGames();
                var filter = instance.filter;
                filter['$inject'] = [];
                return filter;
            };
            return OwnedGames;
        }());
        Filter.OwnedGames = OwnedGames;
    })(Filter = Application.Filter || (Application.Filter = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Config;
    (function (Config) {
        'use strict';
        var Router = (function () {
            function Router(configuration, $stateProvider, $urlRouterProvider) {
                this.configuration = configuration;
                this.$stateProvider = $stateProvider;
                this.$urlRouterProvider = $urlRouterProvider;
                this.$urlRouterProvider
                    .otherwise("/index");
                this.appendBaseStates();
                this.appendAuthenticationStates();
                this.appendGameStates();
                this.appendListStates();
            }
            Router.prototype.appendBaseStates = function () {
                this.$stateProvider
                    .state('index', {
                    url: "/index",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewMainPanel": { templateUrl: "partials/index.html" }
                    }
                });
            };
            Router.prototype.appendAuthenticationStates = function () {
                this.$stateProvider
                    .state('login', {
                    url: "/login",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewMainPanel": {
                            templateUrl: "partials/login.html",
                            controller: function ($scope, UserService) {
                                this.UserService = UserService;
                            },
                            controllerAs: "loginCtrl"
                        }
                    }
                })
                    .state('authentication', {
                    url: "/authCallback?username&token",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewMainPanel": {
                            templateUrl: "partials/empty.html",
                            controller: function ($scope, $http, $state, $stateParams, UserService) {
                                UserService.setUser($stateParams.username, $stateParams.token);
                            }
                        }
                    }
                });
            };
            Router.prototype.appendGameStates = function () {
                this.$stateProvider
                    .state('game', {
                    url: "/game/{id}",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewBigPanel": { templateUrl: "partials/gameBoard.html" }
                    },
                    resolve: {
                        game: function (GameListService, $stateParams) {
                            return GameListService.read($stateParams.id);
                        }
                    }
                })
                    .state('matched', {
                    url: "/matched",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewBigPanel": { templateUrl: "partials/matched.html" }
                    },
                    resolve: {
                        tiles: function (GameService, $stateParams) {
                            return GameService.tiles($stateParams.id);
                        }
                    }
                });
            };
            Router.prototype.appendListStates = function () {
                this.$stateProvider
                    .state('allGames', {
                    url: "/games",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/user.html" },
                        "viewMainPanel": {
                            templateUrl: "partials/gameList.html",
                            controller: 'gameListController',
                            controllerAs: 'gameList'
                        }
                    },
                    resolve: {
                        games: function (GameListService) {
                            return GameListService.readAll();
                        }
                    }
                })
                    .state('myGames', {
                    url: "/games/me",
                    views: {
                        "viewSidePanel": {
                            templateUrl: "partials/user.html"
                        },
                        "viewMainPanel": {
                            templateUrl: "partials/mygames.html",
                            controller: 'gameListController',
                            controllerAs: 'gameList'
                        }
                    },
                    resolve: {
                        games: function (GameListService) {
                            return GameListService.readAll();
                        }
                    }
                });
            };
            return Router;
        }());
        Config.Router = Router;
        Config.$inject = ['configuration', '$stateProvider', '$urlRouterProvider'];
        function RouterFactory(configuration, $stateProvider, $urlRouterProvider) {
            return new Router(configuration, $stateProvider, $urlRouterProvider);
        }
        Config.RouterFactory = RouterFactory;
    })(Config = Application.Config || (Application.Config = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Config;
    (function (Config) {
        'use strict';
        var Initializer = (function () {
            function Initializer($httpProvider) {
                $httpProvider.interceptors.push('httpRequestInterceptor');
            }
            return Initializer;
        }());
        Config.Initializer = Initializer;
        Config.$inject = ['$httpProvider'];
        function InitializerFactory($httpProvider) {
            return new Initializer($httpProvider);
        }
        Config.InitializerFactory = InitializerFactory;
    })(Config = Application.Config || (Application.Config = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Constant;
    (function (Constant) {
        'use strict';
        var Configuration = (function () {
            function Configuration() {
                this.authCallback = "/#/authCallback";
                this.baseUrl = "http://localhost:3000";
                this.apiUrl = "http://mahjongmayhem.herokuapp.com";
            }
            return Configuration;
        }());
        Constant.Configuration = Configuration;
        Constant.$inject = [];
        Constant.ConfigurationFactory = (function () {
            return new Configuration();
        })();
    })(Constant = Application.Constant || (Application.Constant = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    'use strict';
    var mahjongMadness = angular.module('mahjongMadness', ['ui.router', 'ngRoute']);
    console.log('TEST');
    mahjongMadness.factory('httpRequestInterceptor', Application.Factory.HttpInterceptorFactory);
    mahjongMadness.config(Application.Config.RouterFactory);
    mahjongMadness.config(Application.Config.InitializerFactory);
    mahjongMadness.constant('configuration', Application.Constant.ConfigurationFactory);
    mahjongMadness.directive('tile', Application.Directive.TileDirectiveFactory);
    mahjongMadness.directive('user', Application.Directive.UserDirective.Factory());
    mahjongMadness.directive('gameitem', Application.Directive.GameItemDirective.Factory());
    mahjongMadness.filter('ownedGames', Application.Filter.OwnedGames.Factory());
    mahjongMadness.service('GameListService', Application.Service.GameListService);
    mahjongMadness.service('UserService', Application.Service.UserService);
    mahjongMadness.service('GameService', Application.Service.GameService);
    mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
    mahjongMadness.controller('gameController', Application.Controllers.GameController);
    mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map