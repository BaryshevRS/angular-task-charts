import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent, NgApexchartsModule
} from "ng-apexcharts";
import { ChartSplineOptions } from "./models";

@Component({
  selector: 'app-co2-emissions-chart-spline',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './co2-emissions-chart-spline.component.html',
  styleUrl: './co2-emissions-chart-spline.component.scss'
})
export class Co2EmissionsChartSplineComponent {
  @ViewChild("chart") chart: ChartComponent | null = null;
  public chartOptions: ChartSplineOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  public generateData(baseval: number, count: number, yrange: { min: number, max: number }) {
    let i = 0;
    let series = [];
    while (i < count) {
      let x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      let z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
