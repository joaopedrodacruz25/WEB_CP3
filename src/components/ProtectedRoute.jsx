import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth.js'

import Loader from './Loader.jsx'

export default function ProtectedRoute() {
    const { session, isAdmin, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <Loader label="Verificando acesso..." />
    }

    if (!session) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        )
        
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}