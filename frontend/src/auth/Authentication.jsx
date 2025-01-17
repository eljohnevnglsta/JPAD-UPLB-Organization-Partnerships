import { Navigate, Outlet } from "react-router-dom";

const Authentication = () => {
    const user = localStorage.getItem('account');

    // If no user is found, redirect to the login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If a user is found, render the protected routes
    return <Outlet />;
};

export default Authentication;
