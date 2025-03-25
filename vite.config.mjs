import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    build: {
        lib: {
            entry: [
                resolve('index.ts'),
                resolve('directives.ts'),
                resolve('utils.ts'),
            ],
            name: 'elemix-renderer',
            fileName: (_, entryName) => `${entryName}.js`,
            formats: ['cjs'],
        },
    },
});
