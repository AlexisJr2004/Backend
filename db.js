const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/crud_usuarios");
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar:", error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;