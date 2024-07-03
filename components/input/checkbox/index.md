---
category: '@Inputs'
---

<script setup lang="ts">
    import InputCheckboxDemo from './InputCheckboxDemo.vue'
</script>

# Input Checkbox

Input elements of type checkbox are rendered by default as boxes that are checked (ticked) when activated, like you might see in an official government paper form.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import InputLabel from '../label/InputLabel.vue'
import InputCheckbox from './InputCheckbox.vue'

const checked = ref(false)
</script>

<template>
    <div>
        <InputCheckbox :model-value="checked" @update:modelValue="checked = $event" />
    </div>
</template>
```

## Demo

<iframe data-why class="iframe-demo">
    <InputCheckboxDemo />
</iframe>

## Props

| Prop        | Type     | Required | Default     |
| ----------- | -------- | -------- | ----------- |
| **classes** | `string[]` | No      | `[]` |
