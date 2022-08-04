import React from "react";
import { useParams } from "react-router-dom";

function CategoriesDetail() {
    const { id } = useParams(); // destructuring params object
    return (
        <>
            <h1>Categories Detail</h1>
            <h3>ID : {id}</h3>
        </>
    );
}

export default CategoriesDetail;
