/// <reference path="../ts/_all.ts" />

namespace Application.Directive
{	
	// export class UserDirective
	// {
	// 	public link : (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
	// 	public template = '' +
	// 		'<div class="col-lg-8 col-lg-offset-2">' +
	// 			'{{ name }}' +
	// 		'</div>';
	// 	public name = "Noot noot!";
		
	// 	constructor()
	// 	{
	// 		// It's important to add `link` to the prototype or you will end up with state issues.
	// 		// See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
	// 		// UserDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
	// 		// {
	// 		// 	/*handle all your linking requirements here*/
	// 		// };
	// 	}
		
	// 	public static Factory()
	// 	{
	// 		var directive = () =>
	// 		{
	// 			return new UserDirective();
	// 		};

	// 		directive['$inject'] = [];

	// 		return directive;
	// 	}
	// }
	
	export interface TileDirectiveScope extends ng.IScope
	{
		t: Application.Model.Tile,
		g: Application.Model.Game,
		
		click: () => void,
		getEffects: () => string; //(isMatched: boolean, isBlocked: boolean, isSelected: boolean) => string
	}
	
	export class TileDirective
	{
		public template = '<div ng-click="click()" class="tile {{ t.tile.suit }}-{{ t.tile.name }} {{ getEffects() }}" style="left: {{ t.xPos * 25 + (t.zPos * 8) }}; top: {{ t.yPos * (349/480*50) - (t.zPos * 8) }}; z-index: {{ t.zPos }}"></div>';
		public scope = {
			t: '=',
			g: '='
		};
		
		public controller($scope: TileDirectiveScope, GameService: Application.Service.GameService)//, BoardController: any)
		{
			// move to tile
			// after tiles set, recheck on Block and Match
			if($scope.t.match && $scope.t.match.foundBy)
			{
				$scope.t.matchAttempt.isMatched = true;
			}
			else 
			{
				$scope.t.matchAttempt.isMatched = false;
			}
			$scope.t.matchAttempt.isSelected = false;
			$scope.t.matchAttempt.isBlocked = $scope.g.isTileBlocked($scope.t);
			
			$scope.getEffects = () : string =>
			{
				return $scope.t.matchAttempt.isMatched
					? 'hidden' 
					: ($scope.t.matchAttempt.isBlocked
						? 'blocked'
						: ($scope.t.matchAttempt.isSelected
							? 'selected'
							: ''));
			}		
			$scope.click = () : void =>
			{
				console.log($scope.t);
				
				if($scope.t.matchAttempt.isBlocked)
					return;
				if(!$scope.t.matchAttempt.isSelected && !$scope.g.canAddMatch())
					return;
				$scope.g.matchTile($scope.t, (tile1: Application.Model.Tile, tile2: Application.Model.Tile) =>
				{
					GameService.match($scope.g._id, tile1._id, tile2._id,
						() =>
						{
							console.log('match made');
						},
						(error) =>
						{
							alert('error');
							console.error(error);
						}
					);
				});
				// tile.matchAttempt.isBlocked = GameService.isTileBlocked(tile);
			}
		} 
	}
	
	export function TileDirectiveFactory()
	{
		return new TileDirective();
	}
}