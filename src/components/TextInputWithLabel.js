import React from "react";
import { Form } from "react-bootstrap";
import TextInput from "./TextInput";

function TextInputWithLabel({
    label,
    name,
    value,
    type,
    onChange,
    placeholder,
}) {
    return (
        <Form.Group className="mb-2">
            <Form.Label>{label}</Form.Label>
            <TextInput
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
            />
        </Form.Group>
    );
}

export default TextInputWithLabel;
