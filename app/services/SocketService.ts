/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	// Declarations
	declare var io: SocketIOStatic;
	
	export class SocketService
	{
		private connections: { [key: string]: SocketIO.Server };
		
		constructor()
		{
			this.connections = {};
		}
		
		public connect(ids: string[]) : void
		{
			this.disconnect();
			for(var id of ids)
			{
				this.connections[id] = io('http://mahjongmayhem.herokuapp.com?gameId=' + id);
			}
		}
		
		public disconnect() : void
		{
			if(Object.keys(this.connections).length > 0)
			{
				for(var key in this.connections)
				{
					this.connections[key].close();
				}
				this.connections = {};
			}
		}
		
		public onStart(handler: (id: string) => void)
		{
			for(var key in this.connections)
			{
				this.connections[key].on('start', () =>
				{
					handler(key);
				});
			}
		}
		
		public onEnd(handler: (id: string) => void)
		{
			for(var key in this.connections)
			{
				this.connections[key].on('end', () =>
				{
					handler(key);
				});
			}
		}
		
		public onJoined(handler: (id: string, player: Application.Model.Game.Player) => void)
		{
			for(var key in this.connections)
			{
				this.connections[key].on('playerJoined', (player: Application.Model.Game.Player) =>
				{
					handler(key, player);
				});
			}
		}
		
		public onMatch(handler: (id: string, tiles: Application.Model.Tile[]) => void)
		{
			for(var key in this.connections)
			{
				this.connections[key].on('match', (tiles: Application.Model.Tile[]) =>
				{
					handler(key, tiles);
				});
			}
		}
	}
}