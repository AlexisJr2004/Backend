const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const passport = require("../passport-config");

// POST /login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // comparar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // generar token (expira en 1 hora)
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensaje: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar login con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ mensaje: "Login con Google exitoso", token });
  }
);

module.exports = router;