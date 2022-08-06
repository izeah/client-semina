import React from "react";
import { Form } from "react-bootstrap";

function SearchInput({ handleChange, query, disabled }) {
    return (
        <Form.Group className="mt-3 mb-3">
            <Form.Control
                type="text"
                placeholder="Masukkan pencarian di sini"
                name="query"
                onChange={handleChange}
                value={query}
                disabled={disabled}
            />
        </Form.Group>
    );
}

export default SearchInput;
