import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // to convert URL to path
import { PROPERTIES } from './Data/PROPERTIES.js';

const app = express();
const port = 8888;

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "assets" folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Endpoint to fetch property listings
app.get('/api/listings', (req, res) => {
    res.json(PROPERTIES);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
