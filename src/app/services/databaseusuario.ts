import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


/**
 * 🧑‍💻 Interfaz para representar un usuario
 */
export interface Usuario {
  id: number;
  nombre?: string;
  apellido?: string;
  edad?: number;
  correo: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class DatabaseUsuario {

  private db: SQLiteObject | null = null;

  constructor(private sqlite: SQLite, private platform: Platform) {}

  /**
   * 🧱 Crea la base de datos y la tabla "usuarios"
   */
  async crearBDUsuario() {
    try {
      await this.platform.ready();

      this.db = await this.sqlite.create({
        name: 'usuarios.db',
        location: 'default'
      });

      console.log("📦 Base de datos 'usuarios.db' creada");

      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          apellido TEXT,
          edad INTEGER,
          correo TEXT UNIQUE,
          password TEXT
        )`, []
      );


      console.log("✅ Tabla 'usuarios' creada o ya existente");
    } catch (e) {
      console.error("❌ Error al crear la base de datos de usuarios", e);
    }
  }

/**
 * ✏️ Edita un usuario por su ID
 */
async editarUsuario(usuario: Usuario) {
  try {
    if (!this.db) {
      console.warn('⚠️ La base de datos no está inicializada.');
      return false;
    }

    const { id, nombre, apellido, edad, correo, password } = usuario;

    const sql = `
      UPDATE usuarios
      SET nombre = ?, apellido = ?, edad = ?, correo = ?, password = ?
      WHERE id = ?
    `;

    const result = await this.db.executeSql(sql, [
      nombre, apellido, edad, correo, password, id
    ]);

    console.log(`✏️ Usuario con id ${id} actualizado correctamente`);
    return result;

  } catch (e) {
    console.error('❌ Error al editar usuario', e);
    return false;
  }
}



  /**
   * ➕ Inserta un nuevo usuario
   */
  async insertarUsuario(usuario: Usuario) {
  try {
    if (!this.db) {
      console.warn('⚠️ La base de datos de usuarios no está inicializada.');
      return;
    }

    const { nombre, apellido, edad, correo, password } = usuario;

    await this.db.executeSql(
      `INSERT INTO usuarios (nombre, apellido, edad, correo, password)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, apellido, edad, correo, password]
    );

    console.log(`✅ Usuario "${nombre} ${apellido}" insertado correctamente`);
  } catch (e) {
    console.error('❌ Error al insertar usuario', e);
  }
}


  /**
   * 🔍 Verifica si un usuario existe con correo y contraseña
   */
  async verificarUsuario(correo: string, password: string): Promise<boolean> {
    try {
      if (!this.db) {
        console.warn('⚠️ La base de datos de usuarios no está inicializada.');
        return false;
      }

      const result = await this.db.executeSql(
        `SELECT * FROM usuarios WHERE correo = ? AND password = ?`,
        [correo, password]
      );

      return result.rows.length > 0;
    } catch (e) {
      console.error('❌ Error al verificar usuario', e);
      return false;
    }
  }

  /**
   * 📋 Obtiene todos los usuarios (solo para depuración)
   */
  async obtenerUsuarios(): Promise<Usuario[]> {
  try {
    if (!this.db) return [];

    const result = await this.db.executeSql('SELECT * FROM usuarios', []);
    const usuarios: Usuario[] = [];

    for (let i = 0; i < result.rows.length; i++) {
      usuarios.push(result.rows.item(i));
    }

    return usuarios;

  } catch (e) {
    console.error('❌ Error al obtener usuarios', e);
    return [];
  }
}


  /**
   * 🗑️ Elimina un usuario por su ID
   */
  async eliminarUsuario(id: number) {
    try {
      if (!this.db) {
        console.warn('⚠️ La base de datos no está inicializada.');
        return;
      }

      await this.db.executeSql('DELETE FROM usuarios WHERE id = ?', [id]);
      console.log(`🗑️ Usuario con id ${id} eliminado`);
    } catch (e) {
      console.error('❌ Error al eliminar usuario', e);
    }
  }
  async verificarUsuarioRetornaUsuario(correo: string, password: string): Promise<Usuario | null> {
  try {
    if (!this.db) return null;

    const result = await this.db.executeSql(
      `SELECT * FROM usuarios WHERE correo = ? AND password = ?`,
      [correo, password]
    );

    if (result.rows.length === 0) return null;

    return result.rows.item(0);

  } catch (e) {
    console.error("❌ Error al verificar usuario", e);
    return null;
  }
}

}
