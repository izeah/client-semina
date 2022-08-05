import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";
import { seminaApiUrl } from "../../config";
import Form from "./form";

function CategoryCreate() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "" });

    const [alert, setAlert] = useState({
        status: false,
        type: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${seminaApiUrl}/cms/categories`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/categories");
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setAlert({
                status: true,
                type: "danger",
                message: err.response.data.msg,
            });
        }
    };

    return (
        <>
            <SNavbar />
            <Container>
                <SBreadCrumb
                    textSecond={"Categories"}
                    urlSecond={"/categories"}
                    textThird={"Create"}
                />
                {alert.status && (
                    <SAlert type={alert.type} message={alert.message} />
                )}
                <Form
                    form={form}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Container>
        </>
    );
}

export default CategoryCreate;
