import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonGrid, IonRow, IonCol, IonIcon, IonText
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { Database, Barrita } from 'src/app/services/database';

@Component({
  selector: 'app-barrita',
  templateUrl: './barrita.page.html',
  styleUrls: ['./barrita.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonText
  ]
})
export class BarritaPage implements OnInit {
  barritas: Barrita[] = [];
  carrito: Barrita[] = [];

  constructor(
    private toastCtrl: ToastController,
    private database: Database,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log('🟢 Iniciando BarritaPage...');
    await this.database.crearBD();
    await this.cargarBarritas();
  }

  async ionViewWillEnter() {
    await this.cargarBarritas();
  }

  async cargarBarritas() {
    try {
      this.barritas = await this.database.obtenerTodasBarritas();
      console.log('🍫 Barritas cargadas:', this.barritas);

      if (this.barritas.length === 0) {
        console.warn('⚠️ No se encontraron barritas, insertando ejemplos...');
        await this.insertarEjemplo();
        this.barritas = await this.database.obtenerTodasBarritas();
      }
    } catch (e) {
      console.error('❌ Error al cargar barritas:', e);
    }
  }

  async insertarEjemplo() {
    const ejemplos: Barrita[] = [
      {
        id: 0,
        nombre: 'Barrita de Chocolate',
        descripcion: 'Proteína sabor chocolate',
        precio: 1200,
        imagen: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png'
      },
      {
        id: 0,
        nombre: 'Barrita de Maní',
        descripcion: 'Alta en proteínas y baja en azúcar',
        precio: 1000,
        imagen: 'https://cdn-icons-png.flaticon.com/512/415/415733.png'
      },
      {
        id: 0,
        nombre: 'Barrita de Avena',
        descripcion: 'Ideal para energía duradera',
        precio: 1100,
        imagen: 'https://cdn-icons-png.flaticon.com/512/415/415734.png'
      }
    ];

    for (let b of ejemplos) {
      await this.database.insertarBarrita(b);
    }

    console.log('✅ Ejemplos insertados en la base de datos');
  }

  async agregarAlCarrito(barrita: Barrita) {
    this.carrito.push(barrita);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    const toast = await this.toastCtrl.create({
      message: `${barrita.nombre} agregada al carrito`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  // 🔹 Navegar al carrito
  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  // 🔹 Volver al Home
  irAlHome() {
    this.router.navigate(['/home']);
  }
  irABarritasExtranjeras() {
    this.router.navigate(['/barritas-extranjeras']);
  }
}
