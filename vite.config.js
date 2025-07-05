import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import viteImagemin from 'vite-plugin-imagemin';
import babel from '@rollup/plugin-babel';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: '/foods/dist/',
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
            },
        },
        modulePreload: true,
        target: 'esnext',
    },

    plugins: [
        createFoldersPlugin(),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            mozjpeg: {
                quality: 70,
            },
            optipng: {
                optimizationLevel: 7,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox',
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false,
                    },
                ],
            },
        }),
        babel({
            babelHelpers: 'bundled',
        }),
    ],
});

//extra functions
function createFoldersPlugin(
    folders = [
        'src/img/slider',
        'src/img/form',
        'src/img/tabs',
        'src/sass/base',
        'src/sass/blocks',
        'src/sass/libs',
        'src/sass/ui',
        'src/font',
        'src/js',
        'src/js/modules',
        'src/js/services',
        'src/logo',
        'src/icons',
    ]
) {
    return {
        name: 'vite-plugin-create-folders',
        apply: 'serve',
        configResolved(config) {
            const rootDir = config.root || process.cwd();

            folders.forEach(folder => {
                const fullPath = path.join(rootDir, folder);
                if (!fs.existsSync(fullPath)) {
                    fs.mkdirSync(fullPath, { recursive: true });
                    console.log(`Created folder: ${fullPath}`);
                }
            });
        },
    };
}
