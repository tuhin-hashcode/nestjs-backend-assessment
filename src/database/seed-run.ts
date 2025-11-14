import { Client } from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const seedsDir = join(__dirname, 'seeds');

// Get optional seed name from CLI args
const seedNameArg = process.argv.slice(2).join(' ');

// Read all .sql files
let seedFiles = readdirSync(seedsDir).filter(f => f.endsWith('.sql'));

if (seedNameArg) {
    // Run only specific seed
    const match = seedFiles.find(f => f.includes(seedNameArg));
    if (!match) {
        console.error(`Seed file not found: ${seedNameArg}`);
        process.exit(1);
    }
    seedFiles = [match];
} else {
    // Sort alphabetically or by timestamp for running all
    seedFiles.sort();
}

const client = new Client({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
});

(async () => {
    try {
        await client.connect();

        for (const file of seedFiles) {
            const sql = readFileSync(join(seedsDir, file), 'utf-8');
            await client.query(sql);
            console.log(`Seed executed: ${file}`);
        }

        await client.end();
        console.log('Seeds completed.');
    } catch (err: any) {
        console.error('Error running seeds:', err.message);
        await client.end();
        process.exit(1);
    }
})();
