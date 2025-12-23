
from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

# CONFIGURACIÓN DE RUTAS DE BASE DE DATOS 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "fastfood.db")

def crear_base_de_datos():
    """Crea las tablas necesarias al iniciar la aplicación si no existen."""
    conexion = sqlite3.connect(db_path)
    cursor = conexion.cursor()
    
 # Tabla para el Registro de usuarios
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    
# Tabla para los Mensajes de contacto
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contactos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            email TEXT,
            asunto TEXT,
            mensaje TEXT
        )
    ''')
    
    conexion.commit()
    conexion.close()

# Inicializar la base de datos al arrancar
crear_base_de_datos()

#RUTAS

@app.route('/')
def index():
    return render_template('index.HTML')

@app.route('/menu')
def menu():
    return render_template('menú.html')

@app.route('/registro')
def registro():
    return render_template('registrarse.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.HTML')

@app.route('/promociones')
def promociones():
    return render_template('promociones.HTML')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.HTML')

# RUTAS DE LA API

@app.route('/api/contacto', methods=['POST'])
def api_contacto():
    datos = request.json
    try:
        conexion = sqlite3.connect(db_path)
        cursor = conexion.cursor()
        cursor.execute(
            "INSERT INTO contactos (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)",
            (datos['nombre'], datos['email'], datos['asunto'], datos['mensaje'])
        )
        conexion.commit()
        return jsonify({"status": "success", "mensaje": "Mensaje guardado correctamente"}), 201
    except Exception as e:
        print(f"Error en contacto: {e}")
        return jsonify({"status": "error", "mensaje": str(e)}), 500
    finally:
        conexion.close()

@app.route('/api/registrar', methods=['POST'])
def api_registrar():
    datos = request.json
    try:
        conexion = sqlite3.connect(db_path)
        cursor = conexion.cursor()
        cursor.execute(
            "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
            (datos['nombre'], datos['email'], datos['password'])
        )
        conexion.commit()
        return jsonify({"status": "success", "mensaje": "Usuario registrado con éxito"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"status": "error", "mensaje": "El correo ya está registrado"}), 400
    except Exception as e:
        print(f"Error en registro: {e}")
        return jsonify({"status": "error", "mensaje": str(e)}), 500
    finally:
        conexion.close()

# VERIFICACIÓN DE COMPRA
@app.route('/api/verificar_compra', methods=['POST'])
def verificar_compra():
    datos = request.json
    password_ingresada = datos.get('password')
    
    try:
        conexion = sqlite3.connect(db_path)
        cursor = conexion.cursor()
        
        # Buscamos si existe la contraseña en la tabla usuarios
        cursor.execute("SELECT nombre FROM usuarios WHERE password = ?", (password_ingresada,))
        usuario = cursor.fetchone()
        
        if usuario:
            # autorizamos la acción
            return jsonify({
                "status": "success", 
                "mensaje": f"¡Contraseña correcta! Producto añadido para {usuario[0]}"
            }), 200
        else:
            # rechazamos
            return jsonify({
                "status": "error", 
                "mensaje": "Contraseña incorrecta. Debes estar registrado para comprar."
            }), 401
            
    except Exception as e:
        print(f"Error en verificación: {e}")
        return jsonify({"status": "error", "mensaje": "Error interno del servidor"}), 500
    finally:
        conexion.close()

if __name__ == '__main__':
    app.run(debug=True)