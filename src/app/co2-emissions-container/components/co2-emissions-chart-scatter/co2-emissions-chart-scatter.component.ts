import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-co2-emissions-chart-scatter',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts()],
  templateUrl: './co2-emissions-chart-scatter.component.html',
  styleUrl: './co2-emissions-chart-scatter.component.scss'
})
export class Co2EmissionsChartScatterComponent {
  chartOption: EChartsOption = {
    // xAxis: {
    //   type: 'category',
    //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    // },
    // yAxis: {
    //   type: 'value',
    // },
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        color: 'red',
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ],
        type: 'scatter'
      },
      {
        symbolSize: 20,
        color: 'blue',
        data: [
          [12.0, 12.04],
          [15.07, 6.95],

        ],
        type: 'scatter'
      }
    ],
  };
}
