import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const { pathname } = useLocation();
    const { isAdminAuthenticated } = useSelector((state) => state.user)
    const permissions = JSON.parse(localStorage.getItem("perm") || "{}"); // Ensure safe parsing
    const navigate = useNavigate();
    const value = pathname.split("/admin/").join("").split("/")[0];

    useEffect(() => {
        if (!isAdminAuthenticated || !permissions || permissions[value] === "none") {
            navigate("/admin/login");
        }
    }, [permissions, pathname, isAdminAuthenticated, value, navigate]);

    // Only render the Outlet if the user has the required permissions
    if (pathname.includes("/admin/") && isAdminAuthenticated && value && permissions[value] !== "none") {
        return <Outlet />;
    }

    return null;
};

export default PrivateRoute;
