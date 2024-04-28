import { Routes, Route } from "react-router-dom";
import NavBar from "../dashboard/NavBar";
import Dashboard from "../dashboard/Dashboard";
import Viewall from "../dashboard/Viewall";

const AppsRoutes = () => {
    return (
        <NavBar>
            <Routes>
                <Route path="/dashboard/:idnodo" element={<Dashboard />} />
                <Route path="/dashboard/:idnodo/:idnodo" element={<Viewall />} />
            </Routes>
        </NavBar>
    )
}
export default AppsRoutes