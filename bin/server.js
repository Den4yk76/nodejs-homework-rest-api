import { mkdir } from 'fs/promises';
import app from '../app.js';
import db from '../lib/db.js';

const PORT = process.env.PORT || 5000;

db.then(() => {
    app.listen(PORT, async () => {
        await mkdir(process.env.UPLOAD_DIR, { recursive: true });
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
}).catch(err => {
    console.log(`Server not running. Error: ${err.message}`);
    process.exit(1);
});
