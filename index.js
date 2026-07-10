const express = require("express");
const conectarDB = require("./db");
const usuariosRoutes = require("./routes/usuarios");
const authRoutes = require("./routes/auth");

const app = express();
conectarDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));