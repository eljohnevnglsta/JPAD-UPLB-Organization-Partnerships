import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Admin() {
    const user = JSON.parse(localStorage.getItem('account'));
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}