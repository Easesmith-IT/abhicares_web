import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.user)

    // const isAuthenticated = JSON.parse(localStorage.getItem("user-status"));
    // console.log("isAuthenticated", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Outlet />
    )
};

export default ProtectedRoute;
