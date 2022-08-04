import React from "react";
import { Link } from "react-router-dom";

function Categories() {
    return (
        <table cellPadding={"10px"}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Fashion and Breads</td>
                    <td>
                        <Link
                            to={`/categories/43552352`}
                            style={{
                                padding: "5px",
                                background: "#FF3453",
                                borderRadius: "10%",
                                color: "white",
                            }}>
                            Detail
                        </Link>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Categories;
