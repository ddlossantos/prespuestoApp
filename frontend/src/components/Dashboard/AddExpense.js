import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext"; // Asegúrate de que AuthContext esté correctamente configurado

const AddExpense = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(""); // Agregar el estado para la categoría
    const [categories, setCategories] = useState([]); // Agregar el estado para las categorías
    const [error, setError] = useState("");
    const { token, isAuthenticated } = useContext(AuthContext); // Asegúrate de que token esté disponible

    // Obtener las categorías del backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/categories", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(response.data); // Guardar las categorías recibidas
            } catch (err) {
                console.error("Error al obtener categorías:", err);
                setError("No se pudieron cargar las categorías");
            }
        };

        if (isAuthenticated) {
            fetchCategories();
        }
    }, [isAuthenticated, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError("Debes iniciar sesión para agregar un gasto");
            return;
        }

        if (!category) {
            setError("Debes seleccionar una categoría");
            return;
        }

        try {
            const response = await api.post(
                "/expenses", // Asegúrate de que la ruta del backend sea correcta
                { amount, description, category },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Gasto agregado:", response.data);
            // Limpiar el formulario o redirigir
            setAmount("");
            setDescription("");
            setCategory("");
            setError(""); // Limpiar cualquier mensaje de error
        } catch (err) {
            setError(err.response?.data?.error || "Error al agregar el gasto");
            console.error("Error al agregar el gasto:", err);
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
                
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} // Selección de categoría
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.length === 0 ? (
                        <option value="" disabled>No hay categorías disponibles, crea una primero</option>
                    ) : (
                        categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))
                    )}
                </select>

                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AddExpense;
