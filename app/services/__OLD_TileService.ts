namespace Application.Services
{	
	
	// to GameService
	
	export class TileService
	{
		private baseUrl = 'https://mahjongmayhem.herokuapp.com';
		
		constructor(private $http)
		{ }
		
		public getTiles(game, callback)
		{
			var self = this;
			self.$http({
				method: 'GET',
				url: self.baseUrl + '/games/' + game.id + '/tiles' 
			}).then(function(res) {
					callback(null, res)
				}, 
				function(res) { 
					callback(res);
				}
			);
		}
		
		public matchTiles(game, tileArgs, callback)
		{
			var self = this;
			self.$http({
				data: tileArgs,
				method: 'POST',
				url: self.baseUrl + '/games/' + game.id + '/tiles/matches' 
			}).then(function(res) {
					callback(null, res)
				}, 
				function(res) { 
					callback(res);
				}
			);
		}
		
		public getMatched(game, callback)
		{
			var self = this;
			self.$http({
				method: 'GET',
				url: self.baseUrl + '/games/' + game.id + '/tiles?matched=true' 
			}).then(function(res) {
					callback(null, res)
				}, 
				function(res) { 
					callback(res);
				}
			);
		}
		
		public getUnmatched(game, callback)
		{
			var self = this;
			self.$http({
				method: 'GET',
				url: self.baseUrl + '/games/' + game.id + '/tiles?matched=false' 
			}).then(function(res) {
					callback(null, res)
				}, 
				function(res) { 
					callback(res);
				}
			);
		}
		
		public matchesExist(game, callback) {
			this.getUnmatched(game, function(err, res) {
				if(err) {
					return callback(err);
				}
				
				console.log(res.data);
				callback(null, { 'message': 'todo: implement' });
			});
		}
	}
}