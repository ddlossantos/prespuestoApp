import React, { useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext"; // Asegúrate de que AuthContext esté correctamente configurado

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { token, isAuthenticated } = useContext(AuthContext); // Obtén el token de AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError("Debes iniciar sesión para agregar una categoría");
            return;
        }
        try {
            const response = await api.post(
                "/categories", 
                { name },
                {
                    headers: { Authorization: `Bearer ${token}` } // Asegúrate de pasar el token en los encabezados
                }
            );
            console.log("Categoría agregada:", response.data); // Log de depuración
            setName(""); // Limpiar el formulario
        } catch (err) {
            setError(err.response?.data?.error || "Error al agregar la categoría");
            console.error("Error al agregar la categoría:", err); // Log de depuración
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
