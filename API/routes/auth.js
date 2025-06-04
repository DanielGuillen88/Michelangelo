import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../firebase.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const ACCESS_CODES = {
  [process.env.ADMIN_CODE]: 'admin',
  [process.env.VEHICULOS_CODE]: 'vehiculos',
  [process.env.ALMACEN_CODE]: 'almacen'
};

router.post('/register', async (req, res) => {
  try {
    const { username, password, code } = req.body;

    if (!username || !password || !code) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const access = ACCESS_CODES[code];
    if (!access) {
      return res.status(400).json({ error: 'Código de acceso inválido' });
    }

    // Buscar si ya existe un usuario con ese username
    const existingUser = await db
      .collection('users')
      .where('username', '==', username)
      .limit(1)
      .get();

    if (!existingUser.empty) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario con ID aleatorio
    await db.collection('users').add({
      username,
      password: hashedPassword,
      access,
    //   createdAt: new Date().toISOString()
    });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
