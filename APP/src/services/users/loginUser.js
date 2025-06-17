import { SystemError } from 'com/errors/errors.js'; // Ajusta la ruta si es necesario

export default async function loginUser(userLogin) {
        try {
                const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userLogin),
                });

                const result = await apiResponse.json();

                if (!apiResponse.ok) { // no exito!
                    throw new SystemError(result.message || '❌ Error al autenticar usuario ❌')
                }
                sessionStorage.setItem('token', result.token)
                return result // exito!
            } catch (error) { // fallo con servidor
              throw new SystemError(error.message || '❌ Error inesperado en el servidor ❌')
            }
}