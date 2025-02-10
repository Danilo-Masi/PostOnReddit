import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import logger from './config/logger.mjs';
import { applyRoutes } from './routes.mjs';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();

const allowedOrigins = [CLIENT_URL, 'http://localhost:5173'];

// CORS
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));

// Middleware di sicurezza e prestazioni
app.use(helmet());
app.use(compression());

// Configura Express per fidarsi dei proxy
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Parse JSON
app.use(express.json());

// Log delle richieste
app.use((req, res, next) => {
    logger.info(`[${req.method}] ${req.url}`);
    next();
});

// Applica le rotte
applyRoutes(app);

// Rotta di test
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Middleware di gestione di errori globali
app.use((err, req, res, next) => {
    logger.error(`Errore: ${err.message}`);
    res.status(500).json({
        error: 'Internal Server Error',
    });
})

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
})