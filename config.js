module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "mi_clave_secreta_unemi_2026",
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/crud_usuarios",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "https://backend-h5ro.onrender.com/api/auth/google/callback",
};