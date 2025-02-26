import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Usar el contexto

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log("Usuario logueado:", response.data);
            login(response.data.token); // Guardar el token y actualizar el estado de autenticación
            navigate("/dashboard"); // Redirigir al dashboard
        } catch (err) {
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