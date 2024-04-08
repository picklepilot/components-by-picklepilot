---
category: '@Library'
---

<script setup lang="ts">
import ModalComponent from './ModalComponent.vue'
</script>

<ModalComponent />

# Modal

Modal is a dialog box/popup window that is displayed on the top layer of the current page. Very useful for complete screen takeover (when the user's focus should be completely on the content of the modal).

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