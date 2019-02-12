import { Chart, Legend, Tooltip, ColumnSeries, Category, DataLabel, ChartModel  } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip);

export function columnChartComponent(): ChartModel {

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

    let chartModel: ChartModel = {};
        chartModel.primaryXAxis = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    chartModel.primaryYAxis = {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    chartModel.chartArea = {border:{width:0}};
    chartModel.series =  [{
        dataSource: chartData,
        type: 'Column', xName: 'month', width: 10, yName: 'sales', fill: '#68ae00'
    },
    {
        dataSource: chartData1,
        type: 'Column', xName: 'month', width: 10, yName: 'sales', fill: '#FC8213'
    },];

    chartModel.height= "266px",
    chartModel.width= "570px"
    return chartModel
}