import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { listen } from "./redux/listener";
import AppRoutes from "./routes";

function App() {
    useEffect(() => {
        listen();
    }, []);

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
