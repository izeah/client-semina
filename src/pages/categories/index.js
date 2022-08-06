import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import Table from "../../components/TableWithAction";
import { fetchCategories } from "../../redux/categories/actions";
import { deleteData } from "../../utils/fetch";

function Categories() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notif = useSelector((state) => state.notif);
    const categories = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

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
                const res = await deleteData(`/cms/categories/${id}`);

                dispatch(
                    setNotif(
                        true,
                        "success",
                        `berhasil hapus kategori ${res.data.data.name}`
                    )
                );
                dispatch(fetchCategories());
            }
        });
    };
    return (
        <>
            <Container className="mt-3">
                <SBreadCrumb textSecond="Categories" />

                <SButton
                    className={"mb-3"}
                    action={() => navigate("/categories/create")}>
                    Tambah
                </SButton>

                {notif.status && (
                    <SAlert type={notif.typeNotif} message={notif.message} />
                )}

                <Table
                    status={categories.status}
                    thead={["Nama", "Aksi"]}
                    data={categories.data}
                    tbody={["name"]}
                    editUrl={`/categories/edit`}
                    deleteAction={(id) => handleDelete(id)}
                    withoutPagination
                />
            </Container>
        </>
    );
}

export default Categories;
