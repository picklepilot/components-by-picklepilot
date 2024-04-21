---
category: '@Components'
---

<script setup lang="ts">
    import { ref } from 'vue'
    import InputTextDemo from './InputTextDemo.vue'
</script>

# Input Text
A basic single-line text field. Use this when you want to allow users to enter a single line of text, for example a username or email address.

## Demo (as-is)

<iframe data-why class="iframe-demo">
    <InputTextDemo />
</iframe>

## Usage

```vue
<script setup lang="ts">
import InputText from './InputText.vue'
import { ref } from 'vue'

const text = ref<string>('')
</script>

<template>
  <div>
      <InputText
          placeholder="Enter text here..."
          id="demo-input-text"
          name="demo-input-text"
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
