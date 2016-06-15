/// <reference path="../ts/_all.ts" />

namespace Application.Constant
{
	'use strict'
	
	export class Configuration
	{
		public authCallback = "/#/authCallback";
		public baseUrl = "http://localhost:3000";
		
		public apiUrl = "http://mahjongmayhem.herokuapp.com";
		
		public minPlayers = 1;
		public maxPlayers = 32;
	}
	
	export var $inject: string[] = [];
	
	// constants need to be immediately invoked.
	export var ConfigurationFactory = (() =>
	{
		return new Configuration();
	})()
}