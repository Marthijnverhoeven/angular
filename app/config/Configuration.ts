/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	export class Configuration
	{
		public authCallback = "/#/authCallback";
		public baseUrl = "http://localhost:3000";
		
		public apiUrl = "http://mahjongmayhem.herokuapp.com/";
		
		public static Factory()
		{
			return new Configuration();
		}
	}
}