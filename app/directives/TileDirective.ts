/// <reference path="../ts/_all.ts" />

namespace Application.Directive
{	
	declare var io: SocketIOStatic;
	
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
			g: '=',
		};
		
		public controller(
			$scope: TileDirectiveScope,
			$stateParams: angular.ui.IStateParamsService,
			GameService: Application.Service.GameService,
			SocketService: Application.Service.SocketService,
			AuthService: Application.Service.AuthService)
		{
			SocketService.onMatch((matchedTiles) => { console.log('applying dat shit'); $scope.$apply(); });
						
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
				if(!$scope.t.canAttemptMatch() || !$scope.g.canAttemptMatch(AuthService.user))
					return;
				$scope.g.matchTile($scope.t, (tile1: Application.Model.Tile, tile2: Application.Model.Tile) =>
				{
					GameService.match($scope.g._id, tile1._id, tile2._id,
						(tiles) =>
						{
							tile1.matchAttempt.isMatched = true;
							tile2.matchAttempt.isMatched = true;
							tile1.matchAttempt.isSelected = false;
							tile2.matchAttempt.isSelected = false;
						}, // lol useless
						(error) =>
						{
							alert('Een van deze tiles is al weg.');
							tile1.matchAttempt.isSelected = false;
							tile2.matchAttempt.isSelected = false;
						}
					);
				});
			}
		} 
	}
	
	export function TileDirectiveFactory()
	{
		return new TileDirective();
	}
}