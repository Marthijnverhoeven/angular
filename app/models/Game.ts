namespace Application.Model
{
	export class Game
	{
		_id: string;
		createdBy: 
		{
			_id: string,
			name: string,
			__v: number,
			id: string
		};
		createdOn: string;
		startedOn: string;
		endedOn: string;
		gameTemplate: {
			_id: string,
			__v: number,
			id: string
		};
		__v: number;
		players: {
			_id: string,
			name: string,
			__v: number,
			id: string
		}[];
		maxPlayers: number;
		minPlayers: number;
		state: string;
		id: string;
		
		
		public canVisit() : boolean
		{
			return this.state == 'open';
		}
	}
}