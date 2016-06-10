namespace Application.Services {
    'use strict'

    export class HttpService {
        constructor(private $http, private UserService)
        { }

        public request(options): void {
            if (this.UserService.username && this.UserService.token) {
                return this.$http({
                    method: 'GET',
                    url: options.url,
                    headers: {"x-username": this.UserService.username, "x-token": this.UserService.token}
                });
            }
        }
    }
}