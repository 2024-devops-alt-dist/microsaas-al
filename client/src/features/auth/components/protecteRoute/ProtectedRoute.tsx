import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
    const { isAuthenticated } = useAuth();
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
