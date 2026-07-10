const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../passport-config");
const { JWT_SECRET, FRONTEND_URL } = require("../config");

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

    // Página que envía el token a la ventana que abrió el popup y se cierra
    res.send(`
      <!DOCTYPE html>
      <html>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage(
              { token: "${token}" },
              "${FRONTEND_URL}"
            );
            window.close();
          } else {
            // fallback: si no hay ventana padre, redirige normal
            window.location.href = "${FRONTEND_URL}/?token=${token}";
          }
        </script>
        <p>Iniciando sesión... puedes cerrar esta ventana.</p>
      </body>
      </html>
    `);
  }
);

module.exports = router;