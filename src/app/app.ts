import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { gauge1, gauge2, gauge3 } from './data-sample-gauge';
import { Chart, LineSeries, DateTime, Legend, Tooltip, AccPoints } from '@syncfusion/ej2-charts';
import { SplineAreaSeries } from '@syncfusion/ej2-charts';
Chart.Inject(SplineAreaSeries, DateTime, Legend);
import { ListView, Virtualization } from '@syncfusion/ej2-lists';
ListView.Inject(Virtualization);
import { Grid, VirtualScroll, Sort, Filter, Selection, Page } from '@syncfusion/ej2-grids';
import { isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { getTradeData } from './datasource';

Grid.Inject(Selection, VirtualScroll, Sort, Filter, Page);
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
Chart.Inject(SplineAreaSeries, DateTime, Legend);
Chart.Inject(LineSeries, DateTime, Legend, Tooltip);
import { Maps, MapAjax, Zoom, MapsTooltip } from '@syncfusion/ej2-maps';
Maps.Inject(Zoom, Legend, MapsTooltip);
import { ColumnSeries, Category, DataLabel, } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip);

/**
 * Sample
 */
// tslint:disable-next-line:max-func-body-length


let dashboard: DashboardLayout = new DashboardLayout({
    columns: 5,
    cellSpacing: [25, 25],
    cellAspectRatio: 100 / 80,    
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
            'sizeX': 3, 'sizeY': 2, 'row': 1, 'col': 0,
            header: '<div> Customer details</div>', content: '<div id="Grid"></div>'
        },
        {
            'sizeX': 3, 'sizeY': 2, 'row': 1, 'col': 3,
            header: '<div>Regional Map</div>', content: '<div id="map"></div>'
        },
        {
            'sizeX': 3, 'sizeY': 2, 'row': 4, 'col': 0,
            header: '<div>Sales in 2018 </div>', content: '<div id="colChart"></div>'
        },
        {
            'sizeX': 3, 'sizeY': 2, 'row': 4, 'col': 3,
            header: '<div> Sales Comparison </div>', content: '#card4'
        },

    ]
});
dashboard.appendTo('#editLayout');

let dReady: boolean = false;
let dtTime: boolean = false;
let intervalFun: any;
let clrIntervalFun: any;
let stTime: any;
stTime = performance.now();

function complete(args: any): void {
    if (args.requestType === 'filterchoicerequest') {
        if (args.filterModel.options.field === 'Trustworthiness' || args.filterModel.options.field === 'Rating'
            || args.filterModel.options.field === 'Status') {
            let span: Element = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
            if (!isNullOrUndefined(span)) {
                closest(span, '.e-ftrchk').classList.add('e-hide');
            }
        }
    }
}
function queryCellInfo(args: any): void {
    if (args.column.field === 'Employees') {
        if (args.data.EmployeeImg === 'usermale') {
            args.cell.querySelector('.e-userimg').classList.add('sf-icon-Male');
        } else {
            args.cell.querySelector('.e-userimg').classList.add('sf-icon-FeMale');
        }
    }
    if (args.column.field === 'Status') {
        if (args.cell.textContent === 'Active') {
            args.cell.querySelector('.statustxt').classList.add('e-activecolor');
            args.cell.querySelector('.statustemp').classList.add('e-activecolor');
        }
        if (args.cell.textContent === 'Inactive') {
            args.cell.querySelector('.statustxt').classList.add('e-inactivecolor');
            args.cell.querySelector('.statustemp').classList.add('e-inactivecolor');
        }
    }
    if (args.column.field === 'Rating') {
        if (args.column.field === 'Rating') {
            for (let i: number = 0; i < args.data.Rating; i++) {
                args.cell.querySelectorAll('span')[i].classList.add('checked');
            }
        }
    }
    if (args.column.field === 'Software') {
        if (args.data.Software <= 20) {
            args.data.Software = args.data.Software + 30;
        }
        args.cell.querySelector('.bar').style.width = args.data.Software + '%';
        args.cell.querySelector('.barlabel').textContent = args.data.Software + '%';
        if (args.data.Status === 'Inactive') {
            args.cell.querySelector('.bar').classList.add('progressdisable');
        }
    }
}
function startTimer(args: any): void {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
}


(<{ trustTemp?: Function }>window).trustTemp = (e: any): any => {
    if (e.Trustworthiness === 'Select All') {
        return '';
    }
    /* tslint:disable-next-line:max-line-length */
    return '<img style="width: 31px; height: 24px" src="https://ej2.syncfusion.com/demos/src/grid/images/' + e.Trustworthiness + '.png" /> <span id="Trusttext">' + e.Trustworthiness + '</span>';
};

