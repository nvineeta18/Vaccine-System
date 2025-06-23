export interface VaccinationCenter {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber?: string;
  openingTime?: string;
  closingTime?: string;
  dailyCapacity: number;
  status: 'ACTIVE' | 'INACTIVE' | 'DISABLED';
}
