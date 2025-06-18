import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import InputField from '../components/InputField.jsx';
import handleLoginSubmit from '../handlers/users/handleLoginSubmit.js';

export default function LoginUser() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate()

    return(
        <Container className="mt-5 d-flex justify-content-center">
        <div className="p-4 border rounded shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="mb-4 text-center">Identificación de Usuario</h2>

          <Form onSubmit={(event) => handleLoginSubmit(event, setMessage, setMessageType, navigate)}>
            {/* Campo: Nombre de Usuario */}
            <InputField
                label= "Nombre de Usuario" name="username"
                type="text" placeholder="Introduce tu nombre de usuario"
                value={username} setValue={setUsername}
            />  
            {/* Campo: Contraseña */}
            <InputField
                label= "Contraseña" name="password"
                type="password" placeholder="Introduce tu contraseña"
                value={password} setValue={setPassword}
            />   
            {/* Botón de Envío */}
            <Button variant="success" type="submit" className="w-100">Iniciar Sesión</Button>

          </Form>
        {/* Componente Alert para mostrar mensajes al usuario */}
        <h2 className={`alert alert-${messageType} mt-3 mb-0 p-1 text-center`}>
            {message}
        </h2>
        </div>
      </Container>
    )
}