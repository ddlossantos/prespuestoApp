import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", { email, password });
            console.log("Usuario registrado:", response.data);
            login(response.data.token); // Guardar el token y actualizar el estado de autenticación
            navigate("/dashboard"); // Redirigir al dashboard
        } catch (err) {
            setError(err.response?.data?.error || "Error al registrar el usuario");
        }
    };

    return (
        <div>
            <h2>Registro</h2>
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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;