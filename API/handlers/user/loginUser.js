import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../firebase.js';
import validate from 'com/validation/validateUsers.js';
import { ContentError, CredentialsError } from 'com/errors/errors.js';

const usersCollection = db.collection('users');

export default async function loginUser(req, res, next) { // Función para iniciar sesión de un usuario
  try {
    const { username, password } = req.body;

    if (!username){
      return next(new ContentError('❌ Nombre de usuario requerido ❌'))
    }

    if (!password){
      return next(new ContentError('❌ Contraseña de usuario requerida ❌'))
    }

    // usuario registrado?
    const userSnapshot = await usersCollection.where('username', '==', username).limit(1).get();

    if (userSnapshot.empty) {
      return next(new CredentialsError('❌ Nombre de usuario incorrecto ❌'));
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    // comparar contraseña introducida con  almacenada
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) {
      return next(new CredentialsError('❌ Contraseña de usuario incorrecta ❌'));
    }

    const token = jwt.sign(
      { uid: userDoc.id, username: userData.username, access: userData.access },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, access: userData.access, message: `👤 Usuario ${username} autenticado ✅` });
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    next(error);  // Pasar el error al manejador de errores
  }
}