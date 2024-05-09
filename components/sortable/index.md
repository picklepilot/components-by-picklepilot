---
category: '@Components'
---

<script setup lang="ts">
import SortableComponentDemo from './SortableComponentDemo.vue'
</script>

# Sortable

This is simply just another Vue wrapper for the Sortablejs plugin (https://github.com/SortableJS/Sortable). It accepts all the basic non-addon options, except one. This version of the wrapper enables support for multi-drag.

## Usage

### Simply just import the ModalComponent to use

```vue
<script setup lang="ts">
import { ModalComponent } from '@picklepilot/components-by-picklepilot/components/modal/ModalComponent.vue'
import { ref } from 'vue'

const showModal = ref<boolean>(false)
</script>

<template>
    <div>
        <ModalComponent />
    </div>
</template>
```

## Demo (without Multi-drag)

The following demo is a single drag implementation.

<iframe data-why class="iframe-demo">
    <SortableComponentDemo />
</iframe>
