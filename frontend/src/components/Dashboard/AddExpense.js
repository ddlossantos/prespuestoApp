import React, { useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddExpense = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const { isAuthenticated } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError("Debes iniciar sesión para agregar un gasto");
            return;
        }
        try {
            const response = await api.post("/expense", { amount, description, category });
            console.log("Gasto agregado:", response.data);
            // Limpiar el formulario o redirigir
            setAmount("");
            setDescription("");
            setCategory("");
        } catch (err) {
            setError(err.response?.data?.error || "Error al agregar el gasto");
        }
    };

    return (
        <div>
            <h2>Agregar gasto</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Monto"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AddExpense;