---
category: '@Components'
---

<script setup lang="ts">
import BaseButton from '../button/BaseButton.vue'
import ModalComponent from './ModalComponent.vue' 
import { ref } from 'vue' 

const showModal = ref(false)
const showModal4xl = ref(false)
</script>

# Modal

Modal is a dialog box/popup window that is displayed on the top layer of the current page. Very useful for complete screen takeover (when the user's focus should be completely on the content of the modal).

## Usage

```vue
<script setup lang="ts">
import ModalComponent from '@picklepilot/components-by-picklepilot/components/modal/ModalComponent.vue'
import { ref } from 'vue'

const showModal = ref<boolean>(false)
</script>

<template>
  <div>
    <ModalComponent :classes="['md:max-w-7xl']" />
  </div>
</template>
```

## Props

| Prop          | Type            | Default |
|---------------|-----------------|---------|
| **classes**   | `Array<string>` | []      |
| **showModal** | `boolean`       | false   |


## Examples

<BaseButton @click="showModal = true" :classes="['bg-lime-600 hover:bg-lime-500 shadow-sm']">Show modal</BaseButton>

<ModalComponent :show-modal="showModal" @close="showModal = false">
    <template #title>Modal Title</template>
    <div class="mt-5">Here is some modal content</div>
</ModalComponent>

To control the width of the modal, simply use the `classes` prop and pass in the desired Tailwind CSS classes. So for example, `md:max-w-4xl`.

<BaseButton @click="showModal4xl = true">Show modal (4xl width)</BaseButton>

<ModalComponent :classes="['md:max-w-4xl']" :show-modal="showModal4xl" @close="showModal4xl = false">
<template #title>Modal Title</template>
<div class="mt-5">Here is some modal content in a wider modal</div>
</ModalComponent>