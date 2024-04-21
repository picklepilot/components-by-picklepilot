---
category: '@Components'
---

<script setup lang="ts">
    import { ref } from 'vue'
    import InputTextareaDemo from './InputTextareaDemo.vue'
</script>

# Input Textarea

A multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.

## Demo (as-is)

<iframe data-why class="iframe-demo">
    <InputTextareaDemo />
</iframe>

## Usage

```vue
<script setup lang="ts">
import InputTextarea from '@picklepilot/components-by-picklepilot/components/input/textarea/InputTextarea.vue'
import { ref } from 'vue'

const text = ref<string>('')
</script>

<template>
  <div>
      <InputTextarea
          placeholder="Enter text here..."
          id="demo-input-textarea"
          name="demo-input-textarea"
          :model-value="text"
          @update:model-value="text = $event"
      />
  </div>
</template>
```

## Props

| Prop           | Type                                        | Required | Default     |
|----------------|---------------------------------------------|----------|-------------|
| **classes**    | `Array<string>`                             | No       | []          |
| **name**       | `string`                                    | Yes      | `undefined` |
| **modelValue** | `string`                                    | Yes      | `undefined` |
