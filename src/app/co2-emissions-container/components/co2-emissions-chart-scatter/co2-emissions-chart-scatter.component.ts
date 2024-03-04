import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";
import { EChartsOption, format } from 'echarts';
import { Co2CalculatorService } from "../../services/co2-calculator.service";
import { Co2EmissionsChartScatterService } from "./service/co2-emissions-chart-scatter.service";
import { Co2Data, CO2FormId } from "../../models/co2-data.interface";


@Component({
  selector: 'app-co2-emissions-chart-scatter',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEcharts(), Co2CalculatorService, Co2EmissionsChartScatterService],
  templateUrl: './co2-emissions-chart-scatter.component.html',
  styleUrl: './co2-emissions-chart-scatter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Co2EmissionsChartScatterComponent {
  mergeOptions: EChartsOption | null = null;
  chartOption: EChartsOption = {
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: function (value) {
          return format.formatTime('dd.MM', value);
        },
      },
    },
    yAxis: {},
    series: [{
      type: 'scatter',
      symbolSize: 10,
      color: 'green',
      data: []
    }]
  };

  @Input() set data(value: Record<CO2FormId, Array<Co2Data>>) {
    this.mergeOptions = this.chartScatterService.setData(value)
  }

  constructor(private chartScatterService: Co2EmissionsChartScatterService) {
  }
}
