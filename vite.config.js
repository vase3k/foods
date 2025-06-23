import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import createFoldersPlugin from './src/js/createFolder';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    //base: '/foods/dist/',
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
            },
        },
    },
    plugins: [createFoldersPlugin()],
});
