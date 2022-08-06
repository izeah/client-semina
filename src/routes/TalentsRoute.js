import { Route, Routes } from "react-router-dom";
import TalentsPage from "../pages/talents";
import Create from "../pages/talents/create";
import Edit from "../pages/talents/edit";

export default function TalentsRoute() {
    return (
        <Routes>
            <Route path="/" element={<TalentsPage />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id/edit" element={<Edit />} />
        </Routes>
    );
}
