import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const IncomeList = () => {
    const [incomes, setIncomes] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchIncomes = async () => {
                try {
                    const response = await api.get("/income");
                    setIncomes(response.data);
                } catch (err) {
                    console.error("Error al obtener los ingresos:", err);
                }
            };
            fetchIncomes();
        }
    }, [isAuthenticated]);

    return (
        <div>
            <h2>Ingresos</h2>
            <ul>
                {incomes.map((income) => (
                    <li key={income._id}>
                        {income.amount} - {income.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IncomeList;