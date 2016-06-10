/// <reference path="../ts/_all.ts" />

namespace Application.Service
{    
    'use strict'

    export class HttpInterceptor
    {
        constructor(private UserService)
        { }

        public request(config) : void 
        {
            if (this.UserService.username && this.UserService.token) {
                config.headers = { "x-username": this.UserService.username, "x-token": this.UserService.token };
            }
            return config;
        }
        
        public static Factory()
        {
            var interceptor = (UserService) =>
            {
                var instance = new HttpInterceptor(UserService);
                return {
                    'request': instance.request
                };
            };
            
            interceptor['$inject'] = ['UserService'];
            
            return interceptor;
        }
    }
}