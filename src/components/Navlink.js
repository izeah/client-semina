import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavLink({ role, roles, to, children }) {
    let isHas = roles.indexOf(role);
    return (
        <>
            {isHas >= 0 && (
                <Nav.Link as={Link} to={to}>
                    {children}
                </Nav.Link>
            )}
        </>
    );
}
