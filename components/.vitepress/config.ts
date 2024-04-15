import { defineConfig } from 'vitepress'
import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Components by Picklepilot',
    description: 'A VitePress Site',
    themeConfig: {
        search: {
            provider: 'local',
        },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' },
        ],

        sidebar: [
            {
                text: 'Components',
                items: [
                    { text: 'Modal', link: '/modal/' },
                    { text: 'Sortable', link: '/sortable/' },
                    { text: 'Color Picker', link: '/color-picker/' },
                ],
            },

            {
                text: 'Coming Soon',
                items: [
                    { text: 'Alert', link: null },
                    { text: 'Avatar', link: null },
                    { text: 'Badge', link: null },
                    { text: 'Button', link: null },
                    { text: 'Dropdown', link: null },
                    { text: 'Color Picker', link: '/color-picker/' },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
        ],
    },
    vite: {
        plugins: [
            whyframe({
                defaultSrc: '/frames/default.html',
            }),
            whyframeVue({
                include: /\.(?:vue|md)$/, // also scan in markdown files
            }),
        ],
    },
})
