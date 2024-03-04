import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import {
  ChartComponent, NgApexchartsModule
} from "ng-apexcharts";
import { ChartSplineOptions } from "./models";
import { ChangeDetection } from "@angular/cli/lib/config/workspace-schema";
import { Co2CalculatorService } from "../../services/co2-calculator.service";
import {
  Co2EmissionsChartScatterService
} from "../co2-emissions-chart-scatter/service/co2-emissions-chart-scatter.service";
import { Co2EmissionsChartSplineService } from "./service/co2-emissions-chart-spline.service";
import { Co2Data, CO2FormId } from "../../models/co2-data.interface";

@Component({
  selector: 'app-co2-emissions-chart-spline',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  providers: [
    Co2CalculatorService, Co2EmissionsChartSplineService
  ],
  templateUrl: './co2-emissions-chart-spline.component.html',
  styleUrl: './co2-emissions-chart-spline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Co2EmissionsChartSplineComponent {
  @ViewChild("chart" ) chart: ChartComponent | null = null;
  public chartOptions: ChartSplineOptions = {
    series: [
    ],
    chart: {
      height: 380,
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
      ]
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    }
  };

  @Input() set data(value: Record<CO2FormId, Array<Co2Data>>) {
    this.chartSplineService.setData(value)
    const { series, xaxis } = this.chartSplineService.setData(value)
    this.chartOptions.series = series
    this.chartOptions.xaxis = xaxis
  }

  constructor(private chartSplineService: Co2EmissionsChartSplineService) {
  }
}
