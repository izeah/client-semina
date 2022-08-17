import React from "react";
import { Button, Spinner } from "react-bootstrap";

function SButton({
    children,
    action,
    variant,
    size,
    loading,
    disabled,
    className,
}) {
    return (
        <Button
            onClick={action}
            variant={variant}
            size={size}
            disabled={disabled}
            className={className}>
            {loading ? (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                />
            ) : (
                ""
            )}
            {loading ? "Loading..." : children}
        </Button>
    );
}

export default SButton;
