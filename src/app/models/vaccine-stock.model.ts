// REMOVE: import { VaccinationCenter } from './vaccination-center.model';

export interface VaccineStock {
  id?: number;
  vaccineType: string;
  quantity: number;
  expiryDate?: string;
  // REMOVE: vaccinationCenter?: VaccinationCenter;
  vaccinationCenter?: any;  // Change to any
}
