import { defineConfig } from 'vitepress'
import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Pickle Jar',
    description: 'A VitePress Site',
    themeConfig: {
        // logo: '../Logo-test.svg',
        siteTitle: false,

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
                    { text: 'Alert', link: '/alert/' },
                    { text: 'Button', link: '/button/' },
                    { text: 'Color Picker', link: '/color-picker/' },
                    { text: 'Faceted Filters', link: '/faceted-filters/' },
                    { text: 'Modal', link: '/modal/' },
                    { text: 'Select', link: '/input/select/' },
                    { text: 'Sortable', link: '/sortable/' },
                ],
            },

            {
                text: 'Input',
                items: [
                    { text: 'Label', link: '/input/label/' },
                    { text: 'Text', link: '/input/text/' },
                    { text: 'Textarea', link: '/input/textarea/' },
                ],
            },

            {
                text: 'Coming Soon',
                items: [
                    { text: 'Avatar', link: null },
                    { text: 'Badge', link: null },
                    { text: 'Column Management', link: null },
                    { text: 'Dropdown', link: null },
                    { text: 'Windowed Toolbar', link: null },
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
