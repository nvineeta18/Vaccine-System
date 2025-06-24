import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VaccineStock } from '../models/vaccine-stock.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineStockService {
  private baseUrl = 'http://localhost:8080/api/vaccine-stocks';

  constructor(private http: HttpClient) {}

  addOrUpdateStock(centerId: number, vaccineType: string, quantity: number): Observable<any> {
    // Create clean HTTP parameters
    const params = new HttpParams()
      .set('vaccineType', vaccineType)
      .set('quantity', quantity.toString());

    const url = `${this.baseUrl}/center/${centerId}`;
    
    console.log('🚀 Making request to:', url);
    console.log('📋 Parameters:', { vaccineType, quantity });
    
    // Send empty body with parameters
    return this.http.post<any>(url, {}, { params });
  }

  getCenterStocks(centerId: number): Observable<VaccineStock[]> {
    return this.http.get<VaccineStock[]>(`${this.baseUrl}/center/${centerId}`);
  }

  getAllStocks(): Observable<VaccineStock[]> {
    return this.http.get<VaccineStock[]>(this.baseUrl);
  }

  deleteStock(stockId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${stockId}`);
  }
}
