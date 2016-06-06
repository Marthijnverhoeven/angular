/// <reference path="../ts/_all.ts" />

namespace Application.Directive
{
	export class UserDirective
	{
		public link : (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
		public template = '' +
			'<div class="col-lg-8 col-lg-offset-2">' +
				'{{ name }}' +
			'</div>';
		public name = "Noot noot!";
		
		constructor()
		{
			// It's important to add `link` to the prototype or you will end up with state issues.
			// See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
			// UserDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
			// {
			// 	/*handle all your linking requirements here*/
			// };
		}
		
		public static Factory()
		{
			var directive = () =>
			{
				return new UserDirective();
			};

			directive['$inject'] = [];

			return directive;
		}
	}
}