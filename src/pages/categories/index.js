import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SNavbar from "../../components/Navbar";
import { seminaApiUrl } from "../../config";

function PageCategories() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getCategoriesAPI = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${seminaApiUrl}/cms/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsLoading(false);
                setData(res.data.data);
            } catch (err) {
                setIsLoading(false);
                console.log(err);
            }
        };
        getCategoriesAPI();
    }, []);

    if (!token) return <Navigate to="/signin" replace={true} />;

    return (
        <>
            <SNavbar />
            <Container>
                <SBreadCrumb textSecond="Categories" />

                <SButton action={() => navigate("/categories/create")}>
                    Tambah
                </SButton>

                <Table className="mt-3" striped bordered hover variant="black">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={data.length + 1}
                                    style={{ textAlign: "center" }}>
                                    <div className="flex items-center justify-center">
                                        <Spinner
                                            animation="grow"
                                            variant="light"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>Update</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default PageCategories;
