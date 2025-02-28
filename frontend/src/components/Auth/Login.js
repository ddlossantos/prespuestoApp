import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Enviando datos al backend:", { email, password }); // Log de depuración
            const response = await api.post("/auth/login", { email, password });
            console.log("Respuesta del backend:", response.data); // Log de depuración
            login(response.data.token); // Guardar el token y actualizar el estado de autenticación
            navigate("/dashboard"); // Redirigir al dashboard
        } catch (err) {
            console.error("Error en la petición:", err); // Log de depuración
            setError(err.response?.data?.error || "Error al iniciar sesión");
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;