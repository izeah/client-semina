import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    accessCategories,
    accessEvents,
    accessOrders,
    accessParticipant,
    accessPayments,
    accessTalents,
} from "../const/access";
import { userLogout } from "../redux/auth/actions";
import NavLink from "./Navlink";

function SNavbar() {
    const dispatch = useDispatch();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            let { role } = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth"))
                : {};

            setRole(role);
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        dispatch(userLogout());
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">
                    Dashboard
                </Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to="/" role={role} roles={accessCategories.lihat}>
                        Home
                    </NavLink>
                    <NavLink
                        to="/categories"
                        role={role}
                        roles={accessCategories.lihat}>
                        Categories
                    </NavLink>
                    <NavLink
                        to="/talents"
                        role={role}
                        roles={accessTalents.lihat}>
                        Talents
                    </NavLink>
                    <NavLink
                        to="/payments"
                        role={role}
                        roles={accessPayments.lihat}>
                        Payments
                    </NavLink>
                    <NavLink
                        to="/events"
                        role={role}
                        roles={accessEvents.lihat}>
                        Events
                    </NavLink>
                    <NavLink
                        to="/participant"
                        role={role}
                        roles={accessParticipant.lihat}>
                        Participant
                    </NavLink>
                    <NavLink
                        to="/orders"
                        role={role}
                        roles={accessOrders.lihat}>
                        Orders
                    </NavLink>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default SNavbar;
