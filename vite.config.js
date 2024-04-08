import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), libInjectCss(), dts({ include: ['components'] })],
    build: {
        lib: {
            entry: resolve(__dirname, 'components/main.ts'),
            formats: ['es'],
        },
    },
    rollupOptions: {
        external: ['vue'],
        output: {
            globals: {
                vue: 'Vue',
            },
        },
    },
    dedupe: ['vue'],
})
