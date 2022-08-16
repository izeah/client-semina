import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import SelectBox from "../../components/SelectBox";
import Table from "../../components/TableWithAction";
import {
    fetchEvents,
    setCategory,
    setKeyword,
    setTalent,
} from "../../redux/events/actions";
import {
    fetchListCategories,
    fetchListTalents,
} from "../../redux/lists/actions";
import { setNotif } from "../../redux/notif/actions";
import { deleteData, putData } from "../../utils/fetch";

function EventsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notif = useSelector((state) => state.notif);
    const events = useSelector((state) => state.events);
    const lists = useSelector((state) => state.lists);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch, events.keyword, events.category, events.talent]);

    useEffect(() => {
        dispatch(fetchListCategories());
        dispatch(fetchListTalents());
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apa kamu yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, Hapus",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteData(`/cms/events/${id}`);

                dispatch(
                    setNotif(
                        true,
                        "success",
                        `berhasil hapus event ${res.data.data.title}`
                    )
                );

                dispatch(fetchEvents());
            }
        });
    };

    const handleChangeStatus = (id, status) => {
        Swal.fire({
            title: "Apa kamu yakin?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, Ubah Status",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const payload = {
                    statusEvent: status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                };
                const res = await putData(`/cms/events/${id}/status`, payload);

                dispatch(
                    setNotif(
                        true,
                        "success",
                        `berhasil ubah status event ${res.data.data.title}`
                    )
                );

                dispatch(fetchEvents());
            }
        });
    };

    return (
        <Container className="mt-3">
            <SBreadCrumb textSecond="Events" />
            <SButton action={() => navigate("/events/create")}>Tambah</SButton>
            <Row>
                <Col>
                    <SearchInput
                        query={events.keyword}
                        handleChange={(e) =>
                            dispatch(setKeyword(e.target.value))
                        }
                    />
                </Col>
                <Col>
                    <SelectBox
                        placeholder="Masukkan pencarian kategori"
                        name="category"
                        value={events.category}
                        options={lists.categories}
                        isClearable={true}
                        handleChange={(e) => dispatch(setCategory(e))}
                        className="mt-3"
                    />
                </Col>
                <Col>
                    <SelectBox
                        placeholder="Masukkan pencarian pembicara"
                        name="talent"
                        value={events.talent}
                        options={lists.talents}
                        isClearable={true}
                        handleChange={(e) => dispatch(setTalent(e))}
                        className="mt-3"
                    />
                </Col>
            </Row>

            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}
            <Table
                size="sm"
                status={events.status}
                thead={[
                    "Judul",
                    "Tanggal",
                    "Tempat",
                    "Kategori",
                    "Pembicara",
                    "Status",
                    "Aksi",
                ]}
                data={events.data}
                tbody={[
                    "title",
                    "date",
                    "venue",
                    "category",
                    "talent",
                    "status",
                ]}
                editUrl={`/events`}
                deleteAction={(id) => handleDelete(id)}
                customAction={(id, status = "") => {
                    return (
                        <SButton
                            className={"mx-2"}
                            variant="primary"
                            size={"sm"}
                            action={() => handleChangeStatus(id, status)}>
                            Change Status
                        </SButton>
                    );
                }}
                withoutPagination
            />
        </Container>
    );
}

export default EventsPage;
