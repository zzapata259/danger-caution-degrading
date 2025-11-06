import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader,IonToolbar,IonTitle,IonContent,IonMenuButton,IonMenu,IonButtons,IonLabel, IonIcon,IonList,IonItem,IonListHeader,IonButton,
IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonChip, IonAvatar,IonNote,} from '@ionic/angular/standalone';
import { Barrita, Database } from 'src/app/services/database';
import { RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-barritas',
  templateUrl: './admin-barritas.page.html',
  styleUrls: ['./admin-barritas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Ionic components
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonLabel,
    IonIcon,
    IonList,
    IonItem,
    IonListHeader,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonAvatar,
    IonNote,
  ],
})
export class AdminBarritasPage implements OnInit {

  barritas: Barrita[] = [];

  // Variables para un formulario simple
  nuevaBarrita: Partial<Barrita> = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: ''
  };

  constructor(
    private database: Database,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.inicializarBD();
  }

  async inicializarBD() {
    await this.database.crearBD();
    this.barritas = await this.database.obtenerTodasBarritas();
  
    // Si la tabla está vacía, insertamos 4 barritas de ejemplo
    if (this.barritas.length === 0) {
      const barritasIniciales = [
        {
          nombre: 'Barrita ChocoPower',
          descripcion: 'Deliciosa barrita de chocolate con 20g de proteína.',
          precio: 1200,
          imagen: 'https://cdn-icons-png.flaticon.com/512/415/415733.png'
        },
        {
          nombre: 'Barrita Frutos Rojos',
          descripcion: 'Con avena, frutos secos y proteína vegetal.',
          precio: 1000,
          imagen: 'https://cdn-icons-png.flaticon.com/512/706/706195.png'
        },
        {
          nombre: 'Barrita Vainilla Crunch',
          descripcion: 'Crujiente y suave con sabor a vainilla natural.',
          precio: 1300,
          imagen: 'https://cdn-icons-png.flaticon.com/512/706/706164.png'
        },
        {
          nombre: 'Barrita Tropical Fit',
          descripcion: 'Sabor mango-piña con proteína y fibra.',
          precio: 1500,
          imagen: 'https://cdn-icons-png.flaticon.com/512/706/706151.png'
        }
      ];
  
      for (const b of barritasIniciales) {
        await this.database.insertarBarrita(b as any);
      }
  
      // Volvemos a cargar las barritas
      this.barritas = await this.database.obtenerTodasBarritas();
  
      const toast = await this.toastCtrl.create({
        message: '✅ Barritas iniciales agregadas automáticamente.',
        duration: 2500,
        color: 'success'
      });
      toast.present();
    }
  }
  

  // 🆕 Método para insertar una nueva barrita
  async insertarBarrita() {
    try {
      // Validación básica
      if (!this.nuevaBarrita.nombre || !this.nuevaBarrita.descripcion || !this.nuevaBarrita.precio) {
        const toast = await this.toastCtrl.create({
          message: 'Por favor, completa todos los campos.',
          duration: 2000,
          color: 'warning'
        });
        toast.present();
        return;
      }

      // Convierte Partial<Barrita> a Barrita, omitiendo el id porque es autoincremental
      const barritaToInsert: Omit<Barrita, 'id'> = {
        nombre: this.nuevaBarrita.nombre,
        descripcion: this.nuevaBarrita.descripcion,
        precio: this.nuevaBarrita.precio,
        imagen: this.nuevaBarrita.imagen || ''
      };

      // Inserta en la base de datos
      await this.database.insertarBarrita(barritaToInsert as Barrita);

      // Recarga la lista para actualizar la vista
      this.barritas = await this.database.obtenerTodasBarritas();

      // Limpia el formulario
      this.nuevaBarrita = { nombre: '', descripcion: '', precio: 0, imagen: '' };

      const toast = await this.toastCtrl.create({
        message: 'Barrita insertada correctamente.',
        duration: 2000,
        color: 'success'
      });
      toast.present();

    } catch (error) {
      console.error('Error al insertar barrita:', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al insertar barrita.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
