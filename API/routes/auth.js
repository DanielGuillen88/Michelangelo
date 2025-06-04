import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../firebase.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
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

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: 'Faltan credenciales' });
      }
  
      // Buscar usuario por nombre
      const userSnapshot = await db
        .collection('users')
        .where('username', '==', username)
        .limit(1)
        .get();
  
      if (userSnapshot.empty) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
  
      // Verificar contraseña
      const validPassword = await bcrypt.compare(password, userData.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      // Generar token JWT
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
  });

  router.delete('/delete-user', async (req, res) => {
    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).json({ error: 'Falta el username' });
      }
  
      // Buscar usuario
      const userSnapshot = await db
        .collection('users')
        .where('username', '==', username)
        .limit(1)
        .get();
  
      if (userSnapshot.empty) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const userDoc = userSnapshot.docs[0];
      await db.collection('users').doc(userDoc.id).delete();
  
      res.status(200).json({ message: `Usuario '${username}' eliminado correctamente` });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

export default router;
