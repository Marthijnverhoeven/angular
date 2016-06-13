namespace Application.Controllers
{
	export class GameController
	{
		private test = "test";
		
		constructor(
			public UserService,
			public GameListService: Application.Service.GameListService,
			public GameService: Application.Service.GameService,
			private $state: angular.ui.IStateService,
			private $stateParams,
			private $scope)
		{
			this.GameService.tiles(this.GameListService.currentGame.id);
		}
		
		public currentGame()
		{
			return this.GameListService.currentGame;
		}
		
		public canStartGame() : boolean
		{
			return true;
		}
		
		public startGame(game: Application.Model.Game) : void
		{
			this.GameService.start(game._id,
				(id) => {
					this.$state.go('game', { id: id });
				},
				(error) => {
					alert('error @GameController.startGame');
					console.error(error);
				}
			);
		}
	}
}