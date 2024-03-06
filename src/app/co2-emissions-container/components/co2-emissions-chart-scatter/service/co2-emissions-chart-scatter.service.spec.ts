import { TestBed } from '@angular/core/testing';
import { Co2EmissionsChartScatterService } from "./co2-emissions-chart-scatter.service";
import { CO2FormId } from "../../../models/co2-data.interface";
import { Co2CalculatorService } from "../../../services/co2-calculator.service";

describe('Co2EmissionsChartScatterService', () => {
  let service: Co2EmissionsChartScatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Co2EmissionsChartScatterService, Co2CalculatorService]
    });
    service = TestBed.inject(Co2EmissionsChartScatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
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

    const res = [
      {
        "type": "scatter",
        "name": "Газ",
        "symbolSize": 10,
        "color": "blue",
        "data": [
          {
            "name": "2024-03-01T01:30:00.000Z",
            "value": [
              "2024-03-01T01:30:00.000Z",
              89
            ]
          },
          {
            "name": "2024-03-02T01:30:00.000Z",
            "value": [
              "2024-03-02T01:30:00.000Z",
              53
            ]
          },
          {
            "name": "2024-03-03T01:30:00.000Z",
            "value": [
              "2024-03-03T01:30:00.000Z",
              66
            ]
          }
        ]
      },
      {
        "type": "scatter",
        "name": "Уголь",
        "symbolSize": 10,
        "color": "green",
        "data": [
          {
            "name": "2024-03-01T01:30:00.000Z",
            "value": [
              "2024-03-01T01:30:00.000Z",
              63
            ]
          },
          {
            "name": "2024-03-02T01:30:00.000Z",
            "value": [
              "2024-03-02T01:30:00.000Z",
              42
            ]
          },
          {
            "name": "2024-03-03T01:30:00.000Z",
            "value": [
              "2024-03-03T01:30:00.000Z",
              74
            ]
          }
        ]
      },
      {
        "type": "scatter",
        "name": "Общее",
        "symbolSize": 10,
        "color": "orange",
        "data": [
          {
            "name": "2024-03-01T01:30:00.000Z",
            "value": [
              "2024-03-01T01:30:00.000Z",
              152
            ]
          },
          {
            "name": "2024-03-02T01:30:00.000Z",
            "value": [
              "2024-03-02T01:30:00.000Z",
              95
            ]
          },
          {
            "name": "2024-03-03T01:30:00.000Z",
            "value": [
              "2024-03-03T01:30:00.000Z",
              140
            ]
          }
        ]
      }
    ]
    expect(JSON.stringify(service.setData(Co2EmissionMock).series)).toEqual(JSON.stringify(res));
  });
});
