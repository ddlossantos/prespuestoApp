const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Datos recibidos:", { email, password }); // Log de depuración

    // 🔹 Verifica si la clave JWT_SECRET está cargada
    console.log("JWT_SECRET en el login:", process.env.JWT_SECRET);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Usuario no encontrado"); // Log de depuración
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Contraseña incorrecta"); // Log de depuración
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // 🔹 Si JWT_SECRET es undefined, el token fallará
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Token generado:", token); // Log de depuración
        res.json({ token });
    } catch (err) {
        console.error("Error en la ruta de login:", err); // Log de depuración
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});


module.exports = router;