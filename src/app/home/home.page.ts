import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonMenu,
  IonButtons, IonLabel, IonIcon, IonList, IonItem, IonListHeader, IonSpinner
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { PostService, Post, SaludoGif } from '../services/post';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { DatabaseUsuario, Usuario } from '../services/databaseusuario';

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
  usuario?: Usuario; // 👈 guardamos el usuario completo
  listadoPosts: Post[] = [];
  saludoGif?: SaludoGif;

  constructor(
    private router: Router,
    private postService: PostService,
    private dbService: DatabaseUsuario
  ) {
    addIcons({ logOutOutline });
  }

  async ngOnInit() {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      // Obtenemos todos los usuarios y filtramos por correo
      const usuarios = await this.dbService.obtenerUsuarios();
      this.usuario = usuarios.find(u => u.correo === storedEmail);
    }

    // Cargar posts
    setTimeout(() => {
      this.postService.getPosts().subscribe(posts => {
        this.listadoPosts = posts;
      });
    }, 2000);

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

  irEditarPerfil() {
    this.router.navigateByUrl('/perfil');
  }
}
