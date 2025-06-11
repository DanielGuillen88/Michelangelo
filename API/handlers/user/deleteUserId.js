import { db } from '../../firebase.js';
import { NotFoundError } from 'com/errors/errors.js';

const usersCollection = db.collection('users');

export default async function deleteUserId(req, res, next) {
  try {// Función para eliminar un usuario por ID
    const { id } = req.params;

    const userRef = usersCollection.doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return next(new NotFoundError('❌ Usuario no encontrado. ❌'));
    }

    const userData = doc.data(); // consulta doc para obtener username
    const username = userData.username;

    await userRef.delete();

    res.json({ message: `👤 Usuario ${username} eliminado correctamente ✅` });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    next(error);  // Pasar el error al manejador de errores
  }
};