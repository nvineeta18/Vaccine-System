import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VaccinationCenter } from '../models/vaccination-center.model';

@Injectable({
  providedIn: 'root'
})
export class VaccinationCenterService {
  private baseUrl = 'http://localhost:8080/api/centers';

  constructor(private http: HttpClient) {}

  createCenter(center: VaccinationCenter): Observable<VaccinationCenter> {
    return this.http.post<VaccinationCenter>(this.baseUrl, center);
  }

  getAllCenters(): Observable<VaccinationCenter[]> {
    return this.http.get<VaccinationCenter[]>(this.baseUrl);
  }

  getActiveCenters(): Observable<VaccinationCenter[]> {
    return this.http.get<VaccinationCenter[]>(`${this.baseUrl}/active`);
  }

  getCenterById(id: number): Observable<VaccinationCenter> {
    return this.http.get<VaccinationCenter>(`${this.baseUrl}/${id}`);
  }

  updateCenter(id: number, center: VaccinationCenter): Observable<VaccinationCenter> {
    return this.http.put<VaccinationCenter>(`${this.baseUrl}/${id}`, center);
  }

  deleteCenter(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  disableCenter(id: number): Observable<VaccinationCenter> {
    return this.http.put<VaccinationCenter>(`${this.baseUrl}/${id}/disable`, {});
  }

  enableCenter(id: number): Observable<VaccinationCenter> {
    return this.http.put<VaccinationCenter>(`${this.baseUrl}/${id}/enable`, {});
  }

  searchByCity(city: string): Observable<VaccinationCenter[]> {
    return this.http.get<VaccinationCenter[]>(`${this.baseUrl}/search/city/${city}`);
  }

  searchByPincode(pincode: string): Observable<VaccinationCenter[]> {
    return this.http.get<VaccinationCenter[]>(`${this.baseUrl}/search/pincode/${pincode}`);
  }
}
