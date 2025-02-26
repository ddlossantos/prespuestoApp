import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importar el AuthProvider
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AddIncome from "./components/Dashboard/AddIncome";
import AddExpense from "./components/Dashboard/AddExpense";
import AddCategory from "./components/Dashboard/AddCategory";
import IncomeList from "./components/Dashboard/IncomeList";
import ExpenseList from "./components/Dashboard/ExpenseList";
import CategoryList from "./components/Dashboard/CategoryList";
import PrivateRoute from "./components/Shared/PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rutas privadas */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route path="add-income" element={<AddIncome />} />
                            <Route path="add-expense" element={<AddExpense />} />
                            <Route path="add-category" element={<AddCategory />} />
                            <Route path="incomes" element={<IncomeList />} />
                            <Route path="expenses" element={<ExpenseList />} />
                            <Route path="categories" element={<CategoryList />} />
                        </Route>
                    </Route>

                    {/* Ruta por defecto */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;