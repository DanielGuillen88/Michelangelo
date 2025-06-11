import { NotFoundError } from 'com/errors/errors.js';
import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

export default async function getAllUsernames (req, res, next) {
  try {

    const snapshot = await usersCollection.get();
    const usernames = snapshot.docs.map(doc => doc.data().username);

    if (!usernames.length) {
      return next(new NotFoundError('❌ No hay nombres de Usuario disponibles ❌'))
    }
    
    res.status(200).json({message: '👥 Usuarios registrados: ', usernames});
  } catch (error) {
    console.error('Error en solicitud usernames:', error);
    next(error);  // Pasar el error al manejador de errores
  }
};
