const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la categoría
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Usuario asociado
});

module.exports = mongoose.model("Category", CategorySchema);