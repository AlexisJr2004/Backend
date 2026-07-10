const express = require("express");
const cors = require("cors");
const conectarDB = require("./db");
const passport = require("./passport-config");
const usuariosRoutes = require("./routes/usuarios");
const authRoutes = require("./routes/auth");

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));