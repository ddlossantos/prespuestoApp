const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true }, // Monto del gasto
    description: { type: String, default: "" }, // Descripción opcional
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Usuario asociado
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Categoría asociada
    date: { type: Date, default: Date.now }, // Fecha del gasto
});

module.exports = mongoose.model("Expense", ExpenseSchema);