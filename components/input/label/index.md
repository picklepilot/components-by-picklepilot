---
category: '@Components'
---

# Input Label

Input labels are used to describe the purpose of an input field as well as provide a extra hit area to focus the input.

## Usage

```vue
<script setup lang="ts">
import InputLabel from '@picklepilot/components-by-picklepilot/components/input/textarea/InputLabel.vue'
import { ref } from 'vue'

const text = ref<string>('')
</script>

<template>
  <div>
      <InputLabel for-id="demo-input-text">Demo Input Text</InputLabel>
  </div>
</template>
```

## Props

| Prop           | Type     | Required | Default     |
|----------------|----------|----------|-------------|
| **forId**      | `string` | Yes      | `undefined` |
