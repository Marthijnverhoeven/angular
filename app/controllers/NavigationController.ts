/// <reference path="../ts/_all.ts" />

namespace Application.Controllers
{
	export class NavigationController
	{
		private title : string;
		private user : any;
		private menuitems : any[];
		
		private navigationDictionary = {
			'index' 			: { title: 'Index', 	items: this.getItemsWithActive("index") },
			'login' 			: { title: 'Login', 	items: this.getItemsWithActive("login") },
			'allGames' 			: { title: 'All games', items: this.getItemsWithActive("allGames") },
			'allGames.myGames' 	: { title: 'My games', 	items: this.getItemsWithActive("allGames.myGames") }
		}
		
		constructor(private $state, private $scope, private UserService)
		{
			console.log('nav ctor');
			var self = this;
			
			this.title = 'Error';
			this.menuitems = [];
			this.user = {};
			
			$scope.currState = $state;
			$scope.$watch('currState.current.name', function(newValue, oldValue) {
				console.log(newValue, oldValue);
				console.log(self.UserService	);
				self.user.name = self.UserService.username;
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
				{ label: 'My games', 	state: 'allGames.myGames' }
			];
			
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