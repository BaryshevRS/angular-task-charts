import { Injectable } from '@angular/core';
import { Co2CalculatorService } from "../../../services/co2-calculator.service";
import { Co2Data, CO2FormId } from "../../../models/co2-data.interface";
import { CO2EmissionTitle } from "../../../consts";
import { ApexAxisChartSeries, ApexXAxis } from "ng-apexcharts";

@Injectable()
export class Co2EmissionsChartSplineService {

  constructor(private co2CalculatorService: Co2CalculatorService) {
  }

  setData(data: Record<CO2FormId, Array<Co2Data>>): {
    series: ApexAxisChartSeries;
    xaxis: ApexXAxis;
  } {
    const categories = this.getCategories(data);
    const categoriesOrdered  = Object.keys(categories).sort((a, b) => +a - +b)
    const gas = this.getSeries(data[CO2FormId.Gas], categoriesOrdered, this.co2CalculatorService.calculateById[CO2FormId.Gas]);
    const coal = this.getSeries(data[CO2FormId.Coal], categoriesOrdered, this.co2CalculatorService.calculateById[CO2FormId.Coal]);

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
    console.error('{ series, xaxis }', {series, xaxis})
    return {series, xaxis}
  }

  getCategories(data: Record<CO2FormId, Array<Co2Data>>): Record<number, string> {
    const mergedValues = Object.values(data).reduce((a, v) => {
      return [...a, ...v];
    }, []);

    return mergedValues.reduce((a: Record<number, string>, {date}) => {
      const id = new Date(date + '').setHours(0, 0, 0, 0);
      return {...a, [id]: date + ''}
    }, {})
  }

  getSeries(data: Array<Co2Data>, categories: string[], mapFn: (v: number) => number) {
    data.sort((a, b) => +new Date(a.date + '') - +new Date(b.date + ''));
    const dataMap = new Map<number, Co2Data>();

    data.forEach(({date, value}) => {
      const id = new Date(date + '').setHours(0, 0, 0, 0);
      dataMap.set(id, { date, value });
    })

    const res: Array<number> = [];
    categories.forEach((id) => {
      if (dataMap.has(+id)) {
        res.push(mapFn(dataMap.get(+id)!.value));
      } else {
        res.push(res.at(-1) || 0);
      }
    })
    return res;
  }
}
