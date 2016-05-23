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
            function Tile() {
            }
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
            function GameListController(UserService, GameFactory, $scope) {
                this.UserService = UserService;
                this.GameFactory = GameFactory;
                this.$scope = $scope;
                var self = this;
                GameFactory.GET(function (games) {
                    self.games = games;
                });
                this.user = this.UserService.user;
            }
            GameListController.prototype.openGame = function (game) {
                this.$scope.selected = game;
            };
            GameListController.prototype.newGame = function (_title) {
                var self = this;
                self.GameFactory.POST({ title: _title, players: [self.user] });
                self.GameFactory.GET(function (games) {
                    self.games = games;
                });
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
            function GameController(UserService, TileService, $scope) {
                this.UserService = UserService;
                this.TileService = TileService;
                this.$scope = $scope;
                console.log('GameController');
                console.log($scope);
            }
            GameController.prototype.currentGame = function () {
                return this.$scope.selected;
            };
            GameController.prototype.matchesExist = function () {
                var self = this;
                self.TileService.matchesExist(self.game, function (err, res) {
                });
            };
            return GameController;
        }());
        Controllers.GameController = GameController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        'use strict';
        var GameFactory = (function () {
            function GameFactory($timeout) {
                this.$timeout = $timeout;
                this.games = [
                    { id: 2, title: "Mario", players: ["a", "b", "c", "d"] },
                    { id: 3, title: "Rayman", players: ["henk", "heenk"] }
                ];
            }
            GameFactory.prototype.GET = function (id, callBack) {
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
            GameFactory.prototype.PUT = function (game) {
                throw new Error('NotImplementedError');
            };
            GameFactory.prototype.POST = function (game) {
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
            GameFactory.prototype.DELETE = function (game) {
                throw new Error('NotImplementedError');
            };
            return GameFactory;
        }());
        Services.GameFactory = GameFactory;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var GameService = (function () {
            function GameService() {
            }
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
            function UserService() {
                this.user = { name: 'Marthijn' };
            }
            return UserService;
        }());
        Services.UserService = UserService;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    'use strict';
    var mahjongMadness = angular.module('mahjongMadness', []);
    console.log('TEST');
    mahjongMadness.service('GameFactory', Application.Services.GameFactory);
    mahjongMadness.service('TileService', Application.Services.TileService);
    mahjongMadness.service('UserService', Application.Services.UserService);
    mahjongMadness.service('GameService', Application.Services.GameService);
    mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
    mahjongMadness.controller('gameController', Application.Controllers.GameController);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map