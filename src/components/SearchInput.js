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
        <Form.Group className={className}>
            <Form.Control
                type="text"
                placeholder="Masukkan pencarian di sini"
                name="query"
                onChange={handleChange}
                onClick={handleClick}
                value={query}
                disabled={disabled}
                readOnly={readOnly}
            />
        </Form.Group>
    );
}

export default SearchInput;
