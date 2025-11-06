import { Component, OnInit } from '@angular/core';
import { BarritasExtranjerasService } from '../services/databasebarritasextranjeras';
import { Barrita } from '../services/database';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonGrid, IonRow, IonCol, IonIcon, IonText, IonSpinner
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barritas-extranjeras',
  templateUrl: './barritas-extranjeras.page.html',
  styleUrls: ['./barritas-extranjeras.page.scss'],
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
    IonText,
    IonSpinner
  ]
})
export class BarritasExtranjerasPage implements OnInit {

  barritas: Barrita[] = [];
  cargando = false;

  constructor(private api: BarritasExtranjerasService) {}

  ngOnInit() {
    this.obtenerBarritas();
  }

  obtenerBarritas() {
    this.cargando = true;
    this.api.obtenerTodas().subscribe({
      next: (data) => {
        this.barritas = data;
        this.cargando = false;
        console.log("✅ Barritas extranjeras obtenidas:", data);
      },
      error: (err) => {
        this.cargando = false;
        console.error("❌ Error al cargar barritas extranjeras:", err);
      }
    });
  }
}
