import { VaccinationCenter } from './vaccination-center.model';

export interface VaccineStock {
  id?: number;
  vaccinationCenter?: VaccinationCenter;
  vaccineType: string;
  availableStock: number;
  lastUpdated?: string;
}
