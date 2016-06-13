var Application;
(function (Application_1) {
    var Model;
    (function (Model_1) {
        var Application;
        (function (Application) {
            var Model;
            (function (Model) {
                var Game;
                (function (Game) {
                    var Player = (function () {
                        function Player() {
                        }
                        return Player;
                    }());
                    Game.Player = Player;
                    var Template = (function () {
                        function Template() {
                        }
                        return Template;
                    }());
                    Game.Template = Template;
                })(Game = Model.Game || (Model.Game = {}));
            })(Model = Application.Model || (Application.Model = {}));
        })(Application || (Application = {}));
        var Game = (function () {
            function Game(literal) {
                for (var _i = 0, _a = Object.keys(literal); _i < _a.length; _i++) {
                    var key = _a[_i];
                    this[key] = literal[key];
                }
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
            Game.prototype.getMatchedTilesByPlayer = function () {
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
        Model_1.Game = Game;
    })(Model = Application_1.Model || (Application_1.Model = {}));
})(Application || (Application = {}));
var Application;
(function (Application_2) {
    var Model;
    (function (Model_2) {
        var Application;
        (function (Application) {
            var Model;
            (function (Model) {
                var Tile;
                (function (Tile) {
                    var MatchAttempt = (function () {
                        function MatchAttempt() {
                        }
                        return MatchAttempt;
                    }());
                    Tile.MatchAttempt = MatchAttempt;
                })(Tile = Model.Tile || (Model.Tile = {}));
            })(Model = Application.Model || (Application.Model = {}));
        })(Application || (Application = {}));
        var Tile = (function () {
            function Tile(literal) {
                this.matchAttempt = {};
                for (var _i = 0, _a = Object.keys(literal); _i < _a.length; _i++) {
                    var key = _a[_i];
                    this[key] = literal[key];
                }
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
            Tile.prototype.canMatch = function (tile) {
                var self = this;
                return (self.tile.matchesWholeSuit
                    && self.tile.matchesWholeSuit === tile.tile.matchesWholeSuit
                    && self.tile.suit === tile.tile.suit)
                    ||
                        (!self.tile.matchesWholeSuit
                            && self.tile.matchesWholeSuit === tile.tile.matchesWholeSuit
                            && self.tile.suit === tile.tile.suit
                            && self.tile.name === tile.tile.name);
            };
            return Tile;
        }());
        Model_2.Tile = Tile;
    })(Model = Application_2.Model || (Application_2.Model = {}));
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
            function GameListController($scope, $state, UserService, GameListService, ApplicationService) {
                this.$scope = $scope;
                this.$state = $state;
                this.UserService = UserService;
                this.GameListService = GameListService;
                this.ApplicationService = ApplicationService;
                this.user = {
                    id: '1'
                };
                console.log('ctor gamelistctrl');
                this.$scope.newGame = {
                    template: ApplicationService.availableTemplates[0]._id,
                    minPlayers: 2,
                    maxPlayers: 4
                };
            }
            GameListController.prototype.canCreateGame = function (template, minPlayers, maxPlayers) {
                return (template != null || template != undefined)
                    && minPlayers <= maxPlayers;
            };
            GameListController.prototype.createGame = function (template, minPlayers, maxPlayers) {
                console.log(template, minPlayers, maxPlayers);
                this.GameListService.create(template, minPlayers, maxPlayers);
                this.$state.go('state', { id: 'somehting' });
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
            function GameController(UserService, GameListService, GameService, $stateParams, $scope) {
                this.UserService = UserService;
                this.GameListService = GameListService;
                this.GameService = GameService;
                this.$stateParams = $stateParams;
                this.$scope = $scope;
                this.test = "test";
                if ($stateParams.id === 0) {
                    $stateParams.id = '5541fc5b1872631100678bb4';
                }
                console.log(this.GameListService.currentGame);
                this.GameService.tiles(this.GameListService.currentGame.id);
            }
            GameController.prototype.currentGame = function () {
                return this.$scope.selected;
            };
            GameController.prototype.matchesExist = function () {
                var self = this;
            };
            GameController.prototype.logSelectedTiles = function () {
                for (var _i = 0, _a = this.GameService.currentTiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (tile.matchAttempt.isSelected) {
                        console.log(tile);
                    }
                }
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
                    'myGames': { title: 'My games', items: this.getItemsWithActive("myGames") }
                };
                console.log('nav ctor');
                var self = this;
                this.title = 'Error';
                this.menuitems = [];
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
        var ApplicationService = (function () {
            function ApplicationService($http, configuration) {
                this.$http = $http;
                this.configuration = configuration;
                this.availableTemplates = [];
                this.availableGamestates = [];
            }
            ApplicationService.prototype.templates = function () {
                var self = this;
                return self.request('GET', '/gametemplates/', function (result) {
                    self.availableTemplates = result.data;
                }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            ApplicationService.prototype.template = function (id) {
                var self = this;
                return self.request('GET', '/gametemplates/' + id, function (result) {
                    self.currentTemplate = result.data;
                }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            ApplicationService.prototype.states = function () {
                var self = this;
                return self.request('GET', '/gamestates', function (result) {
                    self.availableGamestates = result.data;
                }, function (error) {
                    console.error(error);
                    alert("Error, templates could not be retrieved");
                });
            };
            ApplicationService.prototype.request = function (method, url, onSuccess, onError) {
                var self = this;
                var promise = this.$http({
                    method: method,
                    url: self.configuration.apiUrl + url
                });
                promise.then(onSuccess, onError);
                return promise;
            };
            return ApplicationService;
        }());
        Service.ApplicationService = ApplicationService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Service;
    (function (Service) {
        'use strict';
        var GameListService = (function () {
            function GameListService($http, configuration, UserService) {
                this.$http = $http;
                this.configuration = configuration;
                this.UserService = UserService;
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
                this.createdGames = [];
            }
            GameListService.prototype.create = function (template, minPlayers, maxPlayers) {
                var self = this;
                return self.request('POST', '/games', function (result) {
                    self.createdGame = new Application.Model.Game(result.data);
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
            GameListService.prototype.readCreated = function () {
                var self = this;
                return self.request('GET', '/games?createdBy=' + self.UserService.user.name, function (result) {
                    self.createdGames = result.data;
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
                return self.request('GET', '/games/' + id + '/tiles', null, function (result) {
                    self.currentTiles = [];
                    for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                        var tileLiteral = _a[_i];
                        self.currentTiles.push(new Application.Model.Tile(tileLiteral));
                    }
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
                var self = this;
                var options = {
                    method: method,
                    url: self.configuration.apiUrl + url
                };
                if (data) {
                    options.data = data;
                }
                var promise = this.$http(options);
                promise.then(onSuccess, onError);
                return promise;
            };
            GameService.prototype.matchTile = function (tile) {
                var self = this;
                if (tile.matchAttempt.isSelected) {
                    console.log('unselecting');
                    tile.matchAttempt.isSelected = false;
                    return;
                }
                else {
                    tile.matchAttempt.isSelected = true;
                    var selected = this.getSelectedIndice();
                    if (selected.length == 2) {
                        var tile1 = self.currentTiles[selected[0]];
                        var tile2 = self.currentTiles[selected[1]];
                        if (tile1.canMatch(tile2)) {
                            console.log('match');
                            tile1.matchAttempt.isMatched = true;
                            tile2.matchAttempt.isMatched = true;
                            tile1.matchAttempt.isSelected = false;
                            tile2.matchAttempt.isSelected = false;
                            this.recheckBlockedTiles();
                            return;
                        }
                        console.log('no match');
                        console.log(tile1, tile2);
                        tile1.matchAttempt.isSelected = false;
                        tile2.matchAttempt.isSelected = false;
                        return;
                    }
                    console.log('misc');
                    tile.matchAttempt.isSelected = true;
                    return;
                }
            };
            GameService.prototype.recheckBlockedTiles = function () {
                for (var _i = 0, _a = this.currentTiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    var blocked = tile.matchAttempt.isBlocked;
                    tile.matchAttempt.isBlocked = tile.isTileBlockedBy(this.currentTiles);
                    if (blocked !== tile.matchAttempt.isBlocked) {
                        console.log('chagned');
                    }
                }
            };
            GameService.prototype.canAddMatch = function (tile) {
                return this.getSelectedIndice().length < 2;
            };
            GameService.prototype.getTile = function (id) {
                if (!this.currentTiles)
                    throw new Error('Game not initialized.');
                for (var _i = 0, _a = this.currentTiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (tile._id === id) {
                        return tile;
                    }
                }
            };
            GameService.prototype.getSelectedIndice = function () {
                var self = this, selected = [];
                for (var i = 0; i < self.currentTiles.length; i++) {
                    if (self.currentTiles[i].matchAttempt.isSelected) {
                        selected.push(i);
                    }
                }
                return selected;
            };
            GameService.prototype.isTileBlocked = function (tile) {
                return tile.isTileBlockedBy(this.currentTiles);
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
                this.user = {
                    name: 'fs.karsodimedjo@student.avans.nl',
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImZzLmthcnNvZGltZWRqb0BzdHVkZW50LmF2YW5zLm5sIg.htVG8dEuA4EM89b_HwwLUWh9qv_vPzO_fHRDEFna8qI'
                };
            }
            UserService.prototype.authenticationUrl = function () {
                var callback = encodeURIComponent(this.configuration.baseUrl + this.configuration.authCallback);
                return this.configuration.apiUrl + '/auth/avans?callbackUrl=' + callback;
            };
            UserService.prototype.setUser = function (username, token) {
                this.user.name = username;
                this.user.token = token;
            };
            UserService.prototype.isLoggedIn = function () {
                return this.user.name && this.user.token;
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
                    if (!(config.url.indexOf('partials') > -1)) {
                        console.log('request made: ' + config.url);
                    }
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
                this.template = '<div ng-click="click()" class="tile {{ datasource.tile.suit }}-{{ datasource.tile.name }} {{ getEffects() }}" style="left: {{ datasource.xPos * 25 + (datasource.zPos * 8) }}; top: {{ datasource.yPos * (349/480*50) - (datasource.zPos * 8) }}; z-index: {{ datasource.zPos }}"></div>';
                this.scope = {
                    datasource: '='
                };
            }
            TileDirective.prototype.controller = function ($scope, GameService) {
                var tile = GameService.getTile($scope.datasource._id);
                tile.matchAttempt.isMatched = false;
                tile.matchAttempt.isSelected = false;
                tile.matchAttempt.isBlocked = GameService.isTileBlocked(tile);
                $scope.getEffects = function () {
                    return tile.matchAttempt.isMatched
                        ? 'hidden'
                        : (tile.matchAttempt.isBlocked
                            ? 'blocked'
                            : (tile.matchAttempt.isSelected
                                ? 'selected'
                                : ''));
                };
                $scope.click = function () {
                    if (tile.matchAttempt.isBlocked)
                        return;
                    if (!tile.matchAttempt.isSelected && !GameService.canAddMatch(tile))
                        return;
                    GameService.matchTile(tile);
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
                    console.log(games, userId);
                    var filtered = [];
                    if (userId && games) {
                        for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
                            var game = games_1[_i];
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
                            controller: function ($scope, $state, UserService) {
                                UserService.setUser($state.params['username'], $state.params['token']);
                                $state.go('allGames');
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
                    },
                    data: {}
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
                        "viewSidePanel": {
                            templateUrl: "partials/gamelist-controls.html",
                            controller: 'gameListController',
                            controllerAs: 'gameList'
                        },
                        "viewMainPanel": {
                            templateUrl: "partials/gamelist.html",
                            controller: 'gameListController',
                            controllerAs: 'gameList'
                        }
                    },
                    resolve: {
                        templates: function (ApplicationService) {
                            return ApplicationService.templates();
                        },
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
                            templateUrl: "partials/gamelist-created.html",
                            controller: 'gameListController',
                            controllerAs: 'gameList'
                        }
                    },
                    resolve: {
                        templates: function (ApplicationService) {
                            return ApplicationService.templates();
                        },
                        createdGames: function (GameListService) {
                            return GameListService.readCreated();
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
    mahjongMadness.run(function ($rootScope, $state, UserService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.data && toState.data.authenticate && !UserService.isLoggedIn()) {
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });
    mahjongMadness.constant('configuration', Application.Constant.ConfigurationFactory);
    mahjongMadness.directive('tile', Application.Directive.TileDirectiveFactory);
    mahjongMadness.directive('user', Application.Directive.UserDirective.Factory());
    mahjongMadness.directive('gameitem', Application.Directive.GameItemDirective.Factory());
    mahjongMadness.filter('ownedGames', Application.Filter.OwnedGames.Factory());
    mahjongMadness.service('ApplicationService', Application.Service.ApplicationService);
    mahjongMadness.service('GameListService', Application.Service.GameListService);
    mahjongMadness.service('UserService', Application.Service.UserService);
    mahjongMadness.service('GameService', Application.Service.GameService);
    mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
    mahjongMadness.controller('gameController', Application.Controllers.GameController);
    mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map