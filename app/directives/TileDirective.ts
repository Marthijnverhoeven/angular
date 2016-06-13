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
		datasource: Application.Model.Tile,
		
		click: () => void,
		getEffects: () => string; //(isMatched: boolean, isBlocked: boolean, isSelected: boolean) => string
	}
	
	export class TileDirective
	{
		public template = '<div ng-click="click()" class="tile {{ datasource.tile.suit }}-{{ datasource.tile.name }} {{ getEffects() }}" style="left: {{ datasource.xPos * 25 + (datasource.zPos * 8) }}; top: {{ datasource.yPos * (349/480*50) - (datasource.zPos * 8) }}; z-index: {{ datasource.zPos }}"></div>';
		public scope = {
			datasource: '='
		};
		
		public controller($scope: TileDirectiveScope, GameService: Application.Service.GameService)//, BoardController: any)
		{
			var tile = GameService.getTile($scope.datasource._id);
			tile.matchAttempt.isMatched = false;
			tile.matchAttempt.isSelected = false;
			tile.matchAttempt.isBlocked = GameService.isTileBlocked(tile);
			
			$scope.getEffects = () : string =>
			{
				return tile.matchAttempt.isMatched
					? 'hidden' 
					: (tile.matchAttempt.isBlocked
						? 'blocked'
						: (tile.matchAttempt.isSelected
							? 'selected'
							: ''));
			}		
			$scope.click = () : void =>
			{
				if(tile.matchAttempt.isBlocked)
					return;
				if(!tile.matchAttempt.isSelected && !GameService.canAddMatch(tile))
					return;
				GameService.matchTile(tile);
			}
		} 
	}
	
	export function TileDirectiveFactory()
	{
		return new TileDirective();
	}
}