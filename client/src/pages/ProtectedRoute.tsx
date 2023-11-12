import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const ProtectedRoute = () => {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
