var Application;
(function (Application) {
    var Models;
    (function (Models) {
        var Game = (function () {
            function Game() {
            }
            return Game;
        }());
        Models.Game = Game;
    })(Models = Application.Models || (Application.Models = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Models;
    (function (Models) {
        var Tile = (function () {
            function Tile(tileData) {
                if (!tileData)
                    throw new Error('no tileData');
                this.id = tileData._id;
                this.x = tileData.x;
                this.y = tileData.y;
                this.z = tileData.z;
                this.name = tileData.tile.name;
                this.suit = tileData.tile.suit;
                this.matchesWholeSuit = tileData.tile.matchesWholeSuit;
            }
            Tile.prototype.isOnTop = function (tile) {
                var self = this;
                if ((self.x - 1 === tile.x || self.x === tile.x || self.x + 1 === tile.x)
                    && (self.y - 1 === tile.y || self.y === tile.y || self.y + 1 === tile.y)) {
                    return true;
                }
                return false;
            };
            Tile.prototype.isLeftOrRight = function (tile) {
                var self = this;
                if ((self.x - 2 === tile.x || self.x + 2 === tile.x)
                    && (self.y - 1 === tile.y || self.y === tile.y || self.y + 1 === tile.y)) {
                    return true;
                }
                return false;
            };
            Tile.prototype.canMatch = function (tiles) {
                for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                    var tile = tiles_1[_i];
                    if (!this.isOnTop(tile) && this.isLeftOrRight(tile)) {
                    }
                }
                return null;
            };
            return Tile;
        }());
        Models.Tile = Tile;
    })(Models = Application.Models || (Application.Models = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Models;
    (function (Models) {
        var User = (function () {
            function User() {
            }
            return User;
        }());
        Models.User = User;
    })(Models = Application.Models || (Application.Models = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var GameListController = (function () {
            function GameListController(UserService, GameListService, $scope) {
                this.UserService = UserService;
                this.GameListService = GameListService;
                this.$scope = $scope;
                this.games = [
                    { game: "name" }
                ];
                this.test = "test";
            }
            GameListController.prototype.myGames = function () {
            };
            GameListController.prototype.openGame = function (game) {
                this.$scope.selected = game;
            };
            GameListController.prototype.newGame = function (_title) {
                var self = this;
            };
            GameListController.prototype.saveGame = function () {
                var self = this;
                self.games.push(self.game);
                self.game = null;
            };
            GameListController.prototype.joinGame = function (game) {
                var self = this;
                if (game.players.length != 4) {
                    game.players.push(self.user);
                }
            };
            GameListController.prototype.canJoinGame = function (game) {
                var self = this;
                if (game.players.length == 4) {
                    return false;
                }
                for (var i = 0; i < game.players.length; i++) {
                    if (game.players[i] == self.user) {
                        return false;
                    }
                }
                return true;
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
                    console.log(data);
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
    var Services;
    (function (Services) {
        'use strict';
        var GameListService = (function () {
            function GameListService($timeout) {
                this.$timeout = $timeout;
                this.games = [
                    { id: 2, title: "Mario", players: ["a", "b", "c", "d"] },
                    { id: 3, title: "Rayman", players: ["henk", "heenk"] }
                ];
            }
            GameListService.prototype.create = function (template, minPlayers, maxPlayers) {
                throw new Error('NotImplementedError');
            };
            GameListService.prototype.readAll = function (onSuccess, onError) {
                throw new Error('NotImplementedError');
            };
            GameListService.prototype.read = function (id) {
                throw new Error('NotImplementedError');
            };
            GameListService.prototype.delete = function (id) {
                throw new Error('NotImplementedError');
            };
            GameListService.prototype.GET = function (id, callBack) {
                var self = this;
                self.$timeout(function () {
                    if (_.isFunction(id)) {
                        callBack = id;
                        return callBack(self.games);
                    }
                    else {
                        var result = _.findWhere(self.games, { id: id });
                        return callBack(result);
                    }
                }, 1000);
            };
            GameListService.prototype.PUT = function (game) {
                throw new Error('NotImplementedError');
            };
            GameListService.prototype.POST = function (game) {
                var self = this;
                var ids = [];
                for (var i = 0; i < self.games.length; i++) {
                    ids.push(self.games[i].id);
                }
                var largest = Math.max.apply(Math, ids);
                var newID = largest + 1;
                game.id = newID;
                self.games.push(game);
            };
            GameListService.prototype.DELETE = function (game) {
                throw new Error('NotImplementedError');
            };
            return GameListService;
        }());
        Services.GameListService = GameListService;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var GameService = (function () {
            function GameService() {
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
        Services.GameService = GameService;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        'use strict';
        var UserService = (function () {
            function UserService(configuration) {
                this.configuration = configuration;
                this.user = { name: 'Marthijn' };
            }
            UserService.prototype.authenticationUrl = function () {
                var callback = encodeURIComponent(this.configuration.authCallback);
                return 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=' + callback;
            };
            return UserService;
        }());
        Services.UserService = UserService;
    })(Services = Application.Services || (Application.Services = {}));
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
            OwnedGames.prototype.filter = function (data) {
                console.log(data);
                return {
                    data: data,
                    bop: 'dota'
                };
            };
            OwnedGames.prototype.Factory = function () {
                var filter = this.filter;
                filter['$inject'] = this.$inject;
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
                        "viewMainPanel": { templateUrl: "partials/login.html" }
                    }
                })
                    .state('authentication', {
                    url: this.configuration.authCallback,
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewMainPanel": { templateUrl: "partials/index.html" }
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
                        "viewMainPanel": { templateUrl: "partials/gameList.html" }
                    },
                    controller: 'gameListController as gameList',
                })
                    .state('allGames.myGames', {
                    url: "/me",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/user.html" },
                        "viewMainPanel": { templateUrl: "partials/myGames.html" }
                    },
                    controllerAs: "gameListController as gameList"
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
    var mahjongMadness = angular.module('mahjongMadness', ['ui.router']);
    console.log('TEST');
    mahjongMadness.config(Application.Config.Router.Factory());
    mahjongMadness.constant('configuration', Application.Config.Configuration.Factory());
    mahjongMadness.directive('user', Application.Directive.UserDirective.Factory());
    mahjongMadness.directive('gameitem', Application.Directive.GameItemDirective.Factory());
    mahjongMadness.filter('ownedGames', Application.Filter.OwnedGames);
    mahjongMadness.service('GameListService', Application.Services.GameListService);
    mahjongMadness.service('UserService', Application.Services.UserService);
    mahjongMadness.service('GameService', Application.Services.GameService);
    mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
    mahjongMadness.controller('gameController', Application.Controllers.GameController);
    mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map