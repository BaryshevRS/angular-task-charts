import { Component } from '@angular/core';
import { Co2EmissionsFormComponent } from "./components/co2-emissions-form/co2-emissions-form.component";
import { Co2Data, CO2FormData, CO2FormId } from "./models/co2-data.interface";
import {
  Co2EmissionsChartScatterComponent
} from "./components/co2-emissions-chart-scatter/co2-emissions-chart-scatter.component";
import {
  Co2EmissionsChartSplineComponent
} from "./components/co2-emissions-chart-spline/co2-emissions-chart-spline.component";
import { Co2CalculatorService } from "./services/co2-calculator.service";
import { CO2EmissionsStore } from "./store/co2-emissions.state";

@Component({
  selector: 'app-co2-emissions-container',
  standalone: true,
  imports: [
    Co2EmissionsFormComponent,
    Co2EmissionsChartScatterComponent,
    Co2EmissionsChartSplineComponent
  ],
  providers: [
    CO2EmissionsStore
  ],
  templateUrl: './co2-emissions-container.component.html',
  styleUrl: './co2-emissions-container.component.scss'
})
export class Co2EmissionsContainerComponent {
  forms: Array<CO2FormData> = [
    {
      title: 'Введите расход угля (тонн)',
      name: 'Уголь (тонн)',
      date: 'Дата ввода данных (Уголь)',
      id: CO2FormId.Coal
    },
    {
      title: 'Введите расход газа (тыщ. м3)',
      name: 'Природный газ (тыщ. м3))',
      date: 'Дата ввода данных (Газ)',
      id: CO2FormId.Gas
    },
  ]

  constructor(public store: CO2EmissionsStore) {
  }

}
