import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'assets');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.PNG'];

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function optimizeImages() {
    console.log('--- Starting Image Optimization ---');

    try {
        const allFiles = await getFiles(PUBLIC_DIR);
        const imagesToConvert = allFiles.filter(file =>
            EXTENSIONS.includes(path.extname(file))
        );

        console.log(`Found ${imagesToConvert.length} images to convert.`);

        for (const imagePath of imagesToConvert) {
            const ext = path.extname(imagePath);
            const webpPath = imagePath.replace(ext, '.webp');

            try {
                await sharp(imagePath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);

                console.log(`✓ Converted: ${path.relative(PUBLIC_DIR, imagePath)} -> .webp`);
            } catch (err) {
                console.error(`✗ Failed: ${path.relative(PUBLIC_DIR, imagePath)}`, err.message);
            }
        }

        console.log('--- Optimization Complete ---');
    } catch (err) {
        console.error('Fatal error during optimization:', err);
    }
}

optimizeImages();
