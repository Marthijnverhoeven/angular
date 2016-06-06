/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	export interface IConfiguration
	{
		authCallback : string;
		baseUrl: string;
	}
	
	export class Configuration implements IConfiguration
	{
		public authCallback = "/#/authCallback";
		public baseUrl = "http://localhost:3000";
		
		public static Factory()
		{
			return new Configuration();
		}
	}
}