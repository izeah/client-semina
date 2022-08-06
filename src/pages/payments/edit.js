import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import { setNotif } from "../../redux/notif/actions";
import { getData, postData, putData } from "../../utils/fetch";
import SForm from "./form";

function PaymentsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        type: "",
        role: "",
        file: "",
        avatar: "",
    });

    const [alert, setAlert] = useState({
        status: false,
        type: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const fetchOnePayments = async () => {
        const res = await getData(`/cms/payments/${id}`);
        setForm({
            ...form,
            type: res.data.data.type,
            role: res.data.data.role,
            avatar: res.data.data.image.name,
            file: res.data.data.image._id,
        });
    };

    useEffect(() => {
        fetchOnePayments();
    }, []);

    const uploadImage = async (file) => {
        let formData = new FormData();
        formData.append("avatar", file);
        const res = await postData("/cms/images", formData, true);
        return res;
    };

    const handleChange = async (e) => {
        if (e.target.name === "avatar") {
            if (
                e?.target?.files[0]?.type === "image/jpg" ||
                e?.target?.files[0]?.type === "image/png" ||
                e?.target?.files[0]?.type === "image/jpeg"
            ) {
                var size = parseFloat(e.target.files[0].size / 3145728).toFixed(
                    2
                );

                if (size > 3) {
                    setAlert({
                        ...alert,
                        status: true,
                        type: "danger",
                        message: "Image size must be less than 3MB",
                    });
                    setForm({
                        ...form,
                        file: "",
                        [e.target.name]: "",
                    });
                } else {
                    const res = await uploadImage(e.target.files[0]);

                    setForm({
                        ...form,
                        file: res.data.data._id,
                        [e.target.name]: res.data.data.name,
                    });
                }
            } else {
                setAlert({
                    ...alert,
                    status: true,
                    type: "danger",
                    message: "Image type must be jpg, jpeg or png",
                });
                setForm({
                    ...form,
                    file: "",
                    [e.target.name]: "",
                });
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const payload = {
                image: form.file,
                role: form.role,
                type: form.type,
            };

            const res = await putData(`/cms/payments/${id}`, payload);

            dispatch(
                setNotif(
                    true,
                    "success",
                    `berhasil ubah tipe pembayaran ${res.data.data.type}`
                )
            );
            navigate("/payments");
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setAlert({
                ...alert,
                status: true,
                type: "danger",
                message: err?.response?.data?.msg || "Something went wrong",
            });
        }
    };

    return (
        <Container>
            <SBreadCrumb
                textSecond={"Payments"}
                urlSecond={"/payments"}
                textThird="Edit"
            />
            {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
            )}
            <SForm
                form={form}
                isLoading={isLoading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
}

export default PaymentsEdit;
