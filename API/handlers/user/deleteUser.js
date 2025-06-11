import { NotFoundError } from 'com/errors/errors.js';
import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

export default async function deleteUser(req, res, next) { // función para eliminar un usuario por username
    try {
      const { username } = req.body;

      if (!username) {
        return next (new NotFoundError('❌ Falta el username ❌'));
      }
  
      // Buscar usuario
      const userSnapshot = await usersCollection.where('username', '==', username).limit(1).get();
  
      if (userSnapshot.empty) {
        return next(new NotFoundError('❌ Usuario no encontrado ❌'));
      }
  
      const userDoc = userSnapshot.docs[0];
      await usersCollection.doc(userDoc.id).delete();
  
      res.status(200).json({ message: `👤 Usuario '${username}' eliminado correctamente ✅` });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };