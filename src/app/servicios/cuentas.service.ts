import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cuenta {
  id?: number;
  nombre: string;
  tipo: string;
  moneda: string;
  usuario: string;
}

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  private apiUrl = 'http://localhost:3000/cuentas'; 
  private http = inject(HttpClient);

  getCuentas(): Observable<Cuenta[]> {
    var response = this.http.get<Cuenta[]>(this.apiUrl);
    return this.http.get<Cuenta[]>(this.apiUrl);
  }

  createCuenta(custo: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(this.apiUrl, custo);
  }

  deletCuenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}