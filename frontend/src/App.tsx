import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Legal from './pages/Legal'

/**
 * Site vitrine : une landing et trois pages légales. Aucune route de compte —
 * l'inscription, la connexion et le budget vivent dans l'application mobile,
 * qui consomme directement l'API.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cgu" element={<Legal doc="cgu" />} />
        <Route path="/confidentialite" element={<Legal doc="confidentialite" />} />
        <Route path="/mentions-legales" element={<Legal doc="mentions-legales" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
