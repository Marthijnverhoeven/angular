/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	export class NavigationController
	{
		private title : string;
		private menuitems : any[];
		
		private navigationDictionary = {
			'index' 			: { title: 'Index', 	items: this.getItemsWithActive("index") },
			'login' 			: { title: 'Login', 	items: this.getItemsWithActive("login") },
			'game' 				: { title: 'Game X', 	items: this.getItemsWithActive("game") },
			'allGames' 			: { title: 'All games', items: this.getItemsWithActive("allGames") },
			'myGames' 			: { title: 'My games', 	items: this.getItemsWithActive("myGames") }
		}
		
		private subDictionary = {
			'game' 				: { title: 'Game X', 	items: this.getItemsWithActive(null) }
		}
		
		constructor(private $state, private $scope, public AuthService: Application.Service.AuthService)
		{
			console.log('nav ctor');
			var self = this;
			
			this.title = 'Error';
			this.menuitems = [];
			
			$scope.currState = $state;
			$scope.$watch('currState.current.name', function(newValue, oldValue) {
				if(newValue !== undefined && !!newValue)
				{
					var nav = self.navigationDictionary[newValue];
					if(!!nav)
					{
						self.title = nav.title || 'Error';
						self.menuitems = nav.items || [];
					}
				}
			});
		}
		
		private getItemsWithActive(active : string) : any[]
		{
			var items : any[] = [
				{ label: 'Index', 		state: 'index' },
				{ label: 'Login', 		state: 'login' },
				{ label: 'All games', 	state: 'allGames' },
				{ label: 'My games', 	state: 'myGames' }
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