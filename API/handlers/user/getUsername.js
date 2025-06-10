import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

export default async function getUsername (req, res) {
  const { username } = req.params;
  try {
    const snapshot = await usersCollection.where('username', '==', username).get();
    if (snapshot.empty) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const userData = snapshot.docs[0].data();
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error en solicitud Username:', error);
    return res.status(500).json({ error: 'Error interno del servidor'});
  }
};