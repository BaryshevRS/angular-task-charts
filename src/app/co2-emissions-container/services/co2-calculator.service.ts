import { Injectable } from '@angular/core';

@Injectable()
export class Co2CalculatorService {
  calculateGasCo2(gasConsumption: number): number {
    return Math.trunc(gasConsumption * 1.129 * 1.59);
  }

  calculateCoalCo2(coalConsumption: number): number {
    return Math.trunc(coalConsumption * 0.768 * 2.76);
  }
}
