
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './layout/Login'
import AccesoLayout from './layout/AccesoLayout'
import RecuperarContraseña from './pages/recuperarContraseña'
import ConfirmarContraseña from './pages/ConfirmarContraseña'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Dashboard from './layout/Dashboard'
import IndexDashboard from './pages/IndexDashboard'
import ViewUsuarios from './pages/usuarios/ViewUsuarios'
import ViewPerfil from './pages/perfils/ViewPerfil'
import { InventarioProvider } from './context/InventarioProvider'
import ViewProductos from './pages/productos/ViewProductos'
import { AuthProvider } from './context/AuthProvider'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InventarioProvider>
          <Routes>
            <Route path="/" element={<AccesoLayout />}>
              <Route index element={<Login />} />
              <Route path='olvide-password' element={<RecuperarContraseña />} />
              <Route path='olvide-password/:token' element={<ConfirmarContraseña />} />
              <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<IndexDashboard />} />
              <Route path='usuarios' element={<ViewUsuarios />} />
              <Route path='perfils' element={<ViewPerfil />} />
              <Route path='productos' element={<ViewProductos />} />
            </Route>
          </Routes>
        </InventarioProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
