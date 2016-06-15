var Application;
(function (Application_1) {
    var Model;
    (function (Model_1) {
        var Application;
        (function (Application) {
            var Model;
            (function (Model) {
                var Tile;
                (function (Tile) {
                    var MatchAttempt = (function () {
                        function MatchAttempt() {
                            this.isMatched = false;
                            this.isBlocked = false;
                            this.isSelected = false;
                        }
                        return MatchAttempt;
                    }());
                    Tile.MatchAttempt = MatchAttempt;
                })(Tile = Model.Tile || (Model.Tile = {}));
            })(Model = Application.Model || (Application.Model = {}));
        })(Application || (Application = {}));
        var Tile = (function () {
            function Tile(literal) {
                for (var _i = 0, _a = Object.keys(literal); _i < _a.length; _i++) {
                    var key = _a[_i];
                    this[key] = literal[key];
                }
                this.matchAttempt = {};
                this.matchAttempt.isMatched = (!!this.match && !!this.match.foundBy);
                this.matchAttempt.isSelected = false;
                this.matchAttempt.isBlocked = false;
            }
            Tile.prototype.canAttemptMatch = function () {
                return !this.matchAttempt.isBlocked;
            };
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
                for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                    var tile = tiles_1[_i];
                    if (self.isTileBlockedOnTheLeftBy(tile)) {
                        leftFound = true;
                    }
                    if (self.isTileBlockedOnTheRightBy(tile)) {
                        rightFound = true;
                    }
                }
                return (rightFound && leftFound);
            };
            Tile.prototype.isTileBlockedOnTheRightBy = function (tile) {
                var self = this;
                if (self.xPos === tile.xPos && self.yPos === tile.yPos && self.zPos === tile.zPos) {
                    return false;
                }
                return ((self.xPos + 2 === tile.xPos)
                    && (self.yPos - 1 === tile.yPos || self.yPos === tile.yPos || self.yPos + 1 === tile.yPos)
                    && (self.zPos === tile.zPos)
                    && !tile.matchAttempt.isMatched);
            };
            Tile.prototype.isTileBlockedOnTheLeftBy = function (tile) {
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
                for (var _i = 0, tiles_2 = tiles; _i < tiles_2.length; _i++) {
                    var tile = tiles_2[_i];
                    if (self.isTileBlockedOnTopBy(tile) || self.isTileBlockedOnTheSideBy(tiles)) {
                        return self.matchAttempt.isBlocked = true;
                    }
                }
                return self.matchAttempt.isBlocked = false;
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
        Model_1.Tile = Tile;
    })(Model = Application_1.Model || (Application_1.Model = {}));
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
    var Model;
    (function (Model) {
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
                for (var _b = 0, _c = this.tiles; _b < _c.length; _b++) {
                    var tile = _c[_b];
                    if (!!tile.match && !!tile.match.foundBy) {
                        matchedList[tile.match.foundBy].push(tile);
                    }
                }
                return matchedList;
            };
            Game.prototype.setTiles = function (tiles) {
                this.tiles = tiles;
                this.resetBlockedTiles();
            };
            Game.prototype.canJoin = function (user) {
                var self = this;
                return self.state === 'open'
                    && self.players.length < self.maxPlayers
                    && (function () {
                        for (var _i = 0, _a = self.players; _i < _a.length; _i++) {
                            var player = _a[_i];
                            if (player._id == user.name) {
                                return false;
                            }
                        }
                        return true;
                    })();
            };
            Game.prototype.canStart = function (user) {
                var self = this;
                return self.state === 'open'
                    && self.createdBy._id === user.name
                    && self.players.length >= self.minPlayers;
            };
            Game.prototype.addMatchedTile = function (tile1, tile2) {
                var self = this;
                for (var i = 0; i < self.tiles.length; i++) {
                    if (self.tiles[i]._id === tile1._id) {
                        self.tiles[i].match = tile1.match;
                        self.tiles[i].matchAttempt.isMatched = true;
                        continue;
                    }
                    if (self.tiles[i]._id === tile2._id) {
                        self.tiles[i].match = tile2.match;
                        self.tiles[i].matchAttempt.isMatched = true;
                    }
                }
                self.resetBlockedTiles();
            };
            Game.prototype.matchTile = function (tile, onMatch) {
                var self = this;
                if (tile.matchAttempt.isSelected) {
                    tile.matchAttempt.isSelected = false;
                    return;
                }
                else {
                    tile.matchAttempt.isSelected = true;
                    var selected = self.getSelectedIndice();
                    if (selected.length == 2) {
                        var tile1 = self.tiles[selected[0]];
                        var tile2 = self.tiles[selected[1]];
                        if (tile1.canMatch(tile2)) {
                            onMatch(tile1, tile2);
                            self.resetBlockedTiles();
                            return;
                        }
                        tile1.matchAttempt.isSelected = false;
                        tile2.matchAttempt.isSelected = false;
                        return;
                    }
                    tile.matchAttempt.isSelected = true;
                    return;
                }
            };
            Game.prototype.resetBlockedTiles = function () {
                var self = this;
                for (var _i = 0, _a = self.tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    tile.isTileBlockedBy(self.tiles);
                }
            };
            Game.prototype.canAttemptMatch = function (user) {
                var self = this;
                return self.getSelectedIndice().length < 2
                    && self.state === 'playing'
                    && (function () {
                        for (var _i = 0, _a = self.players; _i < _a.length; _i++) {
                            var player = _a[_i];
                            if (player._id == user.name) {
                                return true;
                            }
                        }
                        return false;
                    })();
            };
            Game.prototype.getTile = function (id) {
                for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (tile._id === id) {
                        return tile;
                    }
                }
            };
            Game.prototype.getSelectedIndice = function () {
                var self = this, selected = [];
                for (var i = 0; i < self.tiles.length; i++) {
                    if (self.tiles[i].matchAttempt.isSelected) {
                        selected.push(i);
                    }
                }
                return selected;
            };
            Game.prototype.isTileBlocked = function (tile) {
                return tile.isTileBlockedBy(this.tiles);
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
var Application;
(function (Application) {
    var Controller;
    (function (Controller) {
        var AppController = (function () {
            function AppController(configuration, AuthService) {
                this.configuration = configuration;
                this.AuthService = AuthService;
            }
            AppController.prototype.authUrl = function () {
                return this.AuthService.authenticationUrl();
            };
            ;
            AppController.prototype.isLoggedIn = function () {
                return this.AuthService.isLoggedIn();
            };
            AppController.prototype.getMinPlayers = function () {
                return this.configuration.minPlayers;
            };
            AppController.prototype.getMaxPlayers = function () {
                return this.configuration.maxPlayers;
            };
            return AppController;
        }());
        Controller.AppController = AppController;
    })(Controller = Application.Controller || (Application.Controller = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var NavigationController = (function () {
            function NavigationController($state, $scope, AuthService) {
                this.$state = $state;
                this.$scope = $scope;
                this.AuthService = AuthService;
                this.navigationDictionary = {
                    'index': { title: 'Index', items: this.getItemsWithActive("index") },
                    'games.all': { title: 'Overzicht', items: this.getItemsWithActive("games.all") },
                    'games.me': { title: 'Eigen spellen', items: this.getItemsWithActive("games.me") },
                    'settings': { title: 'Instellingen', items: this.getItemsWithActive("settings") },
                    'game.board': { title: 'Spel', items: this.getItemsWithActive(null) },
                    'game.history': { title: 'Spel', items: this.getItemsWithActive(null) },
                    'login': { title: 'Login', items: this.getItemsWithActive(null) },
                    'logout': { title: 'Logout', items: this.getItemsWithActive(null) }
                };
                var self = this;
                this.title = 'Geen titel beschikbaar';
                this.menuitems = [];
                $scope.currState = $state;
                $scope.$watch('currState.current.name', function (newValue, oldValue) {
                    if (newValue !== undefined && !!newValue) {
                        var nav = self.navigationDictionary[newValue];
                        if (!!nav) {
                            self.title = nav.title || 'Geen titel beschikbaar';
                            self.menuitems = nav.items || [];
                        }
                    }
                });
            }
            NavigationController.prototype.isLoggedIn = function () {
                return this.AuthService.isLoggedIn();
            };
            NavigationController.prototype.getItemsWithActive = function (active) {
                var items = [
                    { label: 'Index', state: 'index' },
                    { label: 'Overzicht', state: 'games.all' },
                    { label: 'Eigen spellen', state: 'games.me' },
                    { label: 'Instellingen', state: 'settings' }
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
    var Controller;
    (function (Controller) {
        'use strict';
        var GamesController = (function () {
            function GamesController(games, title, fromCreatedBy, $scope, $state, AuthService, GameService, GameListService, ParameterReaderService) {
                this.title = title;
                this.fromCreatedBy = fromCreatedBy;
                this.$scope = $scope;
                this.$state = $state;
                this.AuthService = AuthService;
                this.GameService = GameService;
                this.GameListService = GameListService;
                this.ParameterReaderService = ParameterReaderService;
                this.filter = {};
                this.states = ['playing', 'finished', 'open'];
                this.setGames(games);
                this.filter['pageIndex'] = 0;
            }
            GamesController.prototype.RetrieveGames = function () {
                var self = this;
                var params = this.ParameterReaderService.getParams(self.filter);
                if (self.fromCreatedBy) {
                    params.push({ name: "createdBy", value: self.AuthService.user.name });
                }
                return this.GameListService.readAll(params, function (games) {
                    self.games = games;
                }, function (error) {
                    alert('De lijst van spellen kon niet worden opgehaald, probeer het zo opnieuw.');
                    throw error;
                });
            };
            GamesController.prototype.getGame = function (id) {
                for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
                    var game = _a[_i];
                    if (game.id == id) {
                        return game;
                    }
                }
                return null;
            };
            GamesController.prototype.setGames = function (games) {
                var gameObjects = [];
                for (var _i = 0, _a = games.data; _i < _a.length; _i++) {
                    var game = _a[_i];
                    gameObjects.push(new Application.Model.Game(game));
                }
                this.games = gameObjects;
            };
            GamesController.prototype.canOpenGame = function (game) {
                return game.state !== 'open';
            };
            GamesController.prototype.canSeeHistory = function (game) {
                return game.state === 'playing'
                    || game.state === 'finished';
            };
            GamesController.prototype.canJoinGame = function (game) {
                var self = this;
                return game.canJoin(self.AuthService.user);
            };
            ;
            GamesController.prototype.joinGame = function (game) {
                var self = this;
                self.GameService.join(game._id, function (id) {
                    game.players.push({ _id: self.AuthService.user.name, name: self.AuthService.user.name });
                }, function (error) {
                    alert('De game kon niet aangemaakt worden, probeer het later opnieuw.');
                    console.error(error);
                });
            };
            ;
            GamesController.prototype.canStartGame = function (game) {
                var self = this;
                var startable = game.canStart(self.AuthService.user);
                return startable;
            };
            GamesController.prototype.startGame = function (game) {
                var self = this;
                self.GameService.start(game._id, function (id) {
                    self.$state.go('game.board', { id: id });
                }, function (error) {
                    alert('De game kon niet gestart worden, probeer het later opnieuw.');
                    console.error(error);
                });
            };
            GamesController.prototype.canPrevious = function () {
                return this.filter['pageIndex'] - 1 >= 0;
            };
            GamesController.prototype.toPrevious = function () {
                this.filter['pageIndex']--;
                console.log(this.filter);
                this.RetrieveGames();
            };
            GamesController.prototype.canNext = function () {
                return this.games.length > 0;
            };
            GamesController.prototype.toNext = function () {
                this.filter['pageIndex']++;
                console.log(this.filter);
                this.RetrieveGames();
            };
            return GamesController;
        }());
        Controller.GamesController = GamesController;
    })(Controller = Application.Controller || (Application.Controller = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controller;
    (function (Controller) {
        'use strict';
        var GameCreateController = (function () {
            function GameCreateController(templates, $state, configuration, GameListService) {
                this.$state = $state;
                this.configuration = configuration;
                this.GameListService = GameListService;
                this.newGame = {
                    template: templates.data[0]._id,
                    minPlayers: 1,
                    maxPlayers: 2
                };
                this.templates = templates.data;
                this.minPlayers = configuration.minPlayers;
                this.maxPlayers = configuration.maxPlayers;
            }
            GameCreateController.prototype.canCreateGame = function () {
                return this.newGame.template != null
                    && this.newGame.minPlayers <= this.newGame.maxPlayers;
            };
            GameCreateController.prototype.createGame = function () {
                var self = this;
                console.log(this.newGame.template);
                self.GameListService.create(this.newGame.template, this.newGame.minPlayers, this.newGame.maxPlayers, function (game) {
                    self.$state.go(self.$state.current, {}, { reload: true });
                }, function (error) {
                    alert('De game kon niet aangemaakt worden, probeer het later opnieuw.');
                    console.error(error);
                });
            };
            return GameCreateController;
        }());
        Controller.GameCreateController = GameCreateController;
    })(Controller = Application.Controller || (Application.Controller = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controller;
    (function (Controller) {
        'use strict';
        var GameHistoryController = (function () {
            function GameHistoryController(game, tiles, $filter) {
                this.$filter = $filter;
                var self = this;
                this.currentGame = new Application.Model.Game(game.data);
                var tileObjects = [];
                for (var _i = 0, _a = tiles.data; _i < _a.length; _i++) {
                    var tileLiteral = _a[_i];
                    tileObjects.push(new Application.Model.Tile(tileLiteral));
                }
                this.currentGame.setTiles(tileObjects);
            }
            GameHistoryController.prototype.onEven = function (i) {
                return i % 2 == 0
                    ? ''
                    : 'margin-right: 20px;';
            };
            return GameHistoryController;
        }());
        Controller.GameHistoryController = GameHistoryController;
    })(Controller = Application.Controller || (Application.Controller = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controller;
    (function (Controller) {
        'use strict';
        var GameBoardController = (function () {
            function GameBoardController($scope, game, tiles, $stateParams, SocketService) {
                this.$stateParams = $stateParams;
                this.SocketService = SocketService;
                var self = this;
                this.currentGame = new Application.Model.Game(game.data);
                var tileObjects = [];
                for (var _i = 0, _a = tiles.data; _i < _a.length; _i++) {
                    var tileLiteral = _a[_i];
                    tileObjects.push(new Application.Model.Tile(tileLiteral));
                }
                this.currentGame.setTiles(tileObjects);
                SocketService.connect([self.$stateParams['id']]);
                SocketService.onStart(function () {
                    alert('Game started.');
                    self.currentGame.state = "playing";
                });
                SocketService.onEnd(function () {
                    alert('Game ended.');
                    self.currentGame.state = "finished";
                });
                SocketService.onJoined(function (id, player) {
                    alert('A new competitor appeared.');
                    self.currentGame.players.push(player);
                });
                SocketService.onMatch(function (id, matchedTiles) {
                    self.currentGame.addMatchedTile(matchedTiles[0], matchedTiles[1]);
                });
            }
            GameBoardController.prototype.getCurrentGame = function () {
                return this.currentGame;
            };
            return GameBoardController;
        }());
        Controller.GameBoardController = GameBoardController;
    })(Controller = Application.Controller || (Application.Controller = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controller;
    (function (Controller) {
        'use strict';
        var GameController = (function () {
            function GameController(game, $stateParams) {
                this.$stateParams = $stateParams;
                this.currentGame = new Application.Model.Game(game.data);
            }
            GameController.prototype.canOpenGame = function () {
                return this.currentGame.state !== 'open';
            };
            GameController.prototype.canSeeHistory = function () {
                return this.currentGame.state === 'playing'
                    || this.currentGame.state === 'finished';
            };
            return GameController;
        }());
        Controller.GameController = GameController;
    })(Controller = Application.Controller || (Application.Controller = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var StyleController = (function () {
            function StyleController($state, $scope, StorageService) {
                this.$state = $state;
                this.$scope = $scope;
                this.StorageService = StorageService;
                this.availableStyles = [
                    { key: "app.css", name: "App", url: "css/app.css" },
                    { key: "alt.css", name: "Alt", url: "css/alt.css" }
                ];
                this.currentStyle = {};
                this.getCurrentStyle();
                this.selectedStyle = this.currentStyle.key;
            }
            StyleController.prototype.getCurrentStyle = function () {
                var style;
                if (style = this.StorageService.retrieve("style")) {
                    this.currentStyle = style;
                }
                else {
                    this.StorageService.store("style", this.availableStyles[0]);
                }
            };
            StyleController.prototype.getAvailableStyles = function () {
                return this.availableStyles;
            };
            StyleController.prototype.setCurrentStyle = function () {
                for (var i = 0; i < this.availableStyles.length; i++) {
                    if (this.availableStyles[i].key == this.selectedStyle) {
                        this.StorageService.store("style", this.availableStyles[i]);
                        this.currentStyle = this.availableStyles[i];
                    }
                }
            };
            return StyleController;
        }());
        Controllers.StyleController = StyleController;
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
                var fallback = function () { };
                onSuccess = onSuccess || fallback;
                onError = onError || fallback;
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
                }, onError);
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
                var item = this.storage.getItem(key);
                if (!!item) {
                    this.storage.removeItem(key);
                }
                return this.storage.setItem(key, JSON.stringify(value));
            };
            StorageService.prototype.retrieve = function (key) {
                var item = this.storage.getItem(key);
                if (!!item) {
                    return JSON.parse(item);
                }
                return null;
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
            function GameListService($http, configuration, AuthService) {
                this.$http = $http;
                this.configuration = configuration;
                this.AuthService = AuthService;
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
            GameListService.prototype.readAll = function (args, onSuccess, onError) {
                var fallback = function () { };
                onSuccess = onSuccess || fallback;
                onError = onError || fallback;
                var argumentString = "";
                if (args != null) {
                    for (var i = 0; i < args.length; i++) {
                        if (i != 0) {
                            argumentString += "&";
                        }
                        else {
                            argumentString += "?";
                        }
                        argumentString += args[i].name;
                        argumentString += "=";
                        argumentString += args[i].value;
                    }
                }
                var self = this;
                return self.request('GET', '/games' + argumentString, null, function (result) {
                    var games = [];
                    for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                        var game = _a[_i];
                        games.push(new Application.Model.Game(game));
                    }
                    onSuccess(games);
                }, onError);
            };
            GameListService.prototype.readCreated = function (onSuccess, onError) {
                var fallback = function () { };
                onSuccess = onSuccess || fallback;
                onError = onError || fallback;
                var self = this;
                return self.request('GET', '/games?createdBy=' + self.AuthService.user.name, null, function (result) {
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
                var fallback = function () { };
                onError = onError || fallback;
                onSuccess = onSuccess || fallback;
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
                return self.request('POST', '/games/' + id + '/players', null, function (result) {
                    onSuccess(id);
                }, onError);
            };
            GameService.prototype.tiles = function (id, onSuccess, onError) {
                var fallback = function () { };
                onSuccess = onSuccess || fallback;
                onError = onError || fallback;
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
                console.log('match', tile1Id, tile2Id);
                var self = this;
                return self.request('POST', '/games/' + id + '/tiles/matches', { tile1Id: tile1Id, tile2Id: tile2Id }, function (result) {
                    onSuccess(result.data);
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
                this.user = {};
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
                return !!this.user.name && !!this.user.token;
            };
            return AuthService;
        }());
        Service.AuthService = AuthService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Service;
    (function (Service) {
        'use strict';
        var SocketService = (function () {
            function SocketService() {
                this.connections = {};
            }
            SocketService.prototype.connect = function (ids) {
                this.disconnect();
                for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                    var id = ids_1[_i];
                    this.connections[id] = io('http://mahjongmayhem.herokuapp.com?gameId=' + id);
                }
            };
            SocketService.prototype.disconnect = function () {
                if (Object.keys(this.connections).length > 0) {
                    for (var key in this.connections) {
                        this.connections[key].close();
                    }
                    this.connections = {};
                }
            };
            SocketService.prototype.onStart = function (handler) {
                for (var key in this.connections) {
                    this.connections[key].on('start', function () {
                        handler(key);
                    });
                }
            };
            SocketService.prototype.onEnd = function (handler) {
                for (var key in this.connections) {
                    this.connections[key].on('end', function () {
                        handler(key);
                    });
                }
            };
            SocketService.prototype.onJoined = function (handler) {
                for (var key in this.connections) {
                    this.connections[key].on('playerJoined', function (player) {
                        handler(key, player);
                    });
                }
            };
            SocketService.prototype.onMatch = function (handler) {
                for (var key in this.connections) {
                    this.connections[key].on('match', function (tiles) {
                        handler(key, tiles);
                    });
                }
            };
            return SocketService;
        }());
        Service.SocketService = SocketService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Service;
    (function (Service) {
        'use strict';
        var ParameterReaderService = (function () {
            function ParameterReaderService(configuration, $stateParams) {
                this.configuration = configuration;
                this.$stateParams = $stateParams;
            }
            ParameterReaderService.prototype.getParams = function (data) {
                var self = this;
                var params = [];
                data = data || self.$stateParams;
                params.push({ name: "pageSize", value: self.configuration.pageSize + '' });
                if (data["pageIndex"] != undefined) {
                    params.push({ name: "pageIndex", value: data["pageIndex"] });
                }
                if (data["createdBy"] != undefined) {
                    params.push({ name: "createdBy", value: data["createdBy"] });
                }
                if (data["player"] != undefined) {
                    params.push({ name: "player", value: data["player"] });
                }
                if (data["gameTemplate"] != undefined) {
                    params.push({ name: "gameTemplate", value: data["gameTemplate"] });
                }
                if (data["state"] != undefined) {
                    params.push({ name: "state", value: data["state"] });
                }
                return params;
            };
            return ParameterReaderService;
        }());
        Service.ParameterReaderService = ParameterReaderService;
    })(Service = Application.Service || (Application.Service = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Factory;
    (function (Factory) {
        'use strict';
        Factory.$inject = ['UserService'];
        function HttpInterceptorFactory(AuthService) {
            return {
                'request': function (config) {
                    if (config.url.indexOf('partials') <= -1) {
                        console.log('request @' + config.url);
                    }
                    if (AuthService.user && AuthService.user.name && AuthService.user.token) {
                        if (!config.headers) {
                            config.headers = {};
                        }
                        config.headers["x-username"] = AuthService.user.name;
                        config.headers["x-token"] = AuthService.user.token;
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
                this.template = '<div ng-click="click()" class="tile {{ t.tile.suit }}-{{ t.tile.name }} {{ getEffects() }}" style="left: {{ t.xPos * 25 + (t.zPos * 8) }}; top: {{ t.yPos * (349/480*50) - (t.zPos * 8) }}; z-index: {{ t.zPos }}"></div>';
                this.scope = {
                    t: '=',
                    g: '=',
                };
            }
            TileDirective.prototype.controller = function ($scope, $stateParams, GameService, SocketService, AuthService) {
                SocketService.onMatch(function () {
                    $scope.$apply();
                });
                $scope.getEffects = function () {
                    return $scope.t.matchAttempt.isMatched
                        ? 'hidden'
                        : ($scope.t.matchAttempt.isBlocked
                            ? 'blocked'
                            : ($scope.t.matchAttempt.isSelected
                                ? 'selected'
                                : ''));
                };
                $scope.click = function () {
                    if (!$scope.t.canAttemptMatch() || !$scope.g.canAttemptMatch(AuthService.user))
                        return;
                    $scope.g.matchTile($scope.t, function (tile1, tile2) {
                        GameService.match($scope.g._id, tile1._id, tile2._id, function (tiles) {
                            tile1.matchAttempt.isMatched = true;
                            tile2.matchAttempt.isMatched = true;
                            tile1.matchAttempt.isSelected = false;
                            tile2.matchAttempt.isSelected = false;
                        }, function (error) {
                            alert('Een van deze tiles is al weg.');
                            tile1.matchAttempt.isSelected = false;
                            tile2.matchAttempt.isSelected = false;
                        });
                    });
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
    var Filter;
    (function (Filter) {
        'use strict';
        var MatchedTiles = (function () {
            function MatchedTiles() {
                this.$inject = [];
            }
            MatchedTiles.prototype.filter = function () {
                return function (tiles) {
                    var filtered = [];
                    for (var _i = 0, tiles_3 = tiles; _i < tiles_3.length; _i++) {
                        var tile = tiles_3[_i];
                        if ((tile.match && tile.match.foundBy) || (tile.matchAttempt && tile.matchAttempt.isMatched)) {
                            filtered.push(tile);
                        }
                    }
                    return filtered;
                };
            };
            return MatchedTiles;
        }());
        Filter.MatchedTiles = MatchedTiles;
        Filter.MatchedTilesFactory = (function () {
            var instance = new MatchedTiles();
            var filter = instance.filter;
            filter['$inject'] = [];
            return filter;
        })();
    })(Filter = Application.Filter || (Application.Filter = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Filter;
    (function (Filter) {
        'use strict';
        var FilterForPlayer = (function () {
            function FilterForPlayer() {
                this.$inject = [];
            }
            FilterForPlayer.prototype.filter = function () {
                return function (tiles, player) {
                    if (player == undefined || !player) {
                        console.log('returning tiles');
                        return tiles;
                    }
                    var filtered = [];
                    for (var _i = 0, tiles_4 = tiles; _i < tiles_4.length; _i++) {
                        var tile = tiles_4[_i];
                        if (tile.match.foundBy == player) {
                            console.log('found by', player);
                            filtered.push(tile);
                        }
                    }
                    console.log('returning filtered', player);
                    return filtered;
                };
            };
            return FilterForPlayer;
        }());
        Filter.FilterForPlayer = FilterForPlayer;
        Filter.FilterForPlayerFactory = (function () {
            var instance = new FilterForPlayer();
            var filter = instance.filter;
            filter['$inject'] = [];
            return filter;
        })();
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
                    templateUrl: "partials/index.html"
                }).state('settings', {
                    url: "/settings",
                    templateUrl: "partials/style.html"
                });
            };
            Router.prototype.appendAuthenticationStates = function () {
                this.$stateProvider
                    .state('login', {
                    url: "/login",
                    templateUrl: "partials/login.html",
                    controller: function ($scope, AuthService) {
                        this.authUrl = function () {
                            return AuthService.authenticationUrl();
                        };
                    },
                    controllerAs: "loginCtrl"
                })
                    .state('logout', {
                    url: "/logout",
                    templateUrl: "partials/empty.html",
                    controller: function ($state, AuthService) {
                        AuthService.user = {};
                        $state.go('index');
                    }
                })
                    .state('authentication', {
                    url: "/authCallback?username&token",
                    templateUrl: "partials/empty.html",
                    controller: function ($scope, $state, AuthService) {
                        if ($state.params['username'] && $state.params['token']) {
                            AuthService.setUser($state.params['username'], $state.params['token']);
                            $state.go('games.all');
                        }
                        else {
                            alert('Login failed');
                            $state.go('login');
                        }
                    }
                });
            };
            Router.prototype.appendGameStates = function () {
                this.$stateProvider
                    .state('game', {
                    url: "/game/{id}",
                    abstract: true,
                    templateUrl: "partials/game.html",
                    controller: 'gameController',
                    controllerAs: 'gameCtrl',
                    resolve: {
                        game: function (GameService, $stateParams) {
                            return GameService.read($stateParams.id);
                        }
                    },
                    data: { reqAuth: true }
                })
                    .state('game.board', {
                    url: "/board",
                    templateUrl: 'partials/game-board.html',
                    controller: 'gameBoardController',
                    controllerAs: 'gameCtrl',
                    resolve: {
                        game: function (GameService, $stateParams) {
                            return GameService.read($stateParams.id);
                        },
                        tiles: function (GameService, $stateParams) {
                            return GameService.tiles($stateParams.id);
                        }
                    },
                    data: { reqAuth: true }
                })
                    .state('game.history', {
                    url: "/history",
                    templateUrl: "partials/game-history.html",
                    controller: 'gameHistoryController',
                    controllerAs: 'gameHistoryCtrl',
                    resolve: {
                        game: function (GameService, $stateParams) {
                            return GameService.read($stateParams.id);
                        },
                        tiles: function (GameService, $stateParams) {
                            return GameService.tiles($stateParams.id);
                        }
                    },
                    data: { reqAuth: true }
                });
            };
            Router.prototype.appendListStates = function () {
                this.$stateProvider
                    .state('games', {
                    url: "/games",
                    abstract: true,
                    templateUrl: "partials/gamelist-controls.html",
                    controller: 'gameCreateController',
                    controllerAs: 'gamesCtrl',
                    resolve: {
                        templates: function (ApplicationService) {
                            return ApplicationService.templates();
                        }
                    },
                    data: { reqAuth: true }
                })
                    .state('games.all', {
                    url: "/all",
                    templateUrl: "partials/gamelist.html",
                    controller: 'gamesController',
                    controllerAs: 'gamesCtrl',
                    resolve: {
                        games: function (GameListService, ParameterReaderService) {
                            var params = ParameterReaderService.getParams();
                            return GameListService.readAll(params);
                        },
                        title: function () { return 'Overzicht'; },
                        fromCreatedBy: function () { return false; }
                    },
                    data: { reqAuth: true }
                })
                    .state('created', {
                    url: "/me",
                    templateUrl: "partials/gamelist.html",
                    controller: 'gamesController',
                    controllerAs: 'gamesCtrl',
                    resolve: {
                        games: function (GameListService) {
                            return GameListService.readCreated();
                        },
                        title: function () { return 'Eigen spellen'; },
                        fromCreatedBy: function () { return true; }
                    },
                    data: { reqAuth: true }
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
                this.pageSize = 20;
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
    mahjongMadness.factory('httpRequestInterceptor', Application.Factory.HttpInterceptorFactory);
    mahjongMadness.config(Application.Config.RouterFactory);
    mahjongMadness.config(Application.Config.InitializerFactory);
    mahjongMadness.run(function ($rootScope, $state, AuthService, SocketService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            SocketService.disconnect();
            if (toState.data && toState.data.reqAuth && !AuthService.isLoggedIn()) {
                alert('u\'r nut uthuntucutud, u\'ll bu ruduructud tu lugun.');
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });
    mahjongMadness.constant('configuration', Application.Constant.ConfigurationFactory);
    mahjongMadness.directive('tile', Application.Directive.TileDirectiveFactory);
    mahjongMadness.filter('matchedTiles', Application.Filter.MatchedTilesFactory);
    mahjongMadness.filter('filterForPlayer', Application.Filter.FilterForPlayerFactory);
    mahjongMadness.service('ParameterReaderService', Application.Service.ParameterReaderService);
    mahjongMadness.service('ApplicationService', Application.Service.ApplicationService);
    mahjongMadness.service('StorageService', Application.Service.StorageService);
    mahjongMadness.service('GameListService', Application.Service.GameListService);
    mahjongMadness.service('SocketService', Application.Service.SocketService);
    mahjongMadness.service('AuthService', Application.Service.AuthService);
    mahjongMadness.service('GameService', Application.Service.GameService);
    mahjongMadness.service('StorageService', Application.Service.StorageService);
    mahjongMadness.controller('appController', Application.Controller.AppController);
    mahjongMadness.controller('gameHistoryController', Application.Controller.GameHistoryController);
    mahjongMadness.controller('gameCreateController', Application.Controller.GameCreateController);
    mahjongMadness.controller('gameBoardController', Application.Controller.GameBoardController);
    mahjongMadness.controller('gameController', Application.Controller.GameController);
    mahjongMadness.controller('gamesController', Application.Controller.GamesController);
    mahjongMadness.controller('navigationController', Application.Controllers.NavigationController);
    mahjongMadness.controller('styleController', Application.Controllers.StyleController);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map