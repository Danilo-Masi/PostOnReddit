require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const host = process.env.host || 'http://localhost'
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotta di test
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server running on ${host}:${PORT}`)
})