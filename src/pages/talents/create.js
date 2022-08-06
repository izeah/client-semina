import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import { setNotif } from "../../redux/notif/actions";
import { postData } from "../../utils/fetch";
import SForm from "./form";

function TalentsCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: "",
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

    const uploadImage = async (file) => {
        let formData = new FormData();
        formData.append("avatar", file);
        const res = await postData(`/cms/images`, formData, true);
        return res;
    };

    const handleChange = async (e) => {
        if (e.target.name === "avatar") {
            if (
                e?.target?.files[0]?.type === "image/jpg" ||
                e?.target?.files[0]?.type === "image/jpeg" ||
                e?.target?.files[0]?.type === "image/png"
            ) {
                let size = parseFloat(e.target.files[0].size / 3145728).toFixed(
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
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const payload = {
                image: form.file,
                role: form.role,
                name: form.name,
            };

            const res = await postData(`/cms/talents`, payload);

            dispatch(
                setNotif(
                    true,
                    "success",
                    `berhasil tambah talent ${res.data.data.name}`
                )
            );
            navigate("/talents");
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
                textSecond={"Talents"}
                urlSecond={"/talents"}
                textThird={"Create"}
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

export default TalentsCreate;
