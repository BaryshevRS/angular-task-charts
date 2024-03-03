import { Component } from '@angular/core';
import { Co2EmissionsFormComponent } from "./components/co2-emissions-form/co2-emissions-form.component";
import { CO2FormData } from "./models/co2-data.interface";
import {
  Co2EmissionsChartScatterComponent
} from "./components/co2-emissions-chart-scatter/co2-emissions-chart-scatter.component";
import {
  Co2EmissionsChartSplineComponent
} from "./components/co2-emissions-chart-spline/co2-emissions-chart-spline.component";

@Component({
  selector: 'app-co2-emissions-container',
  standalone: true,
  imports: [
    Co2EmissionsFormComponent,
    Co2EmissionsChartScatterComponent,
    Co2EmissionsChartSplineComponent
  ],
  templateUrl: './co2-emissions-container.component.html',
  styleUrl: './co2-emissions-container.component.scss'
})
export class Co2EmissionsContainerComponent {
  forms: Array<CO2FormData> = [
    {
      title: 'Введите расход угля (тонн)',
      name: 'Уголь (тонн)',
      date: 'Дата ввода данных (Уголь)'
    },
    {
      title: 'Введите расход газа (тыщ. м3)',
      name: 'Природный газ (тыщ. м3))',
      date: 'Дата ввода данных (Газ)'
    },
  ]
}
