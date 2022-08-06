import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import { setNotif } from "../../redux/notif/actions";
import { postData } from "../../utils/fetch";
import Form from "./form";

function CategoryCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            const res = await postData(`/cms/categories`, form);
            dispatch(
                setNotif(
                    true,
                    "success",
                    `berhasil tambah kategori ${res.data.data.name}`
                )
            );

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
            <Container className="mt-3">
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
