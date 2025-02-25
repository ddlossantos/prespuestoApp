const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    amount: { type: Number, required: true }, // Monto del ingreso
    description: { type: String, default: "" }, // Descripción opcional
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Usuario asociado
    date: { type: Date, default: Date.now }, // Fecha del ingreso
});

module.exports = mongoose.model("Income", IncomeSchema);