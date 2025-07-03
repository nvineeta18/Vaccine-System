export interface VaccinationCenter {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber?: string;
  openingTime?: string;  // Format: "HH:mm:ss"
  closingTime?: string;  // Format: "HH:mm:ss"
  dailyCapacity: number;
  status: CenterStatus;
  vaccineStocks?: VaccineStock[];
  appointments?: Appointment[];
}

export enum CenterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISABLED = 'DISABLED'
}

export interface VaccineStock {
  id?: number;
  vaccineType: string;
  quantity: number;
  vaccinationCenter?: any;
}

export interface Appointment {
  id?: number;
  appointmentDate: string;
  vaccinationCenter?: any;
}
