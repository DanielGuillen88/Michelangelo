import { db } from '../../firebase.js';
import { NotFoundError } from 'com/errors/errors.js';
import { getLocationDescription } from '../../utils/locationMessages.js';

const wasteCollection = db.collection('waste');

export default async function deleteWaste(req, res, next) {
  try {// Función para eliminar un residuo por ID
    const { id } = req.params;
    
    if (!id) {
        return next(new NotFoundError('❌ Error al eliminar residuo, falta id ❌'));
    }

    const wasteId = wasteCollection.doc(id);
    const doc = await wasteId.get();

    if (!doc.exists) {
      return next(new NotFoundError('❌ Residuo no encontrado ❌'));
    }

    const wasteData = doc.data(); // consulta doc para obtener code y location
    const code = wasteData.code;
    const location = wasteData.location;
   
    const locationDescription = getLocationDescription(location);

    await wasteId.delete();

    res.json({ message: `📦 Residuo ${code} en ${locationDescription} eliminado correctamente ✅` });
  } catch (error) {
    console.error('Error al eliminar residuo:', error);
    next(error);  // Pasar el error al manejador de errores
  }
};