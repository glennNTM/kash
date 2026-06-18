import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Statistiques from './pages/Statistiques'
import Historique from './pages/Historique'
import Objectifs from './pages/Objectifs'
import Profil from './pages/Profil'
import ProtectedRoute from './components/auth/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login mode="login" />} />
        <Route path="/sign-up" element={<Login mode="register" />} />
        {/* Routes privées : garde de session */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statistiques" element={<Statistiques />} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/objectifs" element={<Objectifs />} />
            <Route path="/profil" element={<Profil />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
