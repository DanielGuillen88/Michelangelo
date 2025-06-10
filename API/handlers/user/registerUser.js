import bcrypt from 'bcryptjs';
import { db } from '../../firebase.js';

const usersCollection = db.collection('users');

// Función para registrar un nuevo usuario
export default async function registerUser(req, res) {
  try {
    const { username, password, code } = req.body;
    
    const ACCESS_CODES = {
      [process.env.ADMIN_CODE]: 'admin',
      [process.env.VEHICULOS_CODE]: 'vehiculos',
      [process.env.ALMACEN_CODE]: 'almacen'
    };

    if (!username || !password || !code) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const access = ACCESS_CODES[code];
    if (!access) {
      return res.status(400).json({ error: 'Código de acceso inválido' });
    }

    const existingUser = await usersCollection.where('username', '==', username).limit(1).get();

    if (!existingUser.empty) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.add({
      username,
      password: hashedPassword,
      access
    });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}