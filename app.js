import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import indexRoutes from './routes/index.js'
import boardRoutes from './routes/board.js'
import boardApiRoutes from './routes/board.api.js';

import Duren from "./DurenLogic.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
const PORT = 3000;

app.use('/', indexRoutes)
app.use('/board', boardRoutes)
app.use('/api/board', boardApiRoutes);

app.listen(PORT, () => {
    console.log(`Server running at
    http://localhost:${PORT}`);
});