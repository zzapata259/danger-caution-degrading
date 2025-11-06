import { Routes } from '@angular/router';
import { guardGuard } from './auth/guard-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto.page').then( m => m.ContactoPage)
  },
  {
  path: 'login',
  loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  canActivate: [guardGuard]  // <--- aquí
},

  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  
  {
    path: 'ejercicios-dia',
    loadComponent: () => import('./ejercicios-dia/ejercicios-dia.page').then( m => m.EjerciciosDiaPage)
  },
  {
    path: 'ejercicios-tarde',
    loadComponent: () => import('./ejercicios-tarde/ejercicios-tarde.page').then( m => m.EjerciciosTardePage)
  },
  {
    path: 'ejercicios-noche',
    loadComponent: () => import('./ejercicios-noche/ejercicios-noche.page').then( m => m.EjerciciosNochePage)
  },
  {
    path: 'barrita',
    loadComponent: () => import('./barrita/barrita.page').then( m => m.BarritaPage)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.page').then( m => m.CarritoPage)
  },
  {
    path: 'admin-barritas',
    loadComponent: () => import('./barrita/admin-barritas/admin-barritas.page').then( m => m.AdminBarritasPage)
  },
  {
    path: 'camara',
    loadComponent: () => import('./camara/camara.page').then( m => m.CamaraPage)
  },
  {
    path: 'barritas-extranjeras',
    loadComponent: () => import('./barritas-extranjeras/barritas-extranjeras.page').then( m => m.BarritasExtranjerasPage)

  },



];
