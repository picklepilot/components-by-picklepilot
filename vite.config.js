import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

const hash = Math.floor(Math.random() * 90000) + 10000

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts({ include: ['components'] })],
    build: {
        lib: {
            entry: resolve(__dirname, 'components/index.ts'),
            name: 'components-by-picklepilot',
            formats: ['es'],
            fileName: (format) =>
                `components-by-picklepilot.${format}-${hash}.js`,
        },
        emptyOutDir: false,
    },
    rollupOptions: {
        external: ['vue'],
        output: {
            exports: 'named',
            globals: {
                vue: 'Vue',
            },
        },
    },
})
