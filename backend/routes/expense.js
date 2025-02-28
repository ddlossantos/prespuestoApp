const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();
const authMiddleware = require("../middleware/auth"); // Importa el middleware de autenticación

// Obtener todos los gastos de un usuario
router.get("/", authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).populate("category");
        console.log("Gastos encontrados:", expenses); // Log de depuración
        res.json(expenses);
    } catch (err) {
        console.error("Error al obtener los gastos:", err); // Log de depuración
        res.status(500).json({ error: "Error al obtener los gastos" });
    }
});

// Agregar un nuevo gasto
router.post("/", authMiddleware, async (req, res) => {
    const { amount, description, category } = req.body;
    console.log("Datos recibidos para agregar gasto:", { amount, description, category }); // Log de depuración
    try {
        const newExpense = new Expense({ amount, description, category, user: req.user.id });
        await newExpense.save();
        console.log("Gasto agregado:", newExpense); // Log de depuración
        res.status(201).json(newExpense);
    } catch (err) {
        console.error("Error al agregar el gasto:", err); // Log de depuración
        res.status(500).json({ error: "Error al agregar el gasto" });
    }
});

// Editar un gasto existente
router.put("/:id", authMiddleware, async (req, res) => {
    const { amount, description, category } = req.body;
    console.log("Datos recibidos para editar gasto:", { amount, description, category }); // Log de depuración
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { amount, description, category },
            { new: true }
        );
        console.log("Gasto actualizado:", updatedExpense); // Log de depuración
        res.json(updatedExpense);
    } catch (err) {
        console.error("Error al editar el gasto:", err); // Log de depuración
        res.status(500).json({ error: "Error al editar el gasto" });
    }
});

// Eliminar un gasto
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        console.log("Gasto eliminado:", deletedExpense); // Log de depuración
        res.json({ message: "Gasto eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar el gasto:", err); // Log de depuración
        res.status(500).json({ error: "Error al eliminar el gasto" });
    }
});

module.exports = router;
