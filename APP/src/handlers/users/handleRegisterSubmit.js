import registerUser from '../../services/users/registerUser.js';
import validate from 'com/validation/validateUsers.js';

export default async function handleRegisterSubmit(event, setMessage, setMessageType) {
    event.preventDefault();

    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    const passwordRepeat = form.passwordRepeat.value;
    const code = form.code.value;

    try {
        validate.username(username);
        validate.password(password);
        validate.passwordRepeat(password, passwordRepeat);
        validate.code(code);

        const userRegistration = { username, password, code }; 
        await registerUser(userRegistration);

        setMessage(`👤 Usuario ${username} registrado correctamente ✅`);
        setMessageType('success');

        setTimeout(() => {
            setMessage('Redirigiendo a la página de identificación...');
            setMessageType('info'); 

            // setTimeout(() => {
            //     // navigate('/login'); // Esto estaría aquí cuando se implemente navigate
            // }, 3000); 

        }, 3000);

    } catch (error) {
        setMessage(error.message);
        setMessageType('danger');

        // setTimeout(() => {
        //     setMessage('');
        //     setMessageType('');
        // }, 5000); 
    }
}