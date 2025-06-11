import { NotFoundError } from 'com/errors/errors.js';
import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

export default async function getUsername (req, res, next) {
  const { username } = req.params;
  try {

    const snapshot = await usersCollection.where('username', '==', username).get();
    if (snapshot.empty) {
      return next(new NotFoundError('❌ Nombre de Usuario no encontrado ❌'));
    }

    const userData = snapshot.docs[0].data();
    return res.status(200).json({userData, message: `👤 Nombre de usuario: ${username} ✅`});
  } catch (error) {
    console.error('Error en solicitud Username:', error);
    next(error);  // Pasar el error al manejador de errores
  }
};