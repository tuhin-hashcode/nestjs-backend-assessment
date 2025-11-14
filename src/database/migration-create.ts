import { writeFileSync } from 'fs';
import { join } from 'path';

// Get migration name from CLI args
const migrationName = process.argv.slice(2).join(' ');

if (!migrationName) {
    console.error('Error: Please provide a migration name.');
    process.exit(1);
}

const timestamp = Date.now();
const fileName = `${timestamp}_${migrationName.replace(/\s+/g, '_')}.sql`;
const filePath = join(__dirname, 'migrations', fileName);

try {
    writeFileSync(filePath, '-- Write your SQL here\n', 'utf-8');
    console.log(`Migration "${fileName}" created successfully.`);
} catch (error) {
    console.error('Error creating migration:', error);
    process.exit(1);
}
