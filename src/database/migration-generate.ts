import { execSync } from 'child_process';
import { readdirSync, statSync, renameSync } from 'fs';
import { join } from 'path';

// Get migration name from CLI args
const migrationName = process.argv.slice(2).join(' ');

if (!migrationName) {
    console.error('Error: Please provide a migration name.');
    process.exit(1);
}

const migrationsDir = join(__dirname, 'migrations');

// Capture existing files before generate
const before = new Set(readdirSync(migrationsDir));

// Run Drizzle generate
try {
    execSync('npx drizzle-kit generate --config ./src/config/drizzle.config.ts', { stdio: 'inherit' });
} catch (error) {
    console.error('Error generating migration:', error);
    process.exit(1);
}

// Capture files after generate
const after = readdirSync(migrationsDir);
const newFiles = after.filter(f => !before.has(f));

if (newFiles.length === 0) {
    console.error('No migration generated.');
    process.exit(1);
}

// Pick newest file based on mtime
const newestFile = newFiles
    .map(f => ({ file: f, mtime: statSync(join(migrationsDir, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)[0];

if (!newestFile) {
    console.error('Unable to determine the generated migration file.');
    process.exit(1);
}

// Rename to timestamp_migrationName.sql
const timestamp = Date.now();
const newFileName = `${timestamp}_${migrationName.replace(/\s+/g, '_')}.sql`;
renameSync(join(migrationsDir, newestFile.file), join(migrationsDir, newFileName));

console.log(`Generated migration: ${newFileName}`);
