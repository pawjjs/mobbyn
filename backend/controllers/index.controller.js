import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const showIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
}
