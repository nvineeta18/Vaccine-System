export interface Appointment {
  id?: number;
  user?: any;
  vaccinationCenter?: any;
  appointmentDate: string;
  appointmentTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  vaccineType: string;
  createdAt?: string;
  vaccinatedAt?: string;
  certificateNumber?: string;
}

export interface AppointmentRequest {
  userId: number;
  vaccinationCenterId: number;
  appointmentDate: string;
  appointmentTime: string;
  vaccineType: string;
}
