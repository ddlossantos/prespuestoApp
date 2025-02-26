import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchExpenses = async () => {
                try {
                    const response = await api.get("/expense");
                    setExpenses(response.data);
                } catch (err) {
                    console.error("Error al obtener los gastos:", err);
                }
            };
            fetchExpenses();
        }
    }, [isAuthenticated]);

    return (
        <div>
            <h2>Gastos</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.amount} - {expense.description} - {expense.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;