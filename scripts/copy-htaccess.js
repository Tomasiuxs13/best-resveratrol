import { copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const srcPath = join(rootDir, 'public', '.htaccess');
const destPath = join(rootDir, 'dist', '.htaccess');

try {
  copyFileSync(srcPath, destPath);
  console.log('✓ Copied .htaccess to dist/');
} catch (error) {
  console.error('Error copying .htaccess:', error.message);
  process.exit(1);
}
