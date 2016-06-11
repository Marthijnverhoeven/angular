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
		datasource: any,//Application.Model.Tile,
		click: () => void,
		isSelected: boolean,
		isBlocked: boolean,
		getEffects: any
	}
	
	export class TileDirective
	{
		public template = '<div ng-click="click()" class="tile {{ datasource.tile.suit }}-{{ datasource.tile.name }} {{ getEffects(isBlocked, isSelected) }}" style="left: {{ datasource.xPos * 25 + (datasource.zPos * 8) }}; top: {{ datasource.yPos * (349/480*50) - (datasource.zPos * 8) }}; z-index: {{ datasource.zPos }}"></div>';
		public scope = {
			datasource: '='
		};
		
		public controller($scope: TileDirectiveScope)//, BoardController: any)
		{
			var switchMatchedTile = () : void =>
			{
				if($scope.isSelected)
				{
					// BoardController.addMatchedTile($scope.t._id);
				}
				else
				{
					// BoardController.removeMatchedTile($scope.t._id);
				}
			}
			$scope.getEffects = (isBlocked: boolean, isSelected: boolean) : string =>
			{
				return isBlocked
					? 'blocked'
					: (isSelected
						? 'selected'
						: '');
			}
			$scope.isSelected = false;
			$scope.isBlocked = Math.random() > 0.5;			
			$scope.click = () : void =>
			{
				if($scope.isBlocked)
					return;
				$scope.isSelected = !$scope.isSelected;
				switchMatchedTile();
			}
		} 
	}
	
	export function TileDirectiveFactory()
	{
		return new TileDirective();
		// return {
		// 	template: '<div ng-click="click()" class="tile {{ t.tile.suit }}-{{ t.tile.name }}" style="{{ effect }}left: {{ t.xPos * 25 + (t.zPos * 8) }}; top: {{ t.yPos * (349/480*50) - (t.zPos * 8) }}; z-index: {{ t.zPos }}"></div>',
		// 	controller: function($scope, BoardController: any)
		// 	{
		// 		var getEffect = function()
		// 		{
		// 			return $scope.isSelected
		// 				? "-webkit-filter: invert(100%); filter: invert(100%);"
		// 				: '';
		// 		}
		// 		var switchMatchedTile = function()
		// 		{
		// 			if($scope.isSelected)
		// 			{
		// 				BoardController.addMatchedTile($scope.t._id);
		// 			}
		// 			else
		// 			{
		// 				BoardController.removeMatchedTile($scope.t._id);
		// 			}
		// 		}
		// 		$scope.isSelected = false;
		// 		$scope.effect = getEffect();
		// 		$scope.t = $scope.datasource;
				
		// 		console.log($scope.datasource);
		// 		$scope.click = function()
		// 		{
		// 			$scope.isSelected = !$scope.isSelected;
		// 			$scope.effect = getEffect();
		// 			switchMatchedTile();
		// 		}
		// 	},
		// 	scope: {
		// 		datasource: '='
		// 	}
		// };
	}
}