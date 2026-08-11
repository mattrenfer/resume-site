// Bundle the handler (and the local test runner) into single ESM files with
// esbuild, then zip the handler for upload to Lambda.
import * as esbuild from 'esbuild';
import { createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

const common = {
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'esm',
    // let bundled CommonJS deps (google-auth-library's chain) use require()
    banner: {
        js: "import{createRequire as _cr}from'module';const require=_cr(import.meta.url);",
    },
};

await esbuild.build({
    ...common,
    entryPoints: ['src/handler.ts'],
    outfile: 'dist/index.mjs',
});
await esbuild.build({
    ...common,
    entryPoints: ['src/local.ts'],
    outfile: 'dist/local.mjs',
});

// zip dist/index.mjs -> function.zip (cross-platform via PowerShell on Windows,
// falls back to `zip` elsewhere)
try {
    execSync(
        'powershell -NoProfile -Command "Compress-Archive -Path dist/index.mjs -DestinationPath function.zip -Force"',
        { stdio: 'ignore' },
    );
} catch {
    execSync('cd dist && zip -j ../function.zip index.mjs', {
        stdio: 'ignore',
    });
}

console.log('✓ bundled dist/index.mjs + dist/local.mjs');
console.log('✓ wrote function.zip (upload this to Lambda)');
