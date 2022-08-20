import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import BreadCrumb from "../../components/Breadcrumb";
import {
    fetchListCategories,
    fetchListTalents,
} from "../../redux/lists/actions";
import { setNotif } from "../../redux/notif/actions";
import { getData, postData, putData } from "../../utils/fetch";
import Form from "./form";

function EventsEdit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
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
                expiredAt: new Date(),
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

    const fetchOneEvent = async () => {
        const res = await getData(`/cms/events/${id}`);

        setForm({
            ...form,
            title: res.data.data.title,
            date: moment(res.data.data.date).format("YYYY-MM-DD HH:mm"),
            file: res.data.data.image._id,
            avatar: res.data.data.image.name,
            about: res.data.data.about,
            venueName: res.data.data.venueName,
            tagline: res.data.data.tagline,
            keypoint: res.data.data.keypoint,
            category: {
                value: res?.data?.data?.category?._id,
                label: res?.data?.data?.category?.name,
                target: {
                    name: "category",
                    value: res?.data?.data?.category?._id,
                },
            },
            talent: {
                value: res?.data?.data?.talent?._id,
                label: res?.data?.data?.talent?.name,
                target: { name: "talent", value: res?.data?.data?.talent?._id },
            },
            tickets: res?.data?.data?.tickets?.map((tic) => {
                return {
                    ...tic,
                    expiredAt: moment(tic.expiredAt).format("YYYY-MM-DD"),
                    statusTicketCategory: {
                        value: tic.statusTicketCategory ? true : false,
                        label: tic.statusTicketCategory ? "Aktif" : "Non-Aktif",
                        target: {
                            name: "statusTicketCategory",
                            value: tic.statusTicketCategory ? true : false,
                        },
                    },
                };
            }),
        });
    };

    useEffect(() => {
        fetchOneEvent();
    }, []);

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

            const res = await putData(`/cms/events/${id}`, payload);
            dispatch(
                setNotif(
                    true,
                    "success",
                    `berhasil ubah events ${res.data.data.title}`
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
            status: "",
            stock: "",
            price: "",
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
            <BreadCrumb
                textSecond={"Events"}
                urlSecond={"/events"}
                textThird="Edit"
            />
            {alert.status && (
                <Alert type={alert.type} message={alert.message} />
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
                edit
            />
        </Container>
    );
}

export default EventsEdit;
