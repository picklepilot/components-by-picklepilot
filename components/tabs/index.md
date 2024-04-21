<script setup lang="ts">
    import TabsNavDemo from './TabsNavDemo.vue'
</script>

# Tabs Nav

Tabs Nav is a navigation component that allows users to navigate between different sections of a page.


## Demos

**Classic**

This is the default rendering of the tabs nav component. It resembles the file cabinet tabbed navigation style.

<iframe data-why class="w-full h-auto">
    <TabsNavDemo />
</iframe>

```vue
<script setup lang="ts">
import TabsNav from '@picklepilot/components-by-picklepilot/components/tabs/TabsNav.vue'
import { ref } from 'vue'

const activeTab = ref(1)

const tabs = computed(
    () => [
        { id: 0, label: 'Tab 1', active: activeTab.value === 0 },
        { id: 1, label: 'Tab 2', active: activeTab.value === 1 },
        { id: 2, label: 'Tab 3', active: activeTab.value === 2 },
    ],
)

function onClickedTab(idx: number) {
    activeTab.value = idx
}
</script>

<template>
    <TabsNav
        :tabs="tabs"
        @clicked="onClickedTab"
        @updated="tabs = $event"
    />
</template>
```