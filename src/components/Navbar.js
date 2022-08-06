import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { categories } from "../const/access";
import NavLink from "./Navlink";

function SNavbar() {
    const navigate = useNavigate();
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
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink
                        action={() => navigate("/")}
                        role={role}
                        roles={categories.lihat}>
                        Home
                    </NavLink>
                    <NavLink
                        action={() => navigate("/categories")}
                        role={role}
                        roles={categories.lihat}>
                        Categories
                    </NavLink>
                    <NavLink
                        action={() => navigate("/talents")}
                        role={role}
                        roles={categories.lihat}>
                        Talents
                    </NavLink>
                    <NavLink
                        action={() => navigate("/events")}
                        role={role}
                        roles={categories.lihat}>
                        Events
                    </NavLink>
                    <NavLink
                        action={() => navigate("/participant")}
                        role={role}
                        roles={categories.lihat}>
                        Participant
                    </NavLink>
                    <NavLink
                        action={() => navigate("/transactions")}
                        role={role}
                        roles={categories.lihat}>
                        Transactions
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default SNavbar;
