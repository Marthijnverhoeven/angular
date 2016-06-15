/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	export class NavigationController
	{
		private title : string;
		private menuitems : any[];
		
		private navigationDictionary = {
			// state				// title					// active item
			'index' 			: { title: 'Index', 			items: this.getItemsWithActive("index") },
			'games.all' 		: { title: 'Overzicht', 		items: this.getItemsWithActive("games.all") },
			'games.me' 			: { title: 'Eigen spellen', 	items: this.getItemsWithActive("games.me") },
			'settings' 			: { title: 'Instellingen', 		items: this.getItemsWithActive("settings") },
			'game.board' 		: { title: 'Spel', 				items: this.getItemsWithActive(null) },
			'game.history' 		: { title: 'Spel', 				items: this.getItemsWithActive(null) },
			'login' 			: { title: 'Login', 			items: this.getItemsWithActive(null) },
			'logout'			: { title: 'Logout', 			items: this.getItemsWithActive(null) }
		}
		
		constructor(private $state, private $scope, public AuthService: Application.Service.AuthService)
		{
			var self = this;
			this.title = 'Geen titel beschikbaar';
			this.menuitems = [];
			
			$scope.currState = $state;
			$scope.$watch('currState.current.name', function(newValue, oldValue) {
				if(newValue !== undefined && !!newValue)
				{
					var nav = self.navigationDictionary[newValue];
					if(!!nav)
					{
						self.title = nav.title || 'Geen titel beschikbaar';
						self.menuitems = nav.items || [];
					}
				}
			});
		}
		
		public isLoggedIn() : boolean
		{
			return this.AuthService.isLoggedIn();
		}
		
		private getItemsWithActive(active : string) : any[]
		{
			var items : any[] = [
				{ label: 'Index', 			state: 'index' },
				{ label: 'Overzicht', 		state: 'games.all' },
				{ label: 'Eigen spellen', 	state: 'games.me' },
				{ label: 'Instellingen', 	state: 'settings' }
			];
			
			if(!active)
				return items;
			
			var activeAdded = false;
			for(var i = 0; i < items.length; i++)
			{
				if(items[i].state === active)
				{
					items[i].active = 'active';
					activeAdded = true;
					break;
				}
			}
			if(!activeAdded)
			{
				items[0].active = 'active';
			}
			return items;
		}
	}
}