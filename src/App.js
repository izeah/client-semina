import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/categories";
import CategoriesCreate from "./pages/categories/create";
import CategoriesEdit from "./pages/categories/edit";
import DashboardPage from "./pages/dashboard";
import SigninPage from "./pages/signin";

function App() {
    return (
        <Routes>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/" element={<DashboardPage />}></Route>
            <Route path="/categories" element={<CategoriesPage />}></Route>
            <Route
                path="/categories/create"
                element={<CategoriesCreate />}></Route>
            <Route
                path="/categories/:id/edit"
                element={<CategoriesEdit />}></Route>
        </Routes>
    );
}

export default App;
