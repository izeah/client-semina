import React from "react";
import { Button } from "react-bootstrap";

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
            {loading ? "Loading..." : children}
        </Button>
    );
}

export default SButton;