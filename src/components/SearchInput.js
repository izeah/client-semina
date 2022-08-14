import React from "react";
import { Form } from "react-bootstrap";

function SearchInput({
    handleClick,
    handleChange,
    query,
    disabled,
    readOnly,
    className,
}) {
    return (
        <Form.Group className="mt-3 mb-3">
            <Form.Control
                type="text"
                placeholder="Masukkan pencarian di sini"
                name="query"
                onChange={handleChange}
                onClick={handleClick}
                value={query}
                disabled={disabled}
                className={className}
                readOnly={readOnly}
            />
        </Form.Group>
    );
}

export default SearchInput;
