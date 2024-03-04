import { Injectable } from '@angular/core';
import { Co2CalculatorService } from "../../../services/co2-calculator.service";
import { Co2Data, CO2FormId } from "../../../models/co2-data.interface";
import { EChartsOption } from "echarts";
import { CO2EmissionTitle } from "../../../consts";
import { ChartSplineOptions } from "../models";
import { ApexAxisChartSeries, ApexChart, ApexXAxis } from "ng-apexcharts";

@Injectable()
export class Co2EmissionsChartSplineService {

  constructor(private co2CalculatorService: Co2CalculatorService) {
  }

  setData(data: Record<CO2FormId, Array<Co2Data>>): {
    series: ApexAxisChartSeries;
    xaxis: ApexXAxis;
  } {
    const mergedValues =  Object.values(data).reduce((a, v) => {
      return [...a, ...v];
    }, []);

    const categories: Record<number, string> = mergedValues.reduce((a: Record<number, string>, { date }) => {
      const id = new Date(date + '').setHours(0, 0, 0, 0);
      return { ...a, [id]: date + ''}
    }, {})

    const gas = this.getSeries(data[CO2FormId.Gas], categories, this.co2CalculatorService.calculateGasCo2);
    const coal = this.getSeries(data[CO2FormId.Coal], categories, this.co2CalculatorService.calculateCoalCo2);

    const series = [
      {
        name: CO2EmissionTitle[CO2FormId.Gas],
        data: gas
      },
      {
        name: CO2EmissionTitle[CO2FormId.Coal],
        data: coal
      },
      {
        name: CO2EmissionTitle.all,
        data: gas.map((v, i) => v + coal[i])
      }
    ]

    const xaxis: ApexXAxis = {
      type: "datetime",
      categories: Object.values(categories)
    }

    return {series, xaxis }
  }

  getSeries(data:  Array<Co2Data>, categories: Record<number, string>, mapFn: (v: number) => number) {
    const res: Array<number> = [];
    data.forEach(({ date, value}) => {
        const id = new Date(date + '').setHours(0, 0, 0, 0);
        if (date && categories?.[id]) {
          res.push(mapFn(value));
        } else {
          res.push(res.at(-1) || 0) ;
        }
    })
    return res;
  }
}
