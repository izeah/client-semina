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
import { deleteData } from "../../utils/fetch";

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
                        `berhasil hapus talent ${res.data.data.name}`
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
                    />
                </Col>
            </Row>

            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}
            <Table
                status={events.status}
                thead={[
                    "Judul",
                    "Tanggal",
                    "Tempat",
                    "Kategori",
                    "Pembicara",
                    "Aksi",
                ]}
                data={events.data}
                tbody={[
                    "title",
                    "date",
                    "venueName",
                    "categoryName",
                    "talentName",
                ]}
                editUrl={`/events`}
                deleteAction={(id) => handleDelete(id)}
                withoutPagination
            />
        </Container>
    );
}

export default EventsPage;
