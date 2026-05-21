import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");
const outDir = path.resolve(assetsDir, "optimized");

const MAX_WIDTH = 900;
const WEBP_QUALITY = 78;

await mkdir(outDir, { recursive: true });

const files = (await readdir(assetsDir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const input = path.join(assetsDir, file);
  const base = path.basename(file, ".png");
  const output = path.join(outDir, `${base}.webp`);

  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(output);

  const before = (await stat(input)).size;
  const after = (await stat(output)).size;
  console.log(`${base}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}

console.log("\nWebP files saved to src/assets/optimized/");
