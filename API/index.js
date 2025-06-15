import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { db } from './firebase.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import wasteRoutes from './routes/wasteRoutes.js';

dotenv.config(); // Cargar variables de entorno desde .env

const PORT = process.env.PORT || 3000; // Puerto por defecto o el especificado en .env

const api = express(); // Crear instancia de Express

api.use(express.json({ strict: true, type: 'application/json' })) // Configurar Express para manejar JSON

api.use(cors()); // Habilitar CORS para todas las rutas

// Ruta raíz para verificar que la API está funcionando
api.get('/', (req, res) => { res.send('API 🚀 Michelangelo: Cowabunga! 🍕'); });

// Ruta de prueba para verificar la conexión con Firebase
api.get('/test-firebase', async (req, res) => {
  try {
    const docRef = db.collection('test').doc('ping');
    await docRef.set({ alive: true, timestamp: new Date().toISOString() });
    res.send('🔥 Firebase 🚀');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error conectando con Firebase 🤯');
  }
});

// Aqui traemos todas las rutas
api.use('/users', userRoutes);
api.use('/waste', wasteRoutes);

// Middleware para manejar errores
api.use(errorHandler);

api.listen(PORT, () => { console.log(`API 🚀 Cowabunga! 🍕 PORT:${PORT}`); });
