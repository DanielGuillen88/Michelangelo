import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

// función para eliminar un usuario por username
export default async function deleteUser(req, res) {    

    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).json({ error: 'Falta el username' });
      }
  
      // Buscar usuario
      const userSnapshot = await usersCollection.where('username', '==', username).limit(1).get();
  
      if (userSnapshot.empty) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const userDoc = userSnapshot.docs[0];
      await usersCollection.doc(userDoc.id).delete();
  
      res.status(200).json({ message: `Usuario '${username}' eliminado correctamente` });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };