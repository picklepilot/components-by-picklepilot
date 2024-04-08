---
category: '@Components'
---

<script setup lang="ts">
import ModalComponent from './ModalComponent.vue' 
import { ref } from 'vue' 

const showModal = ref(false)
</script>

# Modal

Modal is a dialog box/popup window that is displayed on the top layer of the current page. Very useful for complete screen takeover (when the user's focus should be completely on the content of the modal).

## Usage

### Simply just import the ModalComponent to use

```vue
<script setup lang="ts">
import ModalComponent from '@picklepilot/components-by-picklepilot/components/modal/ModalComponent.vue'
import { ref } from 'vue'

const showModal = ref<boolean>(false)
</script>

<template>
  <div>
    <ModalComponent />
  </div>
</template>
```

## Example

<button @click="showModal = true" class="px-2.5 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 font-sm font-medium">Show Modal</button>

<ModalComponent :show-modal="showModal" @close="showModal = false">
    <template #title>Modal Title</template>
    <div class="mt-5">Here is some modal content</div>
</ModalComponent>