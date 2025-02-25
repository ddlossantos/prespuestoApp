const express = require("express");
const Income = require("../models/Income");
const router = express.Router();

// Obtener todos los ingresos de un usuario
router.get("/", async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id });
        res.json(incomes);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los ingresos" });
    }
});

// Agregar un nuevo ingreso
router.post("/", async (req, res) => {
    const { amount, description } = req.body;
    try {
        const newIncome = new Income({ amount, description, user: req.user.id });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(500).json({ error: "Error al agregar el ingreso" });
    }
});

// Editar un ingreso existente
router.put("/:id", async (req, res) => {
    const { amount, description } = req.body;
    try {
        const updatedIncome = await Income.findByIdAndUpdate(
            req.params.id,
            { amount, description },
            { new: true }
        );
        res.json(updatedIncome);
    } catch (err) {
        res.status(500).json({ error: "Error al editar el ingreso" });
    }
});

// Eliminar un ingreso
router.delete("/:id", async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Ingreso eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el ingreso" });
    }
});

module.exports = router;