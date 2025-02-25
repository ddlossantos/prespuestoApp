const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

// Obtener todas las categorías de un usuario
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
});

// Agregar una nueva categoría
router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Category({ name, user: req.user.id });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ error: "Error al agregar la categoría" });
    }
});

// Editar una categoría existente
router.put("/:id", async (req, res) => {
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: "Error al editar la categoría" });
    }
});

// Eliminar una categoría
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Categoría eliminada correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
});

module.exports = router;