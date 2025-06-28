import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'react-vendor';
                        if (id.includes('tailwindcss')) return 'tailwind-vendor';
                        if (id.includes('axios')) return 'axios-vendor';
                        if (id.includes('moment')) return 'moment-vendor';
                        if (id.includes('lodash')) return 'lodash-vendor';
                        if (id.includes('inertia')) return 'inertia-vendor';
                        return 'vendor';
                    }
                },
            },
        },
    },
});
