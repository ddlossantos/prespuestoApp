import React, { useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { isAuthenticated } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError("Debes iniciar sesión para agregar una categoría");
            return;
        }
        try {
            const response = await api.post("/categories", { name });
            console.log("Categoría agregada:", response.data);
            // Limpiar el formulario o redirigir
            setName("");
        } catch (err) {
            setError(err.response?.data?.error || "Error al agregar la categoría");
        }
    };

    return (
        <div>
            <h2>Agregar categoría</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AddCategory;