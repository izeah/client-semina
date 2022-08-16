import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/TableWithAction";
import { accessCategories } from "../../const/access";
import {
    fetchCategories,
    setKeyword,
    setPage,
} from "../../redux/categories/actions";
import { setNotif } from "../../redux/notif/actions";
import { deleteData } from "../../utils/fetch";

function CategoriesPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notif = useSelector((state) => state.notif);
    const categories = useSelector((state) => state.categories);
    const [access, setAccess] = useState({
        tambah: false,
        edit: false,
        hapus: false,
    });

    const checkAccess = () => {
        let { role } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};
        const access = { tambah: false, hapus: false, edit: false };
        Object.keys(accessCategories).forEach(function (key) {
            if (accessCategories[key].indexOf(role) >= 0) {
                access[key] = true;
            }
        });
        setAccess(access);
    };

    useEffect(() => {
        checkAccess();
    }, []);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch, categories.page, categories.keyword]);

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

                {access.tambah && (
                    <SButton
                        className="mb-3"
                        action={() => navigate("/categories/create")}>
                        Tambah
                    </SButton>
                )}

                <SearchInput
                    className="mb-3"
                    query={categories.keyword}
                    handleChange={(e) => {
                        dispatch(setPage(1));
                        dispatch(setKeyword(e.target.value));
                    }}
                />

                {notif.status && (
                    <SAlert type={notif.typeNotif} message={notif.message} />
                )}

                <Table
                    status={categories.status}
                    thead={["Nama", "Aksi"]}
                    data={categories.data}
                    tbody={["name"]}
                    editUrl={access.edit ? `/categories` : null}
                    deleteAction={
                        access.hapus ? (id) => handleDelete(id) : null
                    }
                    total={categories.total}
                    limit={categories.limit}
                    pages={categories.pages}
                    page={categories.page}
                    handlePageClick={({ selected }) =>
                        dispatch(setPage(selected + 1))
                    }
                />
            </Container>
        </>
    );
}

export default CategoriesPage;
