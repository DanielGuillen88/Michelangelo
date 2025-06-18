// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const redirectTimer = setTimeout(() => {
      if (token) {
        navigate('/dashboard'); // si hay token
      } else {
        navigate('/login'); // si no hay token
      }
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <Container className="text-center mt-5">

        <button className='btn btn-outline-success p-3' disabled>
            <Spinner className='py-1' animation="grow" variant="light" role="status">🍕</Spinner>
                <span role='status'> Comprobando sesión... </span>
            <Spinner className='py-1' animation="grow" variant="light" role="status">🍕</Spinner>
        </button>

    </Container>
  );
}