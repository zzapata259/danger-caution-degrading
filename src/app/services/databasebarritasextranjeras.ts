import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barrita } from '../services/database'; // reusamos la interfaz

@Injectable({
  providedIn: 'root'
})
export class BarritasExtranjerasService {
  private baseUrl = 'http://localhost:3000/barritas_extranjeras'; 
  // ⚠️ Si usas emulador Android, cambia a:
  // private baseUrl = 'http://10.0.2.2:3000barritas_extranjeras';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Barrita[]> {
    return this.http.get<Barrita[]>(this.baseUrl);
  }

  insertar(barrita: Barrita): Observable<Barrita> {
    return this.http.post<Barrita>(this.baseUrl, barrita);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
