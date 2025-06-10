import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

// Función para iniciar sesión de un usuario
export default async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan credenciales' });
    }

    const userSnapshot = await usersCollection.where('username', '==', username).limit(1).get();

    if (userSnapshot.empty) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { uid: userDoc.id, username: userData.username, access: userData.access },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, access: userData.access });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}