/// <reference path="../ts/_all.ts" />

namespace Application.Filter
{
	'use strict'
	
	export class OwnedGames
	{
		private $inject : string[] = [];
		
		public filter(data)
		{
			console.log(data);
			return {
				data: data,
				bop: 'dota'
			}
		}

        public Factory(){
			
			var filter = this.filter;
			filter['$inject'] = this.$inject;
            return filter;
        }
	}
}