import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VaccineStock } from '../models/vaccine-stock.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineStockService {
  private baseUrl = 'http://localhost:8080/api/vaccine-stocks';

  constructor(private http: HttpClient) {}

  addOrUpdateStock(centerId: number, vaccineType: string, quantity: number): Observable<VaccineStock> {
    return this.http.post<VaccineStock>(`${this.baseUrl}/center/${centerId}?vaccineType=${vaccineType}&quantity=${quantity}`, {});
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
