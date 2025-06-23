import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, AppointmentRequest } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  bookAppointment(appointment: AppointmentRequest): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, appointment);
  }

  getUserAppointments(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/user/${userId}`);
  }

  getCenterAppointments(centerId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/center/${centerId}`);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
  }

  markAsCompleted(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/complete`, {});
  }
}
