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
            Game.prototype.matchTile = function (tile, tiles, onMatch) {
                var self = this;
                if (tile.matchAttempt.isSelected) {
                    console.log('unselecting');
                    tile.matchAttempt.isSelected = false;
                    return;
                }
                else {
                    tile.matchAttempt.isSelected = true;
                    var selected = this.getSelectedIndice(tiles);
                    if (selected.length == 2) {
                        var tile1 = tiles[selected[0]];
                        var tile2 = tiles[selected[1]];
                        if (tile1.canMatch(tile2)) {
                            console.log('match');
                            tile1.matchAttempt.isMatched = true;
                            tile2.matchAttempt.isMatched = true;
                            tile1.matchAttempt.isSelected = false;
                            tile2.matchAttempt.isSelected = false;
                            onMatch(tile1, tile2);
                            this.recheckBlockedTiles(tiles);
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
            Game.prototype.recheckBlockedTiles = function (tiles) {
                for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                    var tile = tiles_1[_i];
                    var blocked = tile.matchAttempt.isBlocked;
                    tile.matchAttempt.isBlocked = tile.isTileBlockedBy(tiles);
                    if (blocked !== tile.matchAttempt.isBlocked) {
                        console.log('chagned');
                    }
                }
            };
            Game.prototype.canAddMatch = function (tiles) {
                return this.getSelectedIndice(tiles).length < 2;
            };
            Game.prototype.getTile = function (id, tiles) {
                for (var _i = 0, tiles_2 = tiles; _i < tiles_2.length; _i++) {
                    var tile = tiles_2[_i];
                    if (tile._id === id) {
                        return tile;
                    }
                }
            };
            Game.prototype.getSelectedIndice = function (tiles) {
                var self = this, selected = [];
                for (var i = 0; i < tiles.length; i++) {
                    if (tiles[i].matchAttempt.isSelected) {
                        selected.push(i);
                    }
                }
                return selected;
            };
            Game.prototype.isTileBlocked = function (tile, tiles) {
                return tile.isTileBlockedBy(tiles);
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
                    && (self.zPos + 1 === tile.zPos)
                    && !tile.matchAttempt.isMatched);
            };
            Tile.prototype.isTileBlockedOnTheSideBy = function (tiles) {
                var self = this;
                var leftFound = false;
                var rightFound = false;
                for (var _i = 0, tiles_3 = tiles; _i < tiles_3.length; _i++) {
                    var tile = tiles_3[_i];
                    if (self.isTileBlockedOnTheLeftBy(tile)) {
                        leftFound = true;
                    }
                    if (self.isTileBlockedOnTheRightBy(tile)) {
                        rightFound = true;
                    }
                }
                return (rightFound && leftFound);
            };
            Tile.prototype.isTileBlockedOnTheLeftBy = function (tile) {
                var self = this;
                if (self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
                    return false;
                }
                return ((self.xPos + 2 === tile.xPos)
                    && (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
                    && (self.zPos === tile.zPos)
                    && !tile.matchAttempt.isMatched);
            };
            Tile.prototype.isTileBlockedOnTheRightBy = function (tile) {
                var self = this;
                if (self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
                    return false;
                }
                return ((self.xPos - 2 === tile.xPos)
                    && (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
                    && (self.zPos === tile.zPos)
                    && !tile.matchAttempt.isMatched);
            };
            Tile.prototype.isTileBlockedBy = function (tiles) {
                var self = this;
                for (var _i = 0, tiles_4 = tiles; _i < tiles_4.length; _i++) {
                    var tile = tiles_4[_i];
                    if (self.isTileBlockedOnTopBy(tile) || self.isTileBlockedOnTheSideBy(tiles)) {
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
        var AppController = (function () {
            function AppController(configuration) {
                this.configuration = configuration;
            }
            AppController.prototype.getMinPlayers = function () {
                return this.configuration.minPlayers;
            };
            AppController.prototype.getMaxPlayers = function () {
                return this.configuration.maxPlayers;
            };
            return AppController;
        }());
        Controllers.AppController = AppController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var GameListController = (function () {
            function GameListController($scope, $state, UserService, GameListService, GameService, ApplicationService) {
                this.$scope = $scope;
                this.$state = $state;
                this.UserService = UserService;
                this.GameListService = GameListService;
                this.GameService = GameService;
                this.ApplicationService = ApplicationService;
                this.user = {
                    id: '1'
                };
                this.$scope.newGame = {
                    template: ApplicationService.availableTemplates[0]._id,
                    minPlayers: 2,
                    maxPlayers: 4
                };
            }
            GameListController.prototype.canJoinGame = function (game) {
                return true;
            };
            GameListController.prototype.joinGame = function (game) {
                this.GameService.join(game._id, function () {
                    alert('Joined');
                }, function (error) {
                    alert('error');
                });
            };
            GameListController.prototype.canCreateGame = function (template, minPlayers, maxPlayers) {
                return (template != null || template != undefined)
                    && minPlayers <= maxPlayers;
            };
            GameListController.prototype.createGame = function (template, minPlayers, maxPlayers) {
                var _this = this;
                this.GameListService.create(template, minPlayers, maxPlayers, function (data) {
                    _this.$state.go('view', { id: data._id });
                }, function (error) {
                    alert(error);
                });
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
            function GameController(UserService, GameListService, GameService, $state, $stateParams, $scope) {
                this.UserService = UserService;
                this.GameListService = GameListService;
                this.GameService = GameService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$scope = $scope;
                this.test = "test";
                this.GameService.tiles(this.GameListService.currentGame.id);
            }
            GameController.prototype.currentGame = function () {
                return this.GameListService.currentGame;
            };
            GameController.prototype.canStartGame = function () {
                return true;
            };
            GameController.prototype.startGame = function (game) {
                var _this = this;
                this.GameService.start(game._id, function (id) {
                    _this.$state.go('game', { id: id });
                }, function (error) {
                    alert('error @GameController.startGame');
                    console.error(error);
                });
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
                    'game': { title: 'Game X', items: this.getItemsWithActive("game") },
                    'allGames': { title: 'All games', items: this.getItemsWithActive("allGames") },
                    'myGames': { title: 'My games', items: this.getItemsWithActive("myGames") }
                };
                this.subDictionary = {
                    'game': { title: 'Game X', items: this.getItemsWithActive(null) }
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
                if (!active)
                    return items;
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
            ApplicationService.prototype.templates = function (onSuccess, onError) {
                var self = this;
                return self.request('GET', '/gametemplates/', function (result) {
                    onSuccess(result.data);
                }, onError);
            };
            ApplicationService.prototype.template = function (id, onSuccess, onError) {
                var self = this;
                return self.request('GET', '/gametemplates/' + id, function (result) {
                    onSuccess(result.data);
                }, onError);
            };
            ApplicationService.prototype.states = function (onSuccess, onError) {
                var self = this;
                return self.request('GET', '/gamestates', function (result) {
                    onSuccess(result.data);
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
        var StorageService = (function () {
            function StorageService() {
                this.storage = localStorage;
            }
            StorageService.prototype.store = function (key, value) {
                return this.storage.setItem(key, JSON.stringify(value));
            };
            StorageService.prototype.retrieve = function (key) {
                var item = this.storage.getItem(key);
                if (!!item) {
                    return JSON.parse(item);
                }
                throw new Error('item does not exist');
            };
            StorageService.prototype.remove = function (key) {
                return this.storage.removeItem(key);
            };
            return StorageService;
        }());
        Service.StorageService = StorageService;
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
            }
            GameListService.prototype.create = function (template, minPlayers, maxPlayers, onSuccess, onError) {
                var self = this;
                return self.request('POST', '/games', {
                    templateName: template,
                    minPlayers: minPlayers,
                    maxPlayers: maxPlayers
                }, function (result) {
                    onSuccess(new Application.Model.Game(result.data));
                }, onError);
            };
            GameListService.prototype.readAll = function (onSuccess, onError) {
                var self = this;
                return self.request('GET', '/games', null, function (result) {
                    var games = [];
                    for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                        var game = _a[_i];
                        games.push(new Application.Model.Game(game));
                    }
                    onSuccess(games);
                }, onError);
            };
            GameListService.prototype.readCreated = function (onSuccess, onError) {
                var self = this;
                return self.request('GET', '/games?createdBy=' + self.UserService.user.name, null, function (result) {
                    var games = [];
                    for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                        var game = _a[_i];
                        games.push(new Application.Model.Game(game));
                    }
                    onSuccess(games);
                }, onError);
            };
            GameListService.prototype.delete = function (id, onSuccess, onError) {
                var self = this;
                return self.request('DELETE', '/games/' + id, null, function (result) {
                    onSuccess(id);
                }, onError);
            };
            GameListService.prototype.request = function (method, url, data, onSuccess, onError) {
                var self = this;
                var promise = this.$http({
                    method: method,
                    url: self.configuration.apiUrl + url,
                    data: data || {}
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
            GameService.prototype.read = function (id, onSuccess, onError) {
                var self = this;
                return self.request('GET', '/games/' + id, null, function (result) {
                    onSuccess(new Application.Model.Game(result.data));
                }, onError);
            };
            GameService.prototype.start = function (id, onSuccess, onError) {
                var self = this;
                return self.request('POST', '/games/' + id + '/start', null, function (result) {
                    onSuccess(id);
                }, onError);
            };
            GameService.prototype.join = function (id, onSuccess, onError) {
                var self = this;
                return self.request('POST', '/games/' + id + '/players', null, onSuccess, onError);
            };
            GameService.prototype.tiles = function (id, onSuccess, onError) {
                var self = this;
                return self.request('GET', '/games/' + id + '/tiles', null, function (result) {
                    var tiles = [];
                    for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                        var tileLiteral = _a[_i];
                        tiles.push(new Application.Model.Tile(tileLiteral));
                    }
                    onSuccess(tiles);
                }, onError);
            };
            GameService.prototype.match = function (id, tile1Id, tile2Id, onSuccess, onError) {
                var self = this;
                return self.request('POST', '/games/' + id + '/tiles/matches', { tile1Id: tile1Id, tile2Id: tile2Id }, function (result) {
                    onSuccess();
                }, onError);
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
        var AuthService = (function () {
            function AuthService(configuration) {
                this.configuration = configuration;
                this.user = {
                    name: 'fs.karsodimedjo@student.avans.nl',
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImZzLmthcnNvZGltZWRqb0BzdHVkZW50LmF2YW5zLm5sIg.htVG8dEuA4EM89b_HwwLUWh9qv_vPzO_fHRDEFna8qI'
                };
            }
            AuthService.prototype.authenticationUrl = function () {
                var callback = encodeURIComponent(this.configuration.baseUrl + this.configuration.authCallback);
                return this.configuration.apiUrl + '/auth/avans?callbackUrl=' + callback;
            };
            AuthService.prototype.setUser = function (username, token) {
                this.user.name = username;
                this.user.token = token;
            };
            AuthService.prototype.isLoggedIn = function () {
                return this.user.name && this.user.token;
            };
            return AuthService;
        }());
        Service.AuthService = AuthService;
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
                        config.headers["x-username"] = UserService.user.name;
                        config.headers["x-token"] = UserService.user.token;
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
                        "viewMainPanel": {
                            templateUrl: "partials/index.html",
                            controller: function () {
                                var socket = io('http://mahjongmayhem.herokuapp.com?gameId=575e8feab62cb21100dc6275');
                                socket.on('start', function () {
                                    console.log('game started');
                                }).on('end', function () {
                                    console.log('game ended');
                                }).on('playerJoined', function (player) {
                                    console.log('player joined');
                                    console.log(player);
                                }).on('match', function (matchedTiles) {
                                    console.log('match made');
                                    console.log(matchedTiles);
                                });
                            }
                        }
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
                        "viewSidePanel": {
                            templateUrl: "partials/game.html",
                            controller: function (GameService, GameListService) {
                                GameService.currentGame = GameListService.currentGame;
                                this.GameService = GameService;
                            },
                            controllerAs: 'gameCtrl'
                        },
                        "viewMainPanel": {
                            templateUrl: 'partials/game-board.html',
                            controller: 'gameController',
                            controllerAs: 'gameCtrl'
                        }
                    },
                    resolve: {
                        game: function (GameListService, $stateParams) {
                            return GameListService.read($stateParams.id);
                        }
                    },
                    data: {}
                })
                    .state('board', {
                    url: "/game/{id}/board",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/game.html" },
                        "viewMainPanel": { templateUrl: "partials/game-board.html" }
                    },
                    resolve: {
                        game: function (GameListService, $stateParams) {
                            return GameListService.read($stateParams.id);
                        }
                    },
                })
                    .state('matched', {
                    url: "/game/{id}/matched",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewBigPanel": { templateUrl: "partials/matched.html" }
                    },
                    resolve: {
                        game: function (GameListService, $stateParams) {
                            return GameListService.read($stateParams.id);
                        }
                    }
                })
                    .state('view', {
                    url: "/game/{id}/view",
                    views: {
                        "viewSidePanel": { templateUrl: "partials/empty.html" },
                        "viewBigPanel": { templateUrl: "partials/empty.html" }
                    },
                    resolve: {
                        game: function (GameListService, $stateParams) {
                            return GameListService.read($stateParams.id);
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
                this.minPlayers = 1;
                this.maxPlayers = 32;
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
    mahjongMadness.run(function ($rootScope, $state, AuthService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.data && toState.data.reqAuth && !AuthService.isLoggedIn()) {
                alert('u\'r nut uthuntucutud, u\'ll bu ruduructud tu lugun.');
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
    mahjongMadness.service('StorageService', Application.Service.StorageService);
    mahjongMadness.service('GameListService', Application.Service.GameListService);
    mahjongMadness.service('AuthService', Application.Service.AuthService);
    mahjongMadness.service('GameService', Application.Service.GameService);
    mahjongMadness.controller('appController', Application.Controllers.AppController);
    mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
    mahjongMadness.controller('gameController', Application.Controllers.GameController);
    mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map