import { SystemError } from 'com/errors/errors.js'; // Ajusta la ruta si es necesario

export default async function createNewStoredWaste(newStoredWaste) {
        try {
                const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}waste/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newStoredWaste),
                });

                const result = await apiResponse.json();


                if (!apiResponse.ok) { // no exito!
                    throw new SystemError(result.message || '❌ Error al crear residuo almacenado ❌')
                }
                return result // exito!
            } catch (error) { // fallo con servidor
              throw new SystemError(error.message || '❌ Error inesperado en el servidor ❌')
            }
}