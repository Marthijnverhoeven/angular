/// <reference path="../ts/_all.ts" />

namespace Application.Config
{
	'use strict'
	
	declare var io: SocketIO.Client;
	
	export class Initializer
	{
		constructor($httpProvider: angular.IHttpProvider)
		{
			// initialize interceptors
			$httpProvider.interceptors.push('httpRequestInterceptor');
			
			// io.
		}
	}
	
	export var $inject = ['$httpProvider'];
	
	export function InitializerFactory($httpProvider)
	{
		return new Initializer($httpProvider);
	}
}