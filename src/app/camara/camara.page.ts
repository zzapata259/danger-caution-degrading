import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Database, Barrita } from '../services/database';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss']
})
export class CamaraPage {
  
  nombre = '';
  descripcion = '';
  precio: number | null = null;
  foto: string | undefined;

  constructor(private dbBarritas: Database) { }

  async tomarFoto() {
    const imagen = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    });

    this.foto = 'data:image/jpeg;base64,' + imagen.base64String;
  }

  async guardarBarrita() {
    if (!this.nombre || !this.descripcion || this.precio === null || !this.foto) {
      console.warn('⚠️ Completa todos los campos antes de guardar');
      return;
    }

    const nuevaBarrita: Barrita = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen: this.foto
    };

    await this.dbBarritas.insertarBarrita(nuevaBarrita);
    console.log('✅ Barrita guardada con foto, nombre, descripción y precio!');

    // Limpiar campos
    this.nombre = '';
    this.descripcion = '';
    this.precio = null;
    this.foto = undefined;
  }
}

