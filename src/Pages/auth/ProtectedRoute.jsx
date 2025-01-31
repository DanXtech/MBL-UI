// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase';

const ProtectedRoute = ({ children }) => {
    if (!auth.currentUser) {
        // Redirect them to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;