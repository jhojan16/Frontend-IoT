import { Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import SignIn from "../auth/SignIn";

const AppsRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppsRoutes