const express = require("express");
const Income = require("../models/Income");
const auth = require("../middleware/auth"); // Importar autenticación
const router = express.Router();

// Obtener todos los ingresos de un usuario
router.get("/", auth, async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id });
        res.json(incomes);
    } catch (err) {
        console.error("Error al obtener ingresos:", err); // Depuración
        res.status(500).json({ error: "Error al obtener los ingresos" });
    }
});

// Agregar un nuevo ingreso
router.post("/", auth, async (req, res) => {
    const { amount, description } = req.body;
    console.log("Datos recibidos en backend:", { amount, description, user: req.user.id }); // Depuración
    try {
        const newIncome = new Income({ amount, description, user: req.user.id });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        console.error("Error al agregar ingreso:", err); // Depuración
        res.status(500).json({ error: "Error al agregar el ingreso" });
    }
});

// Editar un ingreso existente
router.put("/:id", auth, async (req, res) => {
    const { amount, description } = req.body;
    try {
        const updatedIncome = await Income.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Asegura que el usuario solo edite sus propios ingresos
            { amount, description },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ error: "Ingreso no encontrado" });
        }

        res.json(updatedIncome);
    } catch (err) {
        console.error("Error al editar ingreso:", err); // Depuración
        res.status(500).json({ error: "Error al editar el ingreso" });
    }
});

// Eliminar un ingreso
router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedIncome = await Income.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!deletedIncome) {
            return res.status(404).json({ error: "Ingreso no encontrado" });
        }

        res.json({ message: "Ingreso eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar ingreso:", err); // Depuración
        res.status(500).json({ error: "Error al eliminar el ingreso" });
    }
});

module.exports = router;
