/// <reference path="../ts/_all.ts" />
namespace Application.Controllers
{
    export class StyleController
    {
        public currentStyle : {key: string, name: string, url: string};
        public selectedStyle : string;
        public availableStyles = [
            {key: "app.css", name: "App", url: "css/app.css"},
            {key: "alt.css", name: "Alt", url: "css/alt.css"}
        ];

        constructor(private $state, private $scope, public StorageService: Application.Service.StorageService) {
            this.currentStyle = <any>{};
            this.getCurrentStyle();
        }

        // Gets the current style from storage, if it does not exist, it will select the first one and store it.
        public getCurrentStyle() : void {
            var style;
            if(style = this.StorageService.retrieve("style")) {
                this.currentStyle = style;
            } else {
                this.StorageService.store("style", this.availableStyles[0]);
            }
        }

        // Returns a list of available styles.
        public getAvailableStyles() : any[] {
            return this.availableStyles;
        }

        // Sets the current style by key.
        public setCurrentStyle() : void {
            for(var i = 0; i < this.availableStyles.length; i++) {
                if(this.availableStyles[i].key == this.selectedStyle) {
                    this.StorageService.store("style", this.availableStyles[i]);
                    this.currentStyle = this.availableStyles[i];
                }
            }
            //console.log(this.selectedStyle, typeof this.selectedStyle);
            //this.StorageService.store("style", this.selectedStyle);
        }
    }
}