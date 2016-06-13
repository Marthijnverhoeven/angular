/// <reference path="../ts/_all.ts" />

namespace Application.Service
{	
	declare type IHttpService = angular.IHttpService;
	declare type IPromise<T> = angular.IPromise<T>;
	
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
		
		constructor(private $http : IHttpService, private configuration: Application.Constant.Configuration)
		{
			this.availableTemplates = [];
			this.availableGamestates = [];
		}
		
		// GET - /gametemplates
		public templates(onSuccess: (templates: Template[]) => void, onError: (error) => void) : IPromise<Template[]>
		{
			var self = this;
			return self.request<Template[]>(
				'GET',
				'/gametemplates/',
				(result: angular.IHttpPromiseCallbackArg<Template[]>) =>
				{
					onSuccess(result.data);
				},
				onError
			);
		}
		
		// GET - /gametemplates/{id}
		// remove, unused, lowers coverage
		public template(id : string, onSuccess: (templates: Template) => void, onError: (error) => void) : IPromise<Template>
		{
			var self = this;
			return self.request<Template>(
				'GET',
				'/gametemplates/' + id,
				(result: angular.IHttpPromiseCallbackArg<Template>) =>
				{
					onSuccess(result.data);
				},
				onError
			);
		}
		
		// GET - /gamestates
		public states(onSuccess: (templates: GameState[]) => void, onError: (error) => void) : IPromise<GameState[]>
		{
			var self = this;
			return self.request<GameState[]>(
				'GET',
				'/gamestates',
				(result: angular.IHttpPromiseCallbackArg<GameState[]>) =>
				{
					onSuccess(result.data);
				},
				onError
			);
		}
		
		private request<T>(method: string, url: string, onSuccess: (result: angular.IHttpPromiseCallbackArg<T>) => void, onError: (result: angular.IHttpPromiseCallbackArg<any>) => void) : IPromise<T>
		{
			var self = this;
			var promise = this.$http<T>({
				method: method,
				url: self.configuration.apiUrl + url
			})
			promise.then(onSuccess, onError);
			return promise;
		}
	}
}