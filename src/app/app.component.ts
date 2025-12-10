import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { Platform } from '@ionic/angular';

// 👉 Importa TODOS tus servicios de BD
import { DatabaseUsuario } from './services/databaseusuario';
import { DatabaseCompra } from './services/databasecompra';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HttpClientModule],
})
export class AppComponent {

  constructor(
    private platform: Platform,

    // 👉 Aquí inyectas todas las BD que vayas a usar
    private dbUsuario: DatabaseUsuario,

    private dbCompra: DatabaseCompra,

  ) {
    this.initialize();
  }

  async initialize() {
    await this.platform.ready();

    // 👉 Inicializas todas las BD necesarias
    await this.dbUsuario.crearBDUsuario();

    await this.dbCompra.crearBD();


    console.log("🔥 Todas las bases de datos han sido inicializadas correctamente");
  }
}
