namespace Application.Controllers
{
	export class GameController
	{
		private game;
		private test = "test";
		private tiles;
		
		constructor(private UserService, $http : angular.IHttpService, $stateParams, private $scope)
		{			
			console.log($stateParams);
			
			if($stateParams.id === 0) {
				$stateParams.id = '5541fc5b1872631100678bb4';
			}
			
			var self = this;
			var url = 'https://mahjongmayhem.herokuapp.com/games/' + $stateParams.id + '/tiles';
			$http.get(url).success(function(data) {
				console.log(data);
				self.tiles = data;
			});
		}
		
		public currentGame()
		{
			return this.$scope.selected;
		}
		
		public matchesExist()
		{
			var self = this;
			// self.TileService.matchesExist(self.game, function(err, res) {
				
			// });
		}
	}
}