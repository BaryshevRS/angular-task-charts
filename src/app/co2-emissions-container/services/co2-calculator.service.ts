import { Injectable } from '@angular/core';
import { CO2FormId } from "../models/co2-data.interface";

@Injectable()
export class Co2CalculatorService {
  calculateById = {
    [CO2FormId.Coal]: this.calculateCoalCo2,
    [CO2FormId.Gas]: this.calculateGasCo2,
  }

  private calculateGasCo2(gasConsumption: number): number {
    return Math.trunc(gasConsumption * 1.129 * 1.59);
  }

  private calculateCoalCo2(coalConsumption: number): number {
    return Math.trunc(coalConsumption * 0.768 * 2.76);
  }
}
