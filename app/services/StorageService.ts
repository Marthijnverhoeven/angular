/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	export class StorageService
	{
		private storage: Storage = localStorage;
		
		constructor()
		{ }
		
		public store(key: string, value: Object) : void
		{
			return this.storage.setItem(key, JSON.stringify(value));
		}
		
		public retrieve(key: string) : Object
		{
			var item = this.storage.getItem(key);
			if(!!item)
			{
				return JSON.parse(item);
			}
			throw new Error('item does not exist');
		}
		
		public remove(key: string) : void
		{
			return this.storage.removeItem(key);
		}
	}
}