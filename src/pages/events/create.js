import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import {
    fetchListCategories,
    fetchListTalents,
} from "../../redux/lists/actions";
import { setNotif } from "../../redux/notif/actions";
import { postData } from "../../utils/fetch";
import Form from "./form";

function EventsCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lists = useSelector((state) => state.lists);

    const [form, setForm] = useState({
        title: "",
        date: "",
        file: "",
        avatar: "",
        about: "",
        venueName: "",
        tagline: "",
        keypoint: [],
        tickets: [
            {
                type: "",
                stock: "",
                price: "",
                expiredAt: new Date().toDateString(),
                statusTicketCategory: false,
            },
        ],
        category: "",
        talent: "",
    });

    const [alert, setAlert] = useState({
        status: false,
        type: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const statusTicketCategoryOptions = [
        {
            value: true,
            label: "Aktif",
            target: { value: true, name: "statusTicketCategory" },
        },
        {
            value: false,
            label: "Non-Aktif",
            target: { value: false, name: "statusTicketCategory" },
        },
    ];

    useEffect(() => {
        dispatch(fetchListTalents());
        dispatch(fetchListCategories());
    }, [dispatch]);

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
        } else if (e.target.name === "category" || e.target.name === "talent") {
            setForm({ ...form, [e.target.name]: e });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const payload = {
                date: form.date,
                image: form.file,
                title: form.title,
                price: form.price,
                about: form.about,
                venueName: form.venueName,
                tagline: form.tagline,
                keypoint: form.keypoint,
                category: form.category.value,
                talent: form.talent.value,
                status: form.status,
                tickets: form.tickets.map((tic) => {
                    return {
                        ...tic,
                        statusTicketCategory: tic.statusTicketCategory.value,
                    };
                }),
            };

            const res = await postData("/cms/events", payload);
            dispatch(
                setNotif(
                    true,
                    "success",
                    `berhasil tambah events ${res.data.data.title}`
                )
            );

            navigate("/events");
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setAlert({
                ...alert,
                status: true,
                type: "danger",
                message:
                    err.response.data.msg instanceof Array ? (
                        <ul>
                            {err.response.data.msg.map((item, index) => {
                                return <li key={index}>{item}</li>;
                            })}
                        </ul>
                    ) : typeof err.response.data.msg === "string" ? (
                        err.response.data.msg
                    ) : (
                        "Something went wrong"
                    ),
            });
        }
    };

    const handleChangeKeyPoint = (e, i) => {
        let _temp = [...form.keypoint];

        _temp[i] = e.target.value;

        setForm({ ...form, keypoint: _temp });
    };

    const handlePlusKeyPoint = () => {
        let _temp = [...form.keypoint];
        _temp.push("");

        setForm({ ...form, keypoint: _temp });
    };

    const handleMinusKeyPoint = (index) => {
        let _temp = [...form.keypoint];
        let removeIndex = _temp
            .map(function (_, i) {
                return i;
            })
            .indexOf(index);

        _temp.splice(removeIndex, 1);
        setForm({ ...form, keypoint: _temp });
    };

    const handlePlusTicket = () => {
        let _temp = [...form.tickets];
        _temp.push({
            type: "",
            stock: "",
            price: "",
            expiredAt: new Date().toDateString(),
            statusTicketCategory: false,
        });

        setForm({ ...form, tickets: _temp });
    };
    const handleMinusTicket = (index) => {
        let _temp = [...form.tickets];
        let removeIndex = _temp
            .map(function (_, i) {
                return i;
            })
            .indexOf(index);

        _temp.splice(removeIndex, 1);
        setForm({ ...form, tickets: _temp });
    };

    const handleChangeTicket = (e, i) => {
        let _temp = [...form.tickets];

        if (e.target.name === "statusTicketCategory") {
            _temp[i][e.target.name] = e;
        } else {
            _temp[i][e.target.name] = e.target.value;
        }

        setForm({ ...form, tickets: _temp });
    };

    return (
        <Container>
            <SBreadCrumb
                textSecond={"Events"}
                urlSecond={"/events"}
                textThird="Create"
            />
            {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
            )}
            <Form
                form={form}
                isLoading={isLoading}
                lists={lists}
                statusTicketCategoryOptions={statusTicketCategoryOptions}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleChangeKeyPoint={handleChangeKeyPoint}
                handlePlusKeyPoint={handlePlusKeyPoint}
                handleMinusKeyPoint={handleMinusKeyPoint}
                handlePlusTicket={handlePlusTicket}
                handleMinusTicket={handleMinusTicket}
                handleChangeTicket={handleChangeTicket}
            />
        </Container>
    );
}

export default EventsCreate;
