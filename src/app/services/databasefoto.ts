import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

export interface Barrita {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string; // Base64 o ruta local
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseFoto {

  private db: SQLiteObject | null = null;

  constructor(private sqlite: SQLite, private platform: Platform) { }

  /**
   * 🧱 Crea la base de datos y la tabla "barritas"
   */
  async crearBD() {
    try {
      await this.platform.ready();

      this.db = await this.sqlite.create({
        name: 'barritas.db',
        location: 'default'
      });

      console.log("📦 Base de datos 'barritas.db' creada");

      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS barritas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          descripcion TEXT,
          precio REAL,
          imagen TEXT
        )`, []
      );

      console.log("✅ Tabla 'barritas' creada o ya existente");
    } catch (e) {
      console.error("❌ Error al crear la base de datos", e);
    }
  }

  /**
   * ➕ Inserta una barrita en la tabla
   */
  async insertarBarrita(barrita: Barrita) {
    try {
      if (!this.db) {
        console.warn('⚠️ La base de datos no está inicializada.');
        return;
      }

      const { nombre, descripcion, precio, imagen } = barrita;

      await this.db.executeSql(
        `INSERT INTO barritas (nombre, descripcion, precio, imagen)
         VALUES (?, ?, ?, ?)`,
        [nombre, descripcion, precio, imagen]
      );

      console.log(`✅ Barrita "${nombre}" insertada correctamente`);
    } catch (e) {
      console.error('❌ Error al insertar barrita', e);
    }
  }

  /**
   * 📋 Obtiene todas las barritas almacenadas
   */
  async obtenerBarritas(): Promise<Barrita[]> {
    try {
      if (!this.db) {
        console.warn('⚠️ La base de datos no está inicializada.');
        return [];
      }

      const result = await this.db.executeSql('SELECT * FROM barritas', []);
      const barritas: Barrita[] = [];

      for (let i = 0; i < result.rows.length; i++) {
        barritas.push(result.rows.item(i));
      }

      console.log(`📋 Se obtuvieron ${barritas.length} barritas`);
      return barritas;
    } catch (e) {
      console.error('❌ Error al obtener barritas', e);
      return [];
    }
  }

  /**
   * 🗑️ Elimina una barrita por su ID
   */
  async eliminarBarrita(id: number) {
    try {
      if (!this.db) {
        console.warn('⚠️ La base de datos no está inicializada.');
        return;
      }

      await this.db.executeSql('DELETE FROM barritas WHERE id = ?', [id]);
      console.log(`🗑️ Barrita con id ${id} eliminada`);
    } catch (e) {
      console.error('❌ Error al eliminar barrita', e);
    }
  }
}
