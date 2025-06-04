import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './firebase.js';
import router from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API 🚀 Michelangelo: Cowabunga! 🍕');
});

app.get('/test-firebase', async (req, res) => {
  try {
    const docRef = db.collection('test').doc('ping');
    await docRef.set({ alive: true, timestamp: new Date().toISOString() });
    res.send('🔥 Firebase 🚀');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error conectando con Firebase 🤯');
  }
});

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`API 🚀 en http://localhost:${PORT}`);
});
