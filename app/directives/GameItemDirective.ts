/// <reference path="../ts/_all.ts" />

namespace Application.Directive
{
	export class GameItemDirective
	{
		public link : (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
		public template = '' +
			'<div class="panel panel-default">' +
                '<div class="panel-heading">' +
                    'SITNRD' +
                '</div>' +
                '<div class="panel-body">' +
                    '<ul class="list-group">' +
						'<li class="list-group-item disabled">' +
							'Spelers' +
						'</li>' +
                        '<a ng-repeat="player in game.players" class="list-group-item" ui-sref="user({ player: player })">{{ player }}</a>' +
                    '</ul>' +
                '</div>' +
            '</div>';
		
		constructor()
		{
			// It's important to add `link` to the prototype or you will end up with state issues.
			// See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
			GameItemDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
			{
				/*handle all your linking requirements here*/
			};
		}
		
		public static Factory()
		{
			var directive = () =>
			{
				return new GameItemDirective();
			};

			directive['$inject'] = [];

			return directive;
		}
	}
}