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
           	var item = this.storage.getItem(key);
            if(!!item) {
                this.storage.removeItem(key);
            }
			return this.storage.setItem(key, JSON.stringify(value));
		}
		
		public retrieve(key: string) : Object
		{
			var item = this.storage.getItem(key);
			if(!!item)
			{
				return JSON.parse(item);
			}
            return null;
			//throw new Error('item does not exist');
		}
		
		public remove(key: string) : void
		{
			return this.storage.removeItem(key);
		}
	}
}