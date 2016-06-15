/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	export class ParameterReaderService
	{
		constructor(private configuration: Application.Constant.Configuration,
					private $stateParams: angular.ui.IStateParamsService)
		{ }
		
		public getParams(data? : { [key: string]: any} ) : { name: string, value: string }[]
		{
			var self = this;
			var params: { name: string, value: string }[] = [];
			data = data || self.$stateParams;

			params.push({ name: "pageSize", value: self.configuration.pageSize + '' });

			if(data["pageIndex"] != undefined)
			{
				params.push({ name: "pageIndex", value: data["pageIndex"] });
			}
			
			if(data["createdBy"] != undefined)
			{
				params.push({ name: "createdBy", value: data["createdBy"] });
			}

			if(data["player"] != undefined)
			{
				params.push({ name: "player", value: data["player"]});
			}

			if(data["gameTemplate"] != undefined)
			{
				params.push({ name: "gameTemplate", value: data["gameTemplate"] });
			}

			if(data["state"] != undefined)
			{
				params.push({ name: "state", value: data["state"] });
			}
			
			return params;
		}
	}
}