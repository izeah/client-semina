import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../pages/signin";

export default function LoginRoute() {
    return (
        <Routes>
            <Route path="/login" element={<Signin />} />
        </Routes>
    );
}
