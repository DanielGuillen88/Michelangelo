import bcrypt from 'bcryptjs';
import { db } from '../../firebase.js';
import validate from 'com/validation/validateUsers.js';
import { CredentialsError, DuplicityError } from 'com/errors/errors.js';

const usersCollection = db.collection('users');

export default async function registerUser(req, res, next) {  // Función para registrar un nuevo usuario

  try {
    const { username, password, code } = req.body;
    
    const ACCESS_CODES = {
      [process.env.ADMIN_CODE]: 'admin',
      [process.env.VEHICULOS_CODE]: 'vehiculos',
      [process.env.ALMACEN_CODE]: 'almacen'
    };

    try {
      validate.username(username);
      validate.password(password);
      validate.code(code);
    } catch (validationError) {
      return next(validationError);
    }

    const access = ACCESS_CODES[code];  // Validar el código de acceso

    if (!access) {
      return next(new CredentialsError('❌ Código de acceso inválido, prueba de nuevo o solicita uno nuevo al administrador ❌'));
    }

    const existingUser = await usersCollection.where('username', '==', username).limit(1).get();  // evitar duplicados

    if (!existingUser.empty) {
      return next(new DuplicityError('❌ El nombre de usuario no está disponible, elige otro ❌'));
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashear la contraseña

    await usersCollection.add({ username, password: hashedPassword, access });  // Registrar el usuario en la base de datos

    res.status(201).json({ message: `👤 Usuario ${username} registrado correctamente! ✅` });
  } catch (error) {
      console.error('Error al registrar usuario:', error);
      next(error);  // Pasar el error al manejador de errores
    }
}