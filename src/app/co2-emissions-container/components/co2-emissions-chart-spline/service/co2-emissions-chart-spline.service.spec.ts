import { TestBed } from '@angular/core/testing';
import { CO2FormId } from "../../../models/co2-data.interface";
import { Co2CalculatorService } from "../../../services/co2-calculator.service";
import { Co2EmissionsChartSplineService } from "./co2-emissions-chart-spline.service";
import stringify from "json-stable-stringify";

describe('Co2EmissionsChartSplineService', () => {
  let service: Co2EmissionsChartSplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Co2EmissionsChartSplineService, Co2CalculatorService]
    });
    service = TestBed.inject(Co2EmissionsChartSplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be work', () => {
    const Co2EmissionMock = {
      [CO2FormId.Gas]: [
        {
          value: 50,
          date: '2024-03-01T01:30:00.000Z'
        },
        {
          value: 30,
          date: '2024-03-02T01:30:00.000Z'
        },
        {
          value: 37,
          date: '2024-03-03T01:30:00.000Z'
        }
      ],
      [CO2FormId.Coal]: [
        {
          value: 30,
          date: '2024-03-01T01:30:00.000Z'
        },
        {
          value: 20,
          date: '2024-03-02T01:30:00.000Z'
        },
        {
          value: 35,
          date: '2024-03-03T01:30:00.000Z'
        }
      ]
    }

    const res = {
      "series": [
        {
          "name": "Газ",
          "data": [
            89,
            53,
            66
          ]
        },
        {
          "name": "Уголь",
          "data": [
            63,
            42,
            74
          ]
        },
        {
          "name": "Общее",
          "data": [
            152,
            95,
            140
          ]
        }
      ],
      "xaxis": {
        "type": "datetime",
        "categories": [
          "2024-03-01T01:30:00.000Z",
          "2024-03-02T01:30:00.000Z",
          "2024-03-03T01:30:00.000Z"
        ]
      }
    }
    expect(JSON.stringify(service.setData(Co2EmissionMock).series)).toEqual(JSON.stringify(res.series));
    expect(JSON.stringify(service.setData(Co2EmissionMock).xaxis)).toEqual(JSON.stringify(res.xaxis));
  });

  it('should be work without Gas', () => {
    const Co2EmissionMock = {
      [CO2FormId.Gas]: [
        {
          value: 50,
          date: '2024-03-01T01:30:00.000Z'
        },
        // {
        //   value: 30,
        //   date: '2024-03-02T01:30:00.000Z'
        // },
        {
          value: 37,
          date: '2024-03-03T01:30:00.000Z'
        }
      ],
      [CO2FormId.Coal]: [
        {
          value: 30,
          date: '2024-03-01T01:30:00.000Z'
        },
        {
          value: 20,
          date: '2024-03-02T01:30:00.000Z'
        },
        {
          value: 35,
          date: '2024-03-03T01:30:00.000Z'
        }
      ]
    }

    const res = {
      "series": [
        {
          "name": "Газ",
          "data": [
            89,
            89,
            66
          ]
        },
        {
          "name": "Уголь",
          "data": [
            63,
            42,
            74
          ]
        },
        {
          "name": "Общее",
          "data": [
            152,
            131,
            140
          ]
        }
      ],
      "xaxis": {
        "type": "datetime",
        "categories": [
          "2024-03-01T01:30:00.000Z",
          "2024-03-03T01:30:00.000Z",
          "2024-03-02T01:30:00.000Z",
        ]
      }
    }
    expect(JSON.stringify(service.setData(Co2EmissionMock).series)).toEqual(JSON.stringify(res.series));
    expect((service.setData(Co2EmissionMock).xaxis)).toEqual((res.xaxis) as any);
  });
});
