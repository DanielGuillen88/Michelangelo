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
    <Container className="text-center mt-5">

        <button className='btn btn-outline-dark p-3 mb-2' disabled>
            <Spinner className='py-1' animation="grow" variant="light" role="status">🍕</Spinner>
                <span role='status'> Paciencia, estamos esperando la pizza pepperoni! </span>
            <Spinner className='py-1' animation="grow" variant="light" role="status">🍕</Spinner>
        </button>

        <button className='btn btn-outline-warning' onClick={deleteToken}>⚠️ Eliminar token ⚠️</button>

    </Container>
  );
}