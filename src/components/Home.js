import React from "react";
export default function Home(props) {
    const { isLoggedIn } = props;

    if (isLoggedIn) return <div>Welcome back, pal</div>;
    return <div>Please login</div>;
}
