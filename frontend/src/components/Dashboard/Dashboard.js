import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>
            <Outlet /> {/* Aquí se renderizan las subrutas */}
        </div>
    );
};

export default Dashboard;