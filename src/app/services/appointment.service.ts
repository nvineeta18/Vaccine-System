import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  bookAppointment(appointmentData: any): Observable<any> {
    console.log('Sending appointment request:', appointmentData);
    return this.http.post<any>(this.baseUrl, appointmentData);
  }

  getUserAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user`);
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${appointmentId}`);
  }

  // ADD THIS MISSING METHOD
  markAsCompleted(appointmentId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appointmentId}/complete`, {});
  }

  // ADD OTHER MISSING METHODS THAT MIGHT BE NEEDED
  updateAppointmentStatus(appointmentId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appointmentId}/status`, { status });
  }

  getAppointmentById(appointmentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${appointmentId}`);
  }

  rescheduleAppointment(appointmentId: number, newDate: string, newTime: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appointmentId}/reschedule`, {
      appointmentDate: newDate,
      appointmentTime: newTime
    });
  }
}
