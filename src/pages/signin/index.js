import axios from "axios";
import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import { seminaApiUrl } from "../../config";
import SForm from "./form";

function SigninPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState({
        status: false,
        message: "",
        type: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${seminaApiUrl}/cms/auth/signin`,
                form
            );

            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("role", res.data.data.role);
            setIsLoading(false);
            navigate("/");
        } catch (err) {
            setIsLoading(false);
            setAlert({
                status: true,
                message: err?.response?.data?.msg || "Internal Server Error",
                type: "danger",
            });
        }
    };

    if (token) return <Navigate to="/" replace={true} />;

    return (
        <Container fluid="md" className="my-5">
            <div className="m-auto" style={{ width: "50%" }}>
                {alert.status && (
                    <SAlert type={alert.type} message={alert.message} />
                )}
            </div>
            <Card style={{ width: "50%" }} className="m-auto mt-5">
                <Card.Body>
                    <Card.Title className="text-center">Form Signin</Card.Title>
                    <SForm
                        form={form}
                        handleChange={handleChange}
                        isLoading={isLoading}
                        handleSubmit={handleSubmit}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SigninPage;
