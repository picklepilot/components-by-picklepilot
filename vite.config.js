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
            entry: resolve(__dirname, 'components/index.ts'),
            name: 'components-by-picklepilot',
            formats: ['es'],
            fileName: (format) => `components-by-picklepilot.${format}.js`,
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
