const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();

// Obtener todos los gastos de un usuario
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).populate("category");
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los gastos" });
    }
});

// Agregar un nuevo gasto
router.post("/", async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        const newExpense = new Expense({ amount, description, category, user: req.user.id });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: "Error al agregar el gasto" });
    }
});

// Editar un gasto existente
router.put("/:id", async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { amount, description, category },
            { new: true }
        );
        res.json(updatedExpense);
    } catch (err) {
        res.status(500).json({ error: "Error al editar el gasto" });
    }
});

// Eliminar un gasto
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Gasto eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el gasto" });
    }
});

module.exports = router;