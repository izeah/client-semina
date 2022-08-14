import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import DateRange from "../../components/InputDate";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/TableWithAction";
import { fetchListEvents } from "../../redux/lists/actions";
import { fetchOrders, setDate, setPage } from "../../redux/orders/actions";
import { formatDate } from "../../utils/formatDate";

function OrdersPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);
    const notif = useSelector((state) => state.notif);
    const orders = useSelector((state) => state.orders);

    const [isShowed, setIsShowed] = useState(false);

    useEffect(() => {
        return () => {
            if (!user.token) return navigate("/login");
        };
    });

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch, orders.page, orders.date]);

    useEffect(() => {
        dispatch(fetchListEvents());
    }, [dispatch]);

    const displayDate = `${
        orders.date?.startDate ? formatDate(orders.date?.startDate) : ""
    }${orders.date?.endDate ? formatDate(orders.date?.endDate) : ""}`;

    return (
        <Container className="mt-3">
            <SBreadCrumb textSecond="Orders" />
            <Row>
                <Col
                    className="cursor-pointer position-relative"
                    onClick={() => setIsShowed(true)}>
                    <SearchInput disabled query={displayDate} />
                    {isShowed ? (
                        <DateRange
                            date={orders.date}
                            setIsShowed={() => setIsShowed(!isShowed)}
                            onChangeDate={(ranges) =>
                                dispatch(setDate(ranges.selection))
                            }
                        />
                    ) : (
                        ""
                    )}
                </Col>
            </Row>

            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}
            <Table
                status={orders.status}
                thead={["Nama", "Email", "Judul", "Tanggal", "Tempat"]}
                data={orders.data}
                tbody={["name", "email", "title", "date", "venueName"]}
                pages={orders.pages}
                actionNotDisplay
                handlePageClick={({ selected }) =>
                    dispatch(setPage(selected + 1))
                }
            />
        </Container>
    );
}

export default OrdersPage;
