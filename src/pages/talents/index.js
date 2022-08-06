import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/TableWithAction";
import { setNotif } from "../../redux/notif/actions";
import { fetchTalents, setKeyword } from "../../redux/talents/actions";
import { deleteData } from "../../utils/fetch";

function TalentsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notif = useSelector((state) => state.notif);
    const talents = useSelector((state) => state.talents);

    useEffect(() => {
        dispatch(fetchTalents());
    }, [dispatch, talents.keyword]);

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
                const res = await deleteData(`/cms/talents/${id}`);

                dispatch(
                    setNotif(
                        true,
                        "success",
                        `berhasil hapus talent ${res.data.data.name}`
                    )
                );

                dispatch(fetchTalents());
            }
        });
    };

    return (
        <Container className="mt-3">
            <SBreadCrumb textSecond={"Talents"} text />
            <SButton action={() => navigate("/talents/create")}>Tambah</SButton>
            <SearchInput
                name="keyword"
                query={talents.keyword}
                handleChange={(e) => dispatch(setKeyword(e.target.value))}
            />
            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}
            <Table
                status={talents.status}
                thead={["Nama", "Role", "Avatar", "Aksi"]}
                data={talents.data}
                tbody={["name", "role", "avatar"]}
                editUrl={`/talents`}
                deleteAction={(id) => handleDelete(id)}
                withoutPagination
            />
        </Container>
    );
}

export default TalentsPage;
