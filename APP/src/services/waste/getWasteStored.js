import { SystemError } from "com/errors/errors.js"

export default async function getWasteStored (code, container, status, month, year, locationType, locationArea, locationReference) {
  try {
    // Creamos un objeto URLSearchParams para construir la cadena de consulta
    const params = new URLSearchParams();

    // Añadimos los parámetros que existan (no sean nulos ni indefinidos)
    if (code) params.append('code', code);
    if (container) params.append('container', container);
    if (status) params.append('status', status);
    if (month) params.append('month', month);
    if (year) params.append('year', year);
    if (locationType) params.append('locationType', locationType);
    if (locationArea) params.append('locationArea', locationArea);
    if (locationReference) params.append('locationReference', locationReference);

    // Realizamos la llamada a la API con la URL dinámica
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}waste?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await apiResponse.json();

    if (!apiResponse.ok) { // no exito!
      throw new SystemError(result.message || 'Error al obtener los residuos almacenados');
    }

    return result; // exito!
  } catch (error) { // Fallo con servidor
    throw new SystemError(error.message || '❌ Error inesperado en el servidor ❌');
  }
}
