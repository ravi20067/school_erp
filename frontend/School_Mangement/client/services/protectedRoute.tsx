import { Navigate } from "react-router-dom";
import { useAuth } from "@/services/authContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute = ({
    children,
    allowedRoles,
}: ProtectedRouteProps) => {

    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;