import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/dashboard/add-income">Agregar ingreso</Link>
                </li>
                <li>
                    <Link to="/dashboard/add-expense">Agregar gasto</Link>
                </li>
                <li>
                    <Link to="/dashboard/add-category">Agregar categoría</Link>
                </li>
                <li>
                    <Link to="/dashboard/incomes">Ver ingresos</Link>
                </li>
                <li>
                    <Link to="/dashboard/expenses">Ver gastos</Link>
                </li>
                <li>
                    <Link to="/dashboard/categories">Ver categorías</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;