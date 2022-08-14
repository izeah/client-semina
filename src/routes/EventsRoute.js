import { Route, Routes } from "react-router-dom";
import EventsPage from "../pages/events";

export default function EventsRoute() {
    return (
        <Routes>
            <Route path="/" element={<EventsPage />} />
            {/* <Route path="/create" element={<Create />} />
            <Route path="/:id/edit" element={<Edit />} /> */}
        </Routes>
    );
}
