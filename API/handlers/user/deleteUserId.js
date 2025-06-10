import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

// Función para eliminar un usuario por ID
export default async function deleteUserId(req, res) {
  try {
    const { id } = req.params;

    const userRef = usersCollection.doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await userRef.delete();

    res.json({ message: `Usuario con ID ${id} eliminado` });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};