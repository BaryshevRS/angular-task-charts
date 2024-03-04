export interface Co2Data {
  value: number;
  date: string | null;
}

export enum CO2FormId {
  Coal = 'coal',
  Gas = 'gas'
}

export interface CO2FormData {
  title: string;
  name: string;
  date: string;
  id: CO2FormId
}
