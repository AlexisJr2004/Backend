# CRUD Usuarios – API REST (Back-End)

API REST desarrollada con Node.js, Express y MongoDB para la gestión de usuarios (CRUD), con autenticación mediante JWT y login con Google (OAuth 2.0). Desarrollada para la Práctica 3 de la asignatura Desarrollo Web – UNEMI.

## Tecnologías

- Node.js + Express
- MongoDB Atlas (Mongoose)
- JSON Web Token (JWT) para autenticación
- bcryptjs para encriptar contraseñas
- Passport + passport-google-oauth20 para OAuth con Google
- CORS

## Estructura del proyecto

```
Backend/
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
├── .env
├── .env.example
├── .gitignore
└── package.json
```

## Requisitos previos

- Node.js versión 18 o superior.
- Una cuenta en MongoDB Atlas (o MongoDB local para desarrollo).
- Credenciales de Google OAuth (Client ID y Client Secret) si se desea usar el login con Google.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/AlexisJr2004/Backend.git
cd Backend
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto a partir del archivo de ejemplo `.env.example`, y completar los valores:

```bash
cp .env.example .env
```

Luego editar el archivo `.env` con las credenciales reales (ver sección "Variables de entorno").

## Variables de entorno

El proyecto necesita las siguientes variables (ver `.env.example`):

| Variable               | Descripción                                                        |
|------------------------|--------------------------------------------------------------------|
| `MONGO_URI`            | Cadena de conexión a MongoDB Atlas (incluye la base `crud_usuarios`) |
| `JWT_SECRET`           | Clave secreta para firmar los tokens JWT                           |
| `GOOGLE_CLIENT_ID`     | ID de cliente de Google OAuth                                      |
| `GOOGLE_CLIENT_SECRET` | Secreto de cliente de Google OAuth                                 |
| `GOOGLE_CALLBACK_URL`  | URL de callback registrada en Google Cloud                        |
| `FRONTEND_URL`         | URL del Front-End (para redirigir tras el login con Google)        |

## Ejecución

En modo desarrollo (recarga automática con nodemon):

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

| Método | Ruta                | Descripción                  | Protegida (JWT) |
|--------|---------------------|------------------------------|-----------------|
| POST   | `/api/usuarios`     | Crear usuario (registro)     | No              |
| GET    | `/api/usuarios`     | Listar todos los usuarios    | Sí              |
| GET    | `/api/usuarios/:id` | Obtener un usuario por su ID | Sí              |
| PUT    | `/api/usuarios/:id` | Actualizar un usuario        | No              |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario          | No              |

Base: `/api/auth`

| Método | Ruta                        | Descripción                            |
|--------|-----------------------------|----------------------------------------|
| POST   | `/api/auth/login`           | Iniciar sesión y obtener token JWT     |
| GET    | `/api/auth/google`          | Iniciar login con Google (OAuth)       |
| GET    | `/api/auth/google/callback` | Callback de Google, devuelve token JWT |

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

El login con Google se realiza desde el navegador (no desde Postman, ya que redirige a la pantalla de Google). Al acceder a `/api/auth/google`, el usuario se autentica con su cuenta de Google y la API devuelve un token JWT que funciona igual que el del login normal.

## Despliegue

- **Back-End:** desplegado en Render → https://backend-h5ro.onrender.com
- **Front-End:** desplegado en Vercel → https://frontend-liart-zeta-36.vercel.app
- **Base de datos:** MongoDB Atlas (en la nube).

Las variables de entorno se configuran en el panel de Render (sección Environment).

> Nota: el servicio en Render usa el plan gratuito, por lo que la primera petición tras un periodo de inactividad puede tardar alrededor de 50 segundos mientras el servicio se reactiva.

## Autor

Steven – Carrera de Software, UNEMI.
