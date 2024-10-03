---
category: '@Components'
---

<script setup lang="ts">
import EmptyStateDemo from './EmptyStateDemo.vue'
</script>

# Empty State

Empty state component provides and easy way to well... show empty states.

## Usage

```vue
<script setup lang="ts">
import { EmptyState } from '@picklepilot/components-by-picklepilot/components'
</script>

<template>
    <div>
        <EmptyState
            icon="fa-exclamation-circle"
            title="No items found"
            description="There are no items to show at this time."
        />
    </div>
</template>
```

## Demo

<iframe data-why class="vp-raw iframe-demo">
    <EmptyStateDemo />
</iframe>

## Props

| Prop            | Type                                                                      | Default                                                  | Note                                                                            |
| --------------- | ------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **classes**     | `{ container: string, icon: string, title: string, description: string }` | `{ container: '', icon: '', title: '', description: ''}` | -                                                                               |
| **icon**        | `string`                                                                  | `''`                                                     | This library assumes the use of FontAwesome, so only FA classes will work here. |
| **title**       | `string`                                                                  | `''`                                                     | -                                                                               |
| **description** | `string`                                                                  | `''`                                                     | -                                                                               |
