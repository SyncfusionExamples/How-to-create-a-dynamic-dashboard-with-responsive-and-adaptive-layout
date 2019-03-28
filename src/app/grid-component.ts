import { isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { Grid, VirtualScroll, Sort, Filter, Selection, Page, GridModel } from '@syncfusion/ej2-grids';
Grid.Inject(Selection, VirtualScroll, Sort, Filter, Page);
import { getTradeData } from './datasource';

export function gridComponent(): GridModel {

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
    
    
    let girdModel: GridModel = {};
    girdModel.dataSource = getTradeData(8);
    girdModel.allowSelection = true;
    girdModel.allowFiltering =true;
    girdModel.allowSorting= true;
    girdModel.filterSettings = {type:'Menu'};
    girdModel.enableHover = false;
    girdModel.rowHeight = 35;
    girdModel.columns =  [
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

    ];
    girdModel.dataBound = startTimer;
    girdModel.actionComplete = complete;
    girdModel.allowPaging = true;
    girdModel.pageSettings = {pageSize:6};
    return girdModel;
}