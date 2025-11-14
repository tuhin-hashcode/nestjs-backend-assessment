import { writeFileSync } from 'fs';
import { join } from 'path';

const seedsDir = join(__dirname, 'seeds');
const seedName = process.argv.slice(2).join(' ');

if (!seedName) {
    console.error('Please provide a seed name.');
    process.exit(1);
}

const timestamp = Date.now();
const filePath = join(seedsDir, `${timestamp}_${seedName.replace(/\s+/g, '_')}.sql`);
writeFileSync(filePath, '-- Write your SQL here\n', 'utf-8');
console.log('Seed created:', filePath);
