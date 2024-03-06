import { Injectable } from '@angular/core';
import { Co2CalculatorService } from "../../../services/co2-calculator.service";
import { Co2Data, CO2FormId } from "../../../models/co2-data.interface";
import { EChartsOption } from "echarts";
import { CO2EmissionTitle } from "../../../consts";

@Injectable()
export class Co2EmissionsChartScatterService {

  constructor(private co2CalculatorService: Co2CalculatorService) {
  }

  setData(data: Record<CO2FormId, Array<Co2Data>>): EChartsOption {
    data = this.calculateGasCo2(data);

    return {
      series: [
        {
          type: 'scatter',
          name: CO2EmissionTitle[CO2FormId.Gas],
          symbolSize: 10,
          color: 'blue',
          data: data[CO2FormId.Gas].map(item => ({
            // Имя точки (может использоваться для всплывающих подсказок)
            name: item.date,
            // Значение точки, где первый элемент - дата, а второй - значение
            value: [new Date(item.date + ''), item.value]
          }))
        },
        {
          type: 'scatter',
          name: CO2EmissionTitle[CO2FormId.Coal],
          symbolSize: 10,
          color: 'green',
          data: data[CO2FormId.Coal].map(item => ({
            // Имя точки (может использоваться для всплывающих подсказок)
            name: item.date,
            // Значение точки, где первый элемент - дата, а второй - значение
            value: [new Date(item.date + ''), item.value]
          }))
        },
        {
          type: 'scatter',
          name: CO2EmissionTitle.all,
          symbolSize: 10,
          color: 'orange',
          data: this.mergeAll(data).map(item => ({
            // Имя точки (может использоваться для всплывающих подсказок)
            name: item.date,
            // Значение точки, где первый элемент - дата, а второй - значение
            value: [new Date(item.date + ''), item.value]
          }))
        },
      ]
    } as EChartsOption
  }

  calculateGasCo2(data: Record<CO2FormId, Array<Co2Data>>): Record<CO2FormId, Array<Co2Data>> {
    const res = {} as Record<CO2FormId, Array<Co2Data>>
    for (let id in data) {
      if (Object.prototype.hasOwnProperty.call(data, id)) {
        const typedId = id as CO2FormId;
        res[typedId] = data[typedId].map((item) => ({ ...item, value: this.co2CalculatorService.calculateById[typedId](item.value)}));
      }
    }
    return res;
  }

  mergeAll(data: Record<CO2FormId, Array<Co2Data>>): Array<Co2Data> {
    const mergedValues =  Object.values(data).reduce((a, v) => {
      return [...a, ...v];
    }, [])

    const group: Record<number, Co2Data> = mergedValues.reduce((a: Record<number, Co2Data>, {date, value}) => {
      const id = new Date(date + '').setHours(0, 0, 0, 0);
      let sum = value;
      if (a[id]) {
        sum = a[id].value + sum;
      }
      return { ...a, [id]: { date, value: sum }}
    }, {})

    return Object.entries(group).reduce((a: Array<Co2Data>, [,v]) => {
      a.push(v);
      return a;
    }, [])
  }
}
