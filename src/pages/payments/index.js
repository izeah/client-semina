import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SAlert from "../../components/Alert";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import { accessPayments } from "../../const/access";
import { setNotif } from "../../redux/notif/actions";
import { fetchPayments } from "../../redux/payments/actions";
import { deleteData } from "../../utils/fetch";

function PaymentsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notif = useSelector((state) => state.notif);
    const payments = useSelector((state) => state.payments);

    const [access, setAccess] = useState({
        tambah: false,
        hapus: false,
        edit: false,
    });

    const checkAccess = () => {
        let { role } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};
        const access = { tambah: false, hapus: false, edit: false };
        Object.keys(accessPayments).forEach(function (key) {
            if (accessPayments[key].indexOf(role) >= 0) {
                access[key] = true;
            }
        });
        setAccess(access);
    };

    useEffect(() => {
        checkAccess();
    }, []);

    useEffect(() => {
        dispatch(fetchPayments());
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
                const res = await deleteData(`/cms/payments/${id}`);

                dispatch(
                    setNotif(
                        true,
                        "success",
                        `berhasil hapus metode pembayaran ${res.data.data.type}`
                    )
                );

                dispatch(fetchPayments());
            }
        });
    };

    return (
        <Container className="mt-3">
            <BreadCrumb textSecond="Payments" />

            {access.tambah && (
                <Button
                    className="mb-3"
                    action={() => navigate("/payments/create")}>
                    Tambah
                </Button>
            )}

            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}

            <Table
                status={payments.status}
                thead={["Type", "Avatar", "Aksi"]}
                data={payments.data}
                tbody={["type", "avatar"]}
                editUrl={access.edit ? `/payments` : null}
                deleteAction={access.hapus ? (id) => handleDelete(id) : null}
                withoutPagination
            />
        </Container>
    );
}

export default PaymentsPage;
