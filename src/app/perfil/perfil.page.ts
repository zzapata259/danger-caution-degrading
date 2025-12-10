import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonToast } from '@ionic/angular/standalone';
import { DatabaseUsuario, Usuario } from '../services/databaseusuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonItem, IonToast]
})
export class PerfilPage implements OnInit {

  usuario?: Usuario;

  // Campos editables
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  password: string = '';
  edad?: number;

  // Toast
  isToastOpen: boolean = false;
  toastMessage: string = '';

  constructor(private dbService: DatabaseUsuario, private router: Router) { }

  async ngOnInit() {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      const usuarios = await this.dbService.obtenerUsuarios();
      this.usuario = usuarios.find(u => u.correo === storedEmail);

      if (this.usuario) {
        // Inicializamos los campos con los datos actuales
        this.nombre = this.usuario.nombre || '';
        this.apellido = this.usuario.apellido || '';
        this.correo = this.usuario.correo || '';
        this.password = this.usuario.password || '';
        this.edad = this.usuario.edad;
      }
    }
  }

  async guardarCambios() {
    if (!this.usuario) return;

    try {
      await this.dbService.editarUsuario({
        id: this.usuario.id,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        password: this.password,
        edad: this.edad
      });

      this.toastMessage = 'Usuario actualizado con éxito';
      this.isToastOpen = true;

      // Actualizar sessionStorage con el nuevo correo si cambió
      sessionStorage.setItem('userEmail', this.correo);

      // Redirigir al Home después de un momento
      setTimeout(() => this.router.navigateByUrl('/home'), 1500);

    } catch (e) {
      console.error(e);
      this.toastMessage = 'Error al actualizar usuario';
      this.isToastOpen = true;
    }
  }
}
