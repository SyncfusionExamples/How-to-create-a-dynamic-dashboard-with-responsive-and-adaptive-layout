
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

import { DashboardLayout, ResizeEventArgs } from '@syncfusion/ej2-layouts';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { gauge1, gauge2, gauge3 } from './gauge-component';
import { Grid } from '@syncfusion/ej2-grids';
import { gridComponent } from './grid-component';// importing grid component model
import { Maps} from '@syncfusion/ej2-maps'; 
import { mapsComponent } from './map-component'; // importing map component initialization
import { Chart, Legend, Tooltip, ColumnSeries, Category, DataLabel } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip);
import { columnChartComponent } from './chart-component';// importing column chart model

// initializing DashboardLayout component
let dashboard: DashboardLayout = new DashboardLayout({
    columns: 6,
    cellSpacing: [25, 25],
    cellAspectRatio: 100 / 80,
    allowResizing: true,
    resize: refreshControls,
    resizeStop: refreshStopControls,
    mediaQuery: 'max-width:800px',
    panels: [
        {
            'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0, cssClass: 'card-template', content: '#card1'
        },
        {
            'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 2, cssClass: 'card-template', content: '#card2'
        },
        {
            'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 4, cssClass: 'card-template', content: '#card3'
        },
        {
            'sizeX': 3, 'sizeY': 2, 'row': 1, 'col': 0, 'minSizeY': 2, 'minSizeX': 2,
            header: '<div> Customer details</div>', content: '<div style="height:100%; width:100%" id="Grid"></div>'
        },
        {
            'sizeX': 3, 'sizeY': 2, 'row': 1, 'col': 3,
            header: '<div>Regional Map</div>', content: '<div style="height:100%; width:100%" id="map"></div>'
        },
        {
            'sizeX': 3, 'sizeY': 2, 'row': 4, 'col': 0,
            header: '<div>Sales in 2018 </div>', content: '<div style="height:100%; width:100%" id="colChart"></div>'
        },
        {
            'sizeX': 3, 'sizeY': 2, 'row': 4, 'col': 3, 'minSizeY': 2, 'minSizeX': 2,
            header: '<div> Sales Comparison </div>', content: '#card4'
        },

    ]
});
dashboard.appendTo('#editLayout');
let chart: Chart = new Chart(columnChartComponent(), '#colChart')// initializing chart component
let grid: Grid = new Grid(gridComponent(), '#Grid'); // initializing grid component
let map: Maps = new Maps(mapsComponent(), "#map"); // intitalizing map component 
let germany: CircularGauge = new CircularGauge(gauge1(), '#container1'); // intitalizing gauge components
let usa: CircularGauge = new CircularGauge(gauge2(), '#container2');
let uk: CircularGauge = new CircularGauge(gauge3(), '#container3');

function refreshControls(args: ResizeEventArgs): void {
    if (args.element.querySelectorAll(".e-control")) {
        for (let i: number = 0; i < args.element.querySelectorAll(".e-control").length; i++) {
            let controlElement: Element = args.element.querySelectorAll(".e-control")[i];
            if (controlElement) {
                let elementInstance: any = (<any>controlElement).ej2_instances[0];
                if (elementInstance.getModuleName() == "grid") {
                    if (args.element.offsetHeight < 500) {
                        elementInstance.height = "100%";
                    }

                }
                elementInstance.refresh();
            }
        }
    }
}

function refreshStopControls(args: ResizeEventArgs): void {
    if (args.element && args.element.querySelector(".card")) {
        let element: Element = args.element.querySelector(".card");
        (args.element.offsetWidth < 350) ? element.classList.add('small') : element.classList.contains('small') && element.classList.remove('small');
    }
}