/// <reference path="../ts/_all.ts" />

namespace Application.Service
{    
    'use strict'

    export function HttpInterceptor()
    {
        return function()
        {
            
        }
    }
    
    // export static var $inject = ['UserService', 'configuration'];

    // export class HttpInterceptor
    // {
    //     constructor(private UserService, private configuration: Application.Config.Configuration)
    //     { }

    //     public request(config) : void 
    //     {
    //         var self = this;
    //         if (self.UserService.username && self.UserService.token) {
    //             config.headers = { "x-username": self.UserService.username, "x-token": self.UserService.token };
    //         }
    //         config.url = self.configuration.apiUrl
    //         return config;
    //     }
        
    //     public static Factory()
    //     {
    //         var interceptor = (UserService, configuration) =>
    //         {
    //             console.log(UserService);
    //             var instance = new HttpInterceptor(UserService, configuration);
    //             return {
    //                 'request': instance.request
    //             };
    //         };
            
    //         interceptor['$inject'] = ['UserService', 'configuration'];
            
    //         return interceptor;
    //     }
    // }
}