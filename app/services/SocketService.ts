/// <reference path="../ts/_all.ts" />

namespace Application.Service
{
	'use strict'
	
	// Declarations
	declare var io: SocketIOStatic;
	
	export class SocketService
	{
		private connections: SocketIO.Server[];
		
		constructor()
		{
			this.connections = [];
		}
		
		public connect(ids: string[]) : void
		{
			this.disconnect();
			for(var id of ids)
			{
				this.connections.push(io('http://mahjongmayhem.herokuapp.com?gameId=' + id));
			}
		}
		
		public disconnect() : void
		{
			if(this.connections.length > 0)
			{
				for(var socket of this.connections)
				{
					socket.close();
				}
				this.connections = [];
			}
		}
		
		public onStart(handler: () => void)
		{
			for(var socket of this.connections)
			{
				socket.on('start', handler);
			}
		}
		
		public onEnd(handler: () => void)
		{
			for(var socket of this.connections)
			{
				socket.on('end', handler);
			}
		}
		
		public onJoined(handler: (player: Application.Model.Game.Player) => void)
		{
			for(var socket of this.connections)
			{
				socket.on('playerJoined', handler);
			}
		}
		
		public onMatch(handler: (tiles: Application.Model.Tile[]) => void)
		{
			for(var socket of this.connections)
			{
				socket.on('match', handler);
			}
		}
	}
}