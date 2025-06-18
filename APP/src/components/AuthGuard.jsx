import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';

export default function AuthGuard({ children }) { // Componente que protege las rutas
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const redirectTimer = setTimeout(() => {
      if (!token) {      // Si no hay token, redirigir al login
        navigate('/login', { replace: true }); // 'replace: true' para no dejar la página protegida en el historial
      }
    }, 4000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);
  
  const token = sessionStorage.getItem('token'); // Comprobamos de nuevo para evitar renderizado accidental

  if (!token) {
    return (
      <Container className="text-center mt-5">
        
        <button className='btn btn-outline-danger p-3' disabled>
          <Spinner className='py-1' animation="grow" variant="light" role="status">⛔️</Spinner>
            <span role='status'> Acceso no autorizado, identifíquese... </span>
          <Spinner className='py-1' animation="grow" variant="light" role="status">⛔️</Spinner>
        </button>

      </Container>
    );
  }

  return children; // si hay token, renderizamos la página(protegida) solicitada
}