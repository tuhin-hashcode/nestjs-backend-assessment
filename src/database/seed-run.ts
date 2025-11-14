// src/database/seed-run.ts
import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

// Get seed filename from CLI args
const fileName = process.argv.slice(2).join(' ');
if (!fileName) {
    console.error('Error: Please provide a seed filename.');
    process.exit(1);
}

const filePath = join(__dirname, 'seeds', fileName);

try {
    const sql = readFileSync(filePath, 'utf-8');
    const client = new Client({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
    });

    (async () => {
        await client.connect();
        await client.query(sql);
        await client.end();
        console.log(`Seed executed: ${fileName}`);
    })();
} catch (err: any) {
    console.error('Error running seed:', err.message);
    process.exit(1);
}
