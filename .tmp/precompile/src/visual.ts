
module powerbi.extensibility.visual.barChart81A8E5B3032E4240987810B892179CA4  {
    "use strict";
    export interface TestItem {
        Country: string;
        Cost: number;
    }
    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private textNode: Text;
        private svg: d3.Selection<SVGElement>;
        private g: d3.Selection<SVGElement>;
        private margin = { top: 20, right: 20, bottom: 200, left: 70 };
        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            // append svg graphics
            this.svg = d3.select(options.element).append('svg');
            this.g = this.svg.append('g');


            /*
            this.target = options.element;
            this.updateCount = 0;
            if (typeof document !== "undefined") {
                const new_p: HTMLElement = document.createElement("p");
                new_p.appendChild(document.createTextNode("Update count:"));
                const new_em: HTMLElement = document.createElement("em");
                this.textNode = document.createTextNode(this.updateCount.toString());
                new_em.appendChild(this.textNode);
                new_p.appendChild(new_em);
                this.target.appendChild(new_p);
            }
            */
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            // "this" scope will change in the nested function
            let _this = this;
            // get height and width from viewport
            _this.svg.attr({
                height: options.viewport.height,
                width: options.viewport.width
            });

            let gHeight = options.viewport.height;
            let gMarginTop = _this.margin.top;
            let gMarginBottom = _this.margin.bottom;

            console.log('Visual update', options);
            if (typeof this.textNode !== "undefined") {
                this.textNode.textContent = JSON.stringify(options.dataViews[0].table.rows);
            }
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}