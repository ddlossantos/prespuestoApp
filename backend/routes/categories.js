const express = require("express");
const Category = require("../models/Category");
const router = express.Router();
const authMiddleware = require("../middleware/auth"); // Importa el middleware de autenticación

// Obtener todas las categorías de un usuario
router.get("/", authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        console.log("Categorías encontradas:", categories); // Log de depuración
        res.json(categories);
    } catch (err) {
        console.error("Error al obtener las categorías:", err); // Log de depuración
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
});

// Agregar una nueva categoría
router.post("/", authMiddleware, async (req, res) => {
    const { name } = req.body;
    console.log("Datos recibidos para agregar categoría:", { name }); // Log de depuración
    try {
        const newCategory = new Category({ name, user: req.user.id });
        await newCategory.save();
        console.log("Categoría agregada:", newCategory); // Log de depuración
        res.status(201).json(newCategory);
    } catch (err) {
        console.error("Error al agregar la categoría:", err); // Log de depuración
        res.status(500).json({ error: "Error al agregar la categoría" });
    }
});

// Editar una categoría existente
router.put("/:id", authMiddleware, async (req, res) => {
    const { name } = req.body;
    console.log("Datos recibidos para editar categoría:", { name }); // Log de depuración
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        console.log("Categoría actualizada:", updatedCategory); // Log de depuración
        res.json(updatedCategory);
    } catch (err) {
        console.error("Error al editar la categoría:", err); // Log de depuración
        res.status(500).json({ error: "Error al editar la categoría" });
    }
});

// Eliminar una categoría
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        console.log("Categoría eliminada:", deletedCategory); // Log de depuración
        res.json({ message: "Categoría eliminada correctamente" });
    } catch (err) {
        console.error("Error al eliminar la categoría:", err); // Log de depuración
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
});

module.exports = router;
