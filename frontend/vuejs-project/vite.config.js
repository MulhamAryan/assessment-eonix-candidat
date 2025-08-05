import {fileURLToPath, URL} from 'node:url'

import vueDevTools from 'vite-plugin-vue-devtools'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, path.resolve(__dirname))

    return {
        plugins: [
            vue(),
            vueDevTools(),
        ],
        server: {
            port: parseInt(env.VITE_FRONTEND_PORT) || 3030,
            host: true
        }, resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
    }
})