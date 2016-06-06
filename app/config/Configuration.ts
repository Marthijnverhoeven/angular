/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	export interface IConfiguration
	{
		authCallback : string;
	}
	
	export class Configuration implements IConfiguration
	{
		public authCallback = "/#/authCallback";
		
		public static Factory()
		{
			return new Configuration();
		}
	}
}