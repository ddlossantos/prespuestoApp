import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchCategories = async () => {
                try {
                    const response = await api.get("/categories");
                    setCategories(response.data);
                } catch (err) {
                    console.error("Error al obtener las categorías:", err);
                }
            };
            fetchCategories();
        }
    }, [isAuthenticated]);

    return (
        <div>
            <h2>Categorías</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;