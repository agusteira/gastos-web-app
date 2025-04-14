import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Gasto {
  id?: number;
  fecha: Date;
  descripcion: string;
  monto: number;
  categoria: string;
  usuario: string;
  moneda: string;
  TipoTransaccion: string;
  cuenta:string;
}

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private apiUrl = 'http://localhost:3000/gastos'; // Asegúrate de que tu backend esté corriendo

  private http = inject(HttpClient); // Inyección de dependencia en standalone

  getGastos(): Observable<Gasto[]> {
    var response = this.http.get<Gasto[]>(this.apiUrl);
    return this.http.get<Gasto[]>(this.apiUrl);
  }

  createGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(this.apiUrl, gasto);
  }

  deleteGasto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}