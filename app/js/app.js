require('angular/angular');

//Controllers
var gameListController = require('../controllers/GameListController');

//Factories
var gameFactory = require('../services/GameFactory');

// Create your app
var myApp = angular.module('myApp', []);

myApp.factory('GameFactory', gameFactory);
myApp.controller('gameListController', gameListController);