(<{ ratingDetail?: Function }>window).ratingDetail = (e: any): any => {
    let grid: any = (<any>document.querySelector('.e-grid')).ej2_instances[0];
    let div: Element = document.createElement('div');
    div.className = 'rating';
    let span: Element;
    if (e.Rating === 'Select All') {
        return '';
    }
    for (let i: number = 0; i < 5; i++) {
        if (i < e.Rating) {
            span = document.createElement('span');
            span.className = 'star checked';
            div.appendChild(span);
        } else {
            span = document.createElement('span');
            span.className = 'star';
            div.appendChild(span);
        }
    }
    return div.outerHTML;
};

(<{ statusDetail?: Function }>window).statusDetail = (e: any): any => {
    let grid: any = (<any>document.querySelector('.e-grid')).ej2_instances[0];
    let div: Element = document.createElement('div');
    let span: Element;
    if (e.Status === 'Select All') {
        return 'Select All';
    }
    span = document.createElement('span');
    if (e.Status === 'Active') {
        span.className = 'statustxt e-activecolor';
        span.textContent = 'Active';
        div.className = 'statustemp e-activecolor';
    }
    if (e.Status === 'Inactive') {
        span = document.createElement('span');
        span.className = 'statustxt e-inactivecolor';
        span.textContent = 'Inactive';
        div.className = 'statustemp e-inactivecolor';
    }
    div.appendChild(span);
    return div.outerHTML;
};



let grid: Grid = new Grid({
    dataSource: getTradeData(6),
    allowSelection: true,
    allowFiltering: true,
    allowSorting: true,
    filterSettings: { type: 'Menu' },
    queryCellInfo: queryCellInfo,
    enableHover: false,
    rowHeight: 38,
    columns: [
        {
            field: 'Employees', headerText: 'Name', clipMode: 'EllipsisWithTooltip',
            template: '#empTemplate'
        },
        { field: 'Mail', headerText: 'Mail', filter: { type: 'Menu' } },
        {
            field: 'Location', headerText: 'Location', filter: { type: 'CheckBox' },
            template: '#coltemplate'
        },
        {
            field: 'Status', headerText: 'Status', filter: { type: 'CheckBox', itemTemplate: '#StatusItemTemp' },
            template: '#statusTemplate'
        },

    ],
    dataBound: startTimer,
    actionComplete: complete,
    allowPaging: false,
    pageSettings: { pageSize: 3 }
});

grid.appendTo('#Grid');
grid.on('data-ready', () => {
    dReady = true;
});

let chartData: any[] = [
    { month: 'Jan', sales: 30 }, { month: 'Feb', sales: 80 },
    { month: 'Mar', sales: 30 }, { month: 'Apr', sales: 92 },
    { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 75 }
];
let chartData1: any[] = [
    { month: 'Jan', sales: 60 }, { month: 'Feb', sales: 45 },
    { month: 'Mar', sales: 70 }, { month: 'Apr', sales: 32 },
    { month: 'May', sales: 70 }, { month: 'Jun', sales: 62 },
    { month: 'Jul', sales: 120 }
];
let columnChartObj: Chart = new Chart({
    primaryXAxis: {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },
    primaryYAxis:
    {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    },
    series: [{
        dataSource: chartData,
        type: 'Column', xName: 'month', width: 10, yName: 'sales', fill: '#68ae00'
    },
    {
        dataSource: chartData1,
        type: 'Column', xName: 'month', width: 10, yName: 'sales', fill: '#FC8213'
    },],
    height: "266px",
    width: "570px"
}, '#colChart');
columnChartObj.refresh();

let maps: Maps = new Maps({
    height: "266px",
    width: "570px",
    zoomSettings: {
        enable: false,
        zoomFactor: 7,
        pinchZooming: false
    },
    legendSettings: {
        visible: false
    },
    layers: [
        {
            shapeData: new MapAjax('src/app/worldmap.json'),
            shapeSettings: {
                autofill: true
            },
            dataLabelSettings: {
                visible: true,
                labelPath: 'name',
                smartLabelMode: 'Trim'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            }
        },
    ],
});
maps.appendTo('#map');
let germany: CircularGauge = new CircularGauge(gauge1(), '#container1');
let usa: CircularGauge = new CircularGauge(gauge2(), '#container2');
let uk: CircularGauge = new CircularGauge(gauge3(), '#container3');


