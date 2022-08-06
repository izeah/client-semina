import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import { setNotif } from "../../redux/notif/actions";
import { getData, putData } from "../../utils/fetch";
import SForm from "./form";

function CategoriesEdit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [form, setForm] = useState({
        name: "",
    });
    const [alert, setAlert] = useState({
        message: "",
        type: "",
        status: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchOneCategory = async () => {
        const res = await getData(`/cms/categories/${id}`);
        setForm({ ...form, name: res.data.data.name });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await putData(`/cms/categories/${id}`, form);
            dispatch(
                setNotif(
                    true,
                    "success",
                    `berhasil ubah kategori ${res.data.data.name}`
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

    useEffect(() => {
        fetchOneCategory();
    }, []);

    return (
        <Container className="mt-3">
            <SBreadCrumb
                textSecond="Categories"
                urlSecond="/categories"
                textThird="Edit"
            />
            {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
            )}
            <SForm
                edit
                form={form}
                isLoading={isLoading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
}

export default CategoriesEdit;
