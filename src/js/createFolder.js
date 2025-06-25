import fs from 'fs';
import path from 'path';

export default function createFoldersPlugin(
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
        'src/logo',
        'src/icons',
    ]
) {
    return {
        name: 'vite-plugin-create-folders',
        apply: 'serve',
        configResolved(config) {
            const rootDir = config.root || process.cwd();

            folders.forEach((folder) => {
                const fullPath = path.join(rootDir, folder);
                if (!fs.existsSync(fullPath)) {
                    fs.mkdirSync(fullPath, { recursive: true });
                    console.log(`Created folder: ${fullPath}`);
                }
            });
        },
    };
}

// export default function createFolders() {
//     return createFoldersPlugin();
// }

// import { defineConfig } from 'vite';
// import createFolders from './vite-plugin-create-folders.js';

// export default defineConfig({
//   plugins: [createFolders()]
// });
