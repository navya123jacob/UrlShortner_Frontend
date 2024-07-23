
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoute, PublicRoute };
