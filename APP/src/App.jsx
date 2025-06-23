import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'

import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginUser from './pages/LoginUser';
import RegisterUser from './pages/RegisterUser';
import AuthGuard from './components/AuthGuard';
import WasteStore from './pages/WasteStore';


export default function App() {
  return (
    <BrowserRouter>
      <Container className="mt-5">
        
        <h1 className='text-center'>COWABUNGA!</h1> 

        {/* Routes es el contenedor para todas tus definiciones de rutas */}
        <Routes>
          <Route path="/" element={< HomePage />} />

          <Route path="/login" element={<LoginUser />} />
          <Route path="/registro" element={<RegisterUser />} />

          {/* Aqui pondremos las rutas PROTEGIDAS */}
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/wastestore" element={<AuthGuard><WasteStore /></AuthGuard>} />

          {/* futura ruta para manejar URLs no encontradas (404) */}
          {/* <Route path="*" element={<h2>404 - Página No Encontrada</h2>} /> */}
        </Routes>

      </Container>
    </BrowserRouter>
  )
}