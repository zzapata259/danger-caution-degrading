import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface SaludoGif {
  mensaje: string;
  gif: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {  // ✅ cambio de nombre aquí

  private mockUrl = "https://demo8984564.mockable.io/barritasextranjeras"; // ✅ usa HTTPS
  private urlSaludo = "https://demo8984564.mockable.io/saludoGif"; // ✅ usa HTTPS

  constructor(private http: HttpClient) {}

  // Obtener las barritas desde tu Mock
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.mockUrl);
  }

  getSaludoGif(): Observable<SaludoGif> {
    return this.http.get<SaludoGif>(this.urlSaludo);
  }
}
