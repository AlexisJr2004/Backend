module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "mi_clave_secreta_unemi_2026",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/crud_usuarios",
};