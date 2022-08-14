import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    } - ${orders.date?.endDate ? formatDate(orders.date?.endDate) : ""}`;

    return (
        <Container className="mt-3">
            <SBreadCrumb textSecond="Orders" />
            <Row>
                <Col sm={4} md={4} lg={4}>
                    <SearchInput
                        query={displayDate}
                        handleClick={() => setIsShowed(true)}
                        className="cursor-pointer position-relative"
                        readOnly
                    />
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

            <Table
                size="sm"
                status={orders.status}
                thead={[
                    "Nama",
                    "Email",
                    "Tanggal Order",
                    "Judul Acara",
                    "Tanggal Acara",
                    "Tempat Acara",
                    "Status",
                ]}
                data={orders.data}
                tbody={[
                    "name",
                    "email",
                    "date",
                    "title",
                    "eventDate",
                    "venueName",
                    "status",
                ]}
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
