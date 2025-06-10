import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

export default async function getAllUsernames (req, res) {
  try {
    const snapshot = await usersCollection.get();
    const usernames = snapshot.docs.map(doc => doc.data().username);
    return res.status(200).json(usernames);
  } catch (error) {
    console.error('Error en solicitud usernames:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
