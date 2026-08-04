// Generate WebP alongside the source JPGs for the hero profile pic and the
// portfolio thumbnails. WebP files are committed and served via <picture> with
// the JPG as fallback, so `sharp` is only needed locally (not in CI/build).
//
//   npm run optimize:images
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const jobs = [
    { dir: 'public/images', match: f => f === 'matt-profile.jpg' },
    { dir: 'public/images/portfolio', match: f => /\.jpe?g$/i.test(f) },
];

let count = 0;
for (const { dir, match } of jobs) {
    const files = (await readdir(dir)).filter(match);
    for (const file of files) {
        const src = path.join(dir, file);
        const out = src.replace(/\.jpe?g$/i, '.webp');
        await sharp(src).webp({ quality: 80 }).toFile(out);
        console.log('wrote', out);
        count++;
    }
}
console.log(`\nDone — ${count} WebP files generated.`);
