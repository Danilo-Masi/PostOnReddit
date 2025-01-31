import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { applyRoutes } from './routes.mjs';

// Legge ogni minuto i post e li carica su Reddit
import './services/redditScheduler.mjs';
// Ogni giorno a mezzanotte cancella i post con status `posted`
import './services/cleanupPost.mjs';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));

app.use(express.json());

applyRoutes(app);

// Rotta di test
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
})