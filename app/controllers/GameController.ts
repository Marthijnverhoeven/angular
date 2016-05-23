namespace Application.Controllers
{
	export class GameController
	{
		private game;
		
		constructor(private UserService, private TileService, private $scope)
		{
			console.log('GameController');
			console.log($scope);
		}
		
		public currentGame()
		{
			return this.$scope.selected;
		}
		
		public matchesExist()
		{
			var self = this;
			self.TileService.matchesExist(self.game, function(err, res) {
				
			});
		}
	}
}