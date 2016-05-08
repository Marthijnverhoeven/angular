var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var GameListController = (function () {
            function GameListController(GameFactory, $scope) {
                this.GameFactory = GameFactory;
                this.user = 'Marthijn';
                var self = this;
                GameFactory.GET(function (games) {
                    self.games = games;
                });
            }
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
    var Services;
    (function (Services) {
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
                        console.log(self.games);
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
            };
            return GameFactory;
        }());
        Services.GameFactory = GameFactory;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    'use strict';
    var mahjongMadness = angular.module('mahjongMadness', []);
    console.log('TEST');
    mahjongMadness.service('GameFactory', Application.Services.GameFactory);
    mahjongMadness.controller('gameListController', Application.Controllers.GameListController);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map