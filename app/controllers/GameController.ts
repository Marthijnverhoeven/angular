namespace Application.Controllers
{
	export class GameController
	{
		private test = "test";
		
		constructor(
			public UserService,
			public GameListService: Application.Service.GameListService,
			public GameService: Application.Service.GameService,
			private $stateParams,
			private $scope)
		{
			if($stateParams.id === 0) {
				$stateParams.id = '5541fc5b1872631100678bb4';
			}
			
			console.log("beepboop: " + this.GameListService);
			console.log("beepboop: " + this.GameListService.currentGame);
			this.GameService.tiles(this.GameListService.currentGame.id);
		}
		
		public currentGame()
		{
			return this.GameListService.currentGame;
		}
		
		public matchesExist()
		{
			var self = this;
			// self.TileService.matchesExist(self.game, function(err, res) {
				
			// });
		}
		
		public logSelectedTiles()
		{
			for(var tile of this.GameService.currentTiles)
			{
				if(tile.matchAttempt.isSelected)
				{
					console.log(tile);
				}
			}
		}
	}
}