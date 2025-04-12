import { readdir, stat, rename } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function renameFiles(dir) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      await renameFiles(fullPath);
    } else if (file.includes('[') && file.includes(']')) {
      const newName = file.replace(/\[(.*?)\]/, '$1');
      const newPath = join(dir, newName);
      await rename(fullPath, newPath);
      console.log(`Renamed ${file} to ${newName}`);
    }
  }
}

const pagesDir = join(dirname(__dirname), 'src/pages');
renameFiles(pagesDir).catch(console.error);
