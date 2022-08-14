import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavLink({ role, roles, to, isActive, children }) {
    let isHas = roles.indexOf(role);
    return (
        <>
            {isHas >= 0 && (
                <Nav.Link as={Link} to={to} active={isActive}>
                    {children}
                </Nav.Link>
            )}
        </>
    );
}
