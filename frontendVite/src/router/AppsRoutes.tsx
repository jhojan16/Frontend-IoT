import { Routes, Route } from "react-router-dom";
import NavBar from "../main/NavBar";
import Dashboard from "../Apps/Dashboard/Dashboard";
import Viewall from "../Apps/Dashboard/ViewAll";
import DashboardTienda from "../Apps/Dashboard/DashboardTienda";
import DashboardAdmin from "../Apps/Dashboard/DashboardAdmin";
import About from "../Apps/common/about";
import Team from "../Apps/Dashboard/DashMascotas";
import DetailNodo from "../Apps/Dashboard/DetailNodo";
import Pedido from "../Apps/Dashboard/Pedidos";

const AppsRoutes = () => {
    return (
        <NavBar>
            <Routes>
                {/* Rutas para Cliente*/}
                <Route path="/about" element={<About />} />
                <Route path="/cliente" element={<Dashboard />} />
                <Route path="/cliente/:id" element={<Viewall />} />
                <Route path="/cliente/dogs" element={<Pedido />} />
            </Routes>
            <Routes>
                {/* Rutas para Administrador*/}
                <Route path="/admin" element={<DashboardAdmin />} />
                {/* Rutas para tienda*/}
                <Route path="/tienda" element={<DashboardTienda />} />
                <Route path="/tienda/dogs" element={<Team />} />
                <Route path="/tienda/dogs/:id" element={<DetailNodo />} />
            </Routes>
        </NavBar>
    )
}
export default AppsRoutes