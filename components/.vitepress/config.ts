import { defineConfig } from 'vitepress'

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
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
        ],
    },
})
