import { Routes, Route } from "react-router-dom";
import NavBar from "../main/NavBar";
import Dashboard from "../Apps/Dashboard/Dashboard";
import Viewall from "../Apps/Dashboard/ViewAll";
import DashboardTienda from "../Apps/Dashboard/DashboardTienda";
import DashboardAdmin from "../Apps/Dashboard/DashboardAdmin";
import About from "../Apps/common/about";
import Team from "../Apps/common/team";

const AppsRoutes = () => {
    return (
        <NavBar>
            <Routes>
                {/* Rutas para Cliente*/}
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/cliente" element={<Dashboard />} />
                <Route path="/cliente/:id" element={<Viewall />} />
            </Routes>
            <Routes>
                {/* Rutas para Administrador*/}
                <Route path="/admin" element={<DashboardAdmin />} />
                {/* Rutas para tienda*/}
                <Route path="/tienda" element={<DashboardTienda />} />
            </Routes>
        </NavBar>
    )
}
export default AppsRoutes