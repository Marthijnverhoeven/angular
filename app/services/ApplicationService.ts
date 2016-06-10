/// <reference path="../ts/_all.ts" />

namespace Application.Service
{	
	declare type onSuccess<T> = Application.Model.SuccessCallback<T>;
	declare type Template = {
		_id: string;
		__v: number;
		tiles: { xPos: number, yPos: number, zPos: number }[];
	};
	declare type GameState = {
		state: "open" | "playing" | "ended",
		count: number
	};
	
	export class ApplicationService
	{
		public availableTemplates: Template[];
		public currentTemplate: Template;
		public availableGamestates: GameState[];
		
		constructor(private $http : angular.IHttpService)
		{
			this.availableTemplates = [];
			this.availableGamestates = [];
		}
		
		// GET - /gametemplates
		public templates() : any
		{
			var self = this;
			self.request<Template[]>(
				'GET',
				'/gametemplates/',
				(result: angular.IHttpPromiseCallbackArg<Template[]>) =>
				{
					self.availableTemplates = result.data;
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}
			);
		}
		
		// GET - /gametemplates/{id}
		public template(id : number) : any
		{
			var self = this;
			self.request<Template>(
				'GET',
				'/gametemplates/' + id,
				(result: angular.IHttpPromiseCallbackArg<Template>) =>
				{
					self.currentTemplate = result.data;
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}
			);
		}
		
		// GET - /gamestates
		public states() : any
		{
			var self = this;
			self.request<GameState[]>(
				'GET',
				'/gamestates',
				(result: angular.IHttpPromiseCallbackArg<GameState[]>) =>
				{
					self.availableGamestates = result.data;
				},
				(error: angular.IHttpPromiseCallbackArg<any>) =>
				{
					console.error(error);
					alert("Error, templates could not be retrieved");
				}
			);
		}
		
		private request<T>(method: string, url: string, onSuccess: (result: angular.IHttpPromiseCallbackArg<T>) => void, onError: (result: angular.IHttpPromiseCallbackArg<any>) => void) : void
		{
			
		}
	}
}