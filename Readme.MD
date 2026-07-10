# CRUD Usuarios – API REST (Back-End)

API REST desarrollada con Node.js, Express y MongoDB para la gestión de usuarios (CRUD), con autenticación mediante JWT y login con Google (OAuth 2.0).

Práctica 3 – Desarrollo Web – UNEMI.

## Tecnologías

- Node.js + Express
- MongoDB (Mongoose)
- JSON Web Token (JWT) para autenticación
- bcryptjs para encriptar contraseñas
- Passport + passport-google-oauth20 para OAuth con Google
- CORS

## Estructura del proyecto

```
crud-usuarios/
├── models/
│   └── Usuario.js 
├── routes/
│   ├── usuarios.js
│   └── auth.js
├── middleware/
│   └── auth.js
├── config.js
├── db.js
├── passport-config.js
├── index.js
└── package.json
```

## Requisitos previos

- Node.js instalado (versión 18 o superior).
- Una base de datos MongoDB. Puede ser local (`mongodb://127.0.0.1:27017`) o en la nube con MongoDB Atlas.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/<TU_USUARIO>/crud-usuarios.git
cd crud-usuarios
```

2. Instalar las dependencias:

```bash
npm install
```

3. Configurar las variables de entorno. Crear un archivo `.env` en la raíz (o configurarlas en el servicio de despliegue) con los siguientes valores:

```
MONGO_URI=mongodb://127.0.0.1:27017/crud_usuarios
JWT_SECRET=mi_clave_secreta_unemi_2026
GOOGLE_CLIENT_ID=<TU_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<TU_CLIENT_SECRET>
```

> Si usas MongoDB Atlas, reemplaza `MONGO_URI` por tu cadena de conexión de Atlas.

## Ejecución

En modo desarrollo (con recarga automática mediante nodemon):

```bash
npm run dev
```

En modo producción:

```bash
npm start
```

El servidor se ejecuta por defecto en `http://localhost:3000`.

## Endpoints

Base: `/api/usuarios`

| Método | Ruta                | Descripción                     | Protegida (JWT) |
|--------|---------------------|---------------------------------|-----------------|
| POST   | `/api/usuarios`     | Crear usuario (registro)        | No              |
| GET    | `/api/usuarios`     | Listar todos los usuarios       | Sí              |
| GET    | `/api/usuarios/:id` | Obtener un usuario por su ID    | Sí              |
| PUT    | `/api/usuarios/:id` | Actualizar un usuario           | No              |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario             | No              |

Base: `/api/auth`

| Método | Ruta                        | Descripción                              |
|--------|-----------------------------|------------------------------------------|
| POST   | `/api/auth/login`           | Iniciar sesión y obtener token JWT       |
| GET    | `/api/auth/google`          | Iniciar login con Google (OAuth)         |
| GET    | `/api/auth/google/callback` | Callback de Google, devuelve token JWT   |

## Autenticación con JWT

1. Registrar un usuario con `POST /api/usuarios` enviando `nombre`, `email`, `edad` y `password`.
2. Iniciar sesión con `POST /api/auth/login` enviando `email` y `password`. La respuesta incluye un token.
3. Para acceder a las rutas protegidas, enviar el token en el header:

```
Authorization: Bearer <token>
```

### Ejemplo de body para registro

```json
{
  "nombre": "Steven",
  "email": "steven@test.com",
  "edad": 22,
  "password": "123456"
}
```

### Ejemplo de body para login

```json
{
  "email": "steven@test.com",
  "password": "123456"
}
```

## Login con Google (OAuth 2.0)

El login con Google se prueba desde el navegador (no desde Postman, ya que redirige a la pantalla de Google):

```
http://localhost:3000/api/auth/google
```

Tras autenticarse con la cuenta de Google, la aplicación devuelve un token JWT que funciona igual que el del login normal.

## Despliegue

- **Back-End:** desplegado en Render → `<URL_DE_RENDER>`
- Base de datos en la nube con MongoDB Atlas.

Las variables de entorno (`MONGO_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) se configuran directamente en el panel de Render.

## Autor

Steven – Carrera de Software, UNEMI.