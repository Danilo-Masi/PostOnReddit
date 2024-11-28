import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { applyRoutes } from './routes.mjs';

dotenv.config();

const host = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
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
    console.log(`Server running on ${host}:${PORT}`)
})