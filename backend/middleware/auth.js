const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    // Obtener el token desde el encabezado Authorization
    const authHeader = req.headers["authorization"];
    console.log("Encabezado de autorización recibido:", authHeader); // Log de depuración

    if (!authHeader) {
        return res.status(401).json({ error: "No se proporcionó el token de autenticación" });
    }

    // Eliminar el prefijo 'Bearer ' y extraer el token
    const token = authHeader.split(" ")[1];
    console.log("Token extraído:", token); // Log de depuración

    if (!token) {
        return res.status(401).json({ error: "Token no válido" });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Error al verificar el token:", err);
            return res.status(403).json({ error: "Token inválido" });
        }
        // Guardar el usuario decodificado en el objeto 'req' para usarlo en rutas protegidas
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
