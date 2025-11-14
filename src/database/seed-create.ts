// src/database/seed-create.ts
import { writeFileSync } from 'fs';
import { join } from 'path';

// Get seed name from CLI args
const seedName = process.argv.slice(2).join(' ');

if (!seedName) {
    console.error('Error: Please provide a seed name.');
    process.exit(1);
}

const seedsDir = join(__dirname, 'seeds');
const timestamp = Date.now();
const fileName = `${timestamp}_${seedName.replace(/\s+/g, '_')}.sql`;
const filePath = join(seedsDir, fileName);

writeFileSync(filePath, '-- Write your SQL seed here\n', 'utf-8');
console.log(`Seed created: ${filePath}`);
