const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const verificarToken = require("../middleware/auth");

// CREATE (con password encriptado)
router.post("/", async (req, res) => {
  try {
    const { nombre, email, edad, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, email, edad, password: passwordHash });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ (todos)
router.get("/", verificarToken, async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// READ (uno por id)
router.get("/:id", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: "No encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!usuario) return res.status(404).json({ error: "No encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: "No encontrado" });
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;