import PropTypes from "prop-types";
import React from "react";
export default function Home(props) {
    const { isLoggedIn } = props;

    if (isLoggedIn) return <div>Welcome back, pal</div>;
    return <div>Please login</div>;
}

Home.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

Home.defaultProps = {
    isLoggedIn: false,
};
