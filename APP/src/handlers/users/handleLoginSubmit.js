import validate from 'com/validation/validateUsers.js';
import loginUser from '../../services/users/loginUser.js';

export default async function handleLoginSubmit(event, setMessage, setMessageType, navigate) {
    event.preventDefault();

    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    try {
        validate.username(username);
        validate.password(password);

        const userLogin = { username, password }; 
        await loginUser(userLogin);

        setMessage(`👤 Usuario ${username} identificado correctamente ✅`);
        setMessageType('success');

        setTimeout(() => {
            setMessage('Redirigiendo a la página de gestión de residuos...');
            setMessageType('info'); 

            setTimeout(() => {
                navigate('/dashboard', { replace: true }); // 'replace: true' para no dejar la página protegida en el historial
            }, 3000); 

        }, 3000);

    } catch (error) {
        setMessage(error.message);
        setMessageType('danger');

        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000); 
    }
}