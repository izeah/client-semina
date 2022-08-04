import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import About from "./components/About";
import Categories from "./components/Categories";
import CategoriesDetail from "./components/CategoriesDetail";
import Form from "./components/Form";
import Home from "./components/Home";

function Login() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate("/")}>Submit</button>
        </>
    );
}

function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <button onClick={() => setCount(count + 1)}>Click Me!</button>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/form">Form</Link>
                </li>
            </ul>

            <Routes>
                <Route path="/" element={<Home isLoggedIn={true} />} />
                <Route path="/about" element={<About />} />
                <Route path="/categories" element={<Categories />}></Route>
                <Route
                    path="/categories/:id"
                    element={<CategoriesDetail />}></Route>
                <Route path="/login" element={<Login />}>
                    Login
                </Route>
                <Route path="/form" element={<Form />}>
                    Form
                </Route>
            </Routes>
        </div>
    );
}

export default App;
