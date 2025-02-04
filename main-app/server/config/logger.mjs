import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

// Creazione del logger
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(), // Log sulla console
        new winston.transports.File({ filename: 'logs/backend.log' }), // Log su file
    ],
});

export default logger;