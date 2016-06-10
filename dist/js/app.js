var Application;
(function (Application) {
    var Model;
    (function (Model) {
        var Game = (function () {
            function Game() {
            }
            Game.prototype.getAvailableTiles = function () {
                var available = [];
                for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (!tile.isTileBlockedBy(this.tiles)) {
                        available.push(tile);
                    }
                }
                return available;
            };
            Game.prototype.getUnavailableAvailableTiles = function () {
                var unAvailable = [];
                for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (tile.isTileBlockedBy(this.tiles)) {
                        unAvailable.push(tile);
                    }
                }
                return unAvailable;
            };
            Game.prototype.getMatchedTiles = function () {
                var matchedList = {};
                for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                    var player = _a[_i];
                    matchedList[player.name] = [];
                }
                for (var _b = 0, _c = this.matched; _b < _c.length; _b++) {
                    var tile = _c[_b];
                    matchedList[tile.match.foundBy].push(tile);
                }
                return matchedList;
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
            Tile.prototype.isTileBlockedOnTopBy = function (tile) {
                var self = this;
                if (self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
                    return false;
                }
                return ((self.xPos - 1 === tile.xPos || self.xPos === tile.xPos || self.xPos + 1 === tile.xPos)
                    && (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
                    && (self.zPos + 1 === tile.zPos));
            };
            Tile.prototype.isTileBlockedOnTheSideBy = function (tile) {
                var self = this;
                if (self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
                    return false;
                }
                return ((self.xPos - 2 === tile.xPos || self.xPos + 2 === tile.xPos)
                    && (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
                    && (self.zPos === tile.zPos));
            };
            Tile.prototype.isTileBlockedBy = function (tiles) {
                var self = this;
                for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                    var tile = tiles_1[_i];
                    if (self.isTileBlockedOnTopBy(tile) || this.isTileBlockedOnTheSideBy(tile)) {
                        return true;
                    }
                }
                return false;
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
                this.allGames = [];
                console.log('ctor gamelistctrl');
                this.getAllGames();
            }
            GameListController.prototype.getAllGames = function () {
                var self = this;
                self.GameListService.readAll(function (games) {
                    self.allGames = games;
                }, function (error) {
                    alert("omg no :C");
                    throw error;
                });
            };
            GameListController.prototype.getMyGames = function () {
            };
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
                    console.log('gamecontroller retrieve ' + $stateParams.id, data);
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
            function NavigationController($state, $scope) {
                this.$state = $state;
                this.$scope = $scope;
                this.navigationDictionary = {
                    'index': { title: 'Index', items: this.getItemsWithActive("index") },
                    'login': { title: 'Login', items: this.getItemsWithActive("login") },
                    'allGames': { title: 'All games', items: this.getItemsWithActive("allGames") },
                    'allGames.myGames': { title: 'My games', items: this.getItemsWithActive("allGames.myGames") }
                };
                var self = this;
                this.title = 'Error';
                this.menuitems = [];
                $scope.currState = $state;
                $scope.$watch('currState.current.name', function (newValue, oldValue) {
                    console.log(newValue, oldValue);
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
                    { label: 'My games', state: 'allGames.myGames' }
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
            function GameListService($http) {
                this.$http = $http;
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
                this.availableGames = [];
            }
            GameListService.prototype.create = function (template, minPlayers, maxPlayers) {
                var self = this;
                self.request('POST', '/games', function (result) {
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
            GameListService.prototype.readAll = function (onSuccess, onError) {
                console.log('reading all gaems');
                var self = this;
                self.request('GET', '/games', function (result) {
                    self.availableGames = result.data;
                    onSuccess(result.data);
                }, onError);
            };
            GameListService.prototype.read = function (id, onSuccess, onError) {
                var self = this;
                self.request('GET', '/games/' + id, function (result) {
                    self.currentGame = result.data;
                    onSuccess(result.data);
                }, onError);
            };
            GameListService.prototype.delete = function (id, onSuccess, onError) {
                var self = this;
                self.request('DELETE', '/games/' + id, function (result) {
                    console.log(result);
                    onSuccess(result.data);
                }, onError);
            };
            GameListService.prototype.request = function (method, url, onSuccess, onError, data) {
                console.log(url);
                var self = this;
                this.$http({
                    method: method,
                    url: 'http://mahjongmayhem.herokuapp.com' + url
                }).then(onSuccess, onError);
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
            function GameService($http) {
                this.$http = $http;
            }
            GameService.prototype.start = function (id) {
                throw new Error('NotImplementedError');
            };
            GameService.prototype.join = function (id) {
                throw new Error('NotImplementedError');
            };
            GameService.prototype.tiles = function (id) {
                throw new Error('NotImplementedError');
            };
            GameService.prototype.match = function (id, body) {
                throw new Error('NotImplementedError');
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
                this.user = { name: 'Marthijn', id: '1', token: 'tests' };
                this.username = null;
                this.token = null;
            }
            UserService.prototype.authenticationUrl = function () {
                var callback = encodeURIComponent(this.configuration.baseUrl + this.configuration.authCallback);
                return 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=' + callback;
            };
            return UserService;
        }());
        Service.UserService = UserService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Service;
    (function (Service) {
        'use strict';
        function HttpInterceptor() {
            return function () {
            };
        }
        Service.HttpInterceptor = HttpInterceptor;
    })(Service = Application.Service || (Application.Service = {}));
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
                    console.error(userId);
                    var filtered = [];
                    if (userId) {
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
                this.$inject = ['configuration', '$stateProvider', '$urlRouterProvider'];
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
                                console.log($scope, UserService);
                                this.url = UserService.authenticationUrl();
                            },
                            controllerAs: "loginCtrl"
                        }
                    }
                })
                    .state('authentication', {
                    url: "/authCallback",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewMainPanel": {
                            templateUrl: "partials/empty.html",
                            controller: function ($scope, $stateParams, $state, UserService) {
                                console.log($stateParams, $state, UserService);
                                $scope.currStateParams = $stateParams;
                                $scope.$watch('currState', function () {
                                    console.log($stateParams);
                                });
                            }
                        }
                    }
                });
            };
            Router.prototype.appendGameStates = function () {
                this.$stateProvider
                    .state('game', {
                    url: "/game/{id}",
                    params: {},
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewBigPanel": { templateUrl: "partials/gameBoard.html" }
                    },
                    resolve: {}
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
                    }
                });
            };
            Router.Factory = function () {
                var configuration = function (configuration, $stateProvider, $urlRouterProvider) {
                    return new Router(configuration, $stateProvider, $urlRouterProvider);
                };
                configuration['$inject'] = this.$inject;
                return configuration;
            };
            return Router;
        }());
        Config.Router = Router;
    })(Config = Application.Config || (Application.Config = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Config;
    (function (Config) {
        'use strict';
        var Configuration = (function () {
            function Configuration() {
                this.authCallback = "/#/authCallback";
                this.baseUrl = "http://localhost:3000";
                this.apiUrl = "http://mahjongmayhem.herokuapp.com/";
            }
            Configuration.Factory = function () {
                return new Configuration();
            };
            return Configuration;
        }());
        Config.Configuration = Configuration;
    })(Config = Application.Config || (Application.Config = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    'use strict';
    var mahjongMadness = angular.module('mahjongMadness', ['ui.router', 'ngRoute']);
    console.log('TEST');
    mahjongMadness.factory('httpRequestInterceptor', function (UserService, configuration) {
        return {
            request: function (config) {
                console.log(config);
                if (UserService.username && UserService.token) {
                    config.headers["x-username"] = UserService.username;
                    config.headers["x-token"] = UserService.token;
                }
                return config;
            }
        };
    });
    mahjongMadness.config(function ($httpProvider) { $httpProvider.interceptors.push('httpRequestInterceptor'); });
    mahjongMadness.config(Application.Config.Router.Factory());
    mahjongMadness.constant('configuration', Application.Config.Configuration.Factory());
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