// src/pages/HomePage.jsx
import { Spinner, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

    const navigate = useNavigate();

    const deleteToken = () => {
        // Eliminar el token del sessionStorage
        sessionStorage.removeItem('token');
        // Redirigir al usuario a la página login
        navigate('/login', { replace: true }); // 'replace: true' para no dejar la página protegida en el historial
    }

  return (
    <Container className="mt-5 d-flex justify-content-center flex-column align-items-center">

        <button className='btn btn-outline-dark p-3 mb-2' disabled>
            <Spinner className='py-1' animation="grow" variant="light" role="status">🍕</Spinner>
                <span role='status'> Paciencia, estamos esperando la pizza pepperoni! </span>
            <Spinner className='py-1' animation="grow" variant="light" role="status">🍕</Spinner>
        </button>

        <button className='btn btn-outline-success mb-3' onClick={() => navigate('/wastestore')}>
            Ir a la gestión de residuos
        </button>
        <button className='btn btn-outline-warning' onClick={deleteToken}>⚠️ Eliminar token ⚠️</button>

    </Container>
  );
}