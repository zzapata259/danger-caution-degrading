import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DatabaseUsuario } from '../services/databaseusuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonItem, IonInput, IonButton, IonToast]
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  edad!: number; // número
  correo: string = '';
  password: string = '';
  isToastOpen: boolean = false;
  toastMessage: string = '';

  constructor(
    private dbService: DatabaseUsuario,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.dbService.crearBDUsuario();
  }

  async register() {
    if (!this.nombre || !this.apellido || !this.edad || !this.correo || !this.password) {
      this.toastMessage = 'Debe llenar todos los campos';
      this.isToastOpen = true;
      return;
    }

    try {
      await this.dbService.insertarUsuario({
        id: 0, // SQLite autoincrementa
        nombre: this.nombre,
        apellido: this.apellido,
        edad: this.edad,
        correo: this.correo,
        password: this.password
      });

      this.toastMessage = 'Usuario registrado con éxito';
      this.isToastOpen = true;

      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 1500);

    } catch (e) {
      this.toastMessage = 'Error al registrar usuario (correo duplicado?)';
      this.isToastOpen = true;
      console.error(e);
    }
  }
}

