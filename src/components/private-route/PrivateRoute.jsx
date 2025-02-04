import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const { pathname } = useLocation();
    const adminStatus = localStorage.getItem("admin-status");
    const permissions = JSON.parse(localStorage.getItem("perm"));
    const navigate = useNavigate();
    const value = pathname.split("/admin/").join("").split("/")[0]
    console.log("permissions", permissions);

    if (pathname.includes("/admin/") && adminStatus && value && permissions && permissions[value] !== "none") {
        return <Outlet />;
    }
    else {
        if (!permissions) {
            navigate("/admin/login")
        }
        else {
            navigate(-1);
        }
        return null;
    }
}

export default PrivateRoute