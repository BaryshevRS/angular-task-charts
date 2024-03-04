import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Co2Data, CO2FormId } from "../models/co2-data.interface";

class CO2EmissionsState {
  [CO2FormId.Gas]: Array<Co2Data> = [
    {
      value: 50,
      date: '2024-01-19T01:30:00.000Z'
    },
    {
      value: 30,
      date: '2024-01-20T01:30:00.000Z'
    },
    {
      value: 37,
      date: '2024-01-21T01:30:00.000Z'
    }
  ];
  [CO2FormId.Coal]: Array<Co2Data> = [
    {
      value: 30,
      date: '2024-01-19T01:30:00.000Z'
    },
    {
      value: 20,
      date: '2024-01-20T01:30:00.000Z'
    },
    {
      value: 35,
      date: '2024-01-21T01:30:00.000Z'
    }
  ]
}

@Injectable()
export class CO2EmissionsStore extends ComponentStore<CO2EmissionsState> {
  public chartData = this.selectSignal<Record<CO2FormId, Array<Co2Data>>>((state) => ({
    [CO2FormId.Gas]: state[CO2FormId.Gas],
    [CO2FormId.Coal]: state[CO2FormId.Coal],
  }));

  constructor() {
    super(new CO2EmissionsState());
  }


  setChartData(data: Co2Data, id: CO2FormId) {
    this.patchState({[id] : [ ...this.get()[id], data ]})
  }
}
