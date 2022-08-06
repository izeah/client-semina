import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GuardRoute from "../components/GuardRoute";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import SNavbar from "../components/Navbar";
import Login from "../pages/signin";
import CategoriesRoute from "./CategoriesRoute";
import HomeRoute from "./HomeRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <GuestOnlyRoute>
                        <Login />
                    </GuestOnlyRoute>
                }
            />
            <Route
                path="/"
                element={
                    <>
                        <SNavbar />
                        <GuardRoute />
                    </>
                }>
                <Route path="dashboard/*" element={<HomeRoute />} />
                <Route path="categories/*" element={<CategoriesRoute />} />
                <Route
                    path=""
                    element={<Navigate to="/dashboard" replace={true} />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
