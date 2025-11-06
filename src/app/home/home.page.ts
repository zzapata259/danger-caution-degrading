import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenu,
  IonButtons, IonLabel, IonIcon, IonList, IonItem, IonListHeader, IonSpinner
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { PostService, Post, SaludoGif,  } from '../services/post'; // ✅ Cambio aquí
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonMenu, IonMenuButton, IonLabel,
    IonIcon, IonList, IonItem, IonListHeader, RouterModule,IonSpinner
  ]
})
export class HomePage {
  email: string = "";
  listadoPosts: Post[] = [];
  saludoGif?: SaludoGif; // ← uso seguro (opcional)

  constructor(private router: Router, private postService: PostService) { // ✅ cambio aquí
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) this.email = storedEmail;

    // Cargar posts (de JSONPlaceholder)
    setTimeout(() => {
      this.postService.getPosts().subscribe(posts => {
        this.listadoPosts = posts;
      });
    }, 2000);

    // Cargar saludo animado (de Mockable)
    this.postService.getSaludoGif().subscribe({
      next: (data) => this.saludoGif = data,
      error: (err) => console.error('Error al obtener saludo GIF', err)
    });

    this.postService.getPosts().subscribe(posts => {
      this.listadoPosts = posts;
    });
    
  }
  

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    console.log('Cerrando sesión...');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
