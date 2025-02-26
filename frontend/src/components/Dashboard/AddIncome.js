import React, { useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddIncome = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const { isAuthenticated } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError("Debes iniciar sesión para agregar un ingreso");
            return;
        }
        try {
            const response = await api.post("/income", { amount, description });
            console.log("Ingreso agregado:", response.data);
            // Limpiar el formulario o redirigir
        } catch (err) {
            setError(err.response?.data?.error || "Error al agregar el ingreso");
        }
    };

    return (
        <div>
            <h2>Agregar ingreso</h2>
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
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AddIncome;