---
category: '@Components'
---

<script setup lang="ts">
    import { ref } from 'vue'
    import FacetedFiltersDemo from './FacetedFiltersDemo.vue'
</script>

# Faceted Filters
Easily control faceted filters with this component.

## Demo (as-is)

<iframe data-why class="iframe-demo">
    <FacetedFiltersDemo />
</iframe>

## Usage

```vue
<script setup lang="ts">
import InputText from './InputText.vue'
import { ref } from 'vue'

const text = ref<string>('')
</script>

<template>
    <FacetedFilters :model-value="[]" />
</template>
```

## Props

| Prop           | Type                                        | Required | Default     |
|----------------|---------------------------------------------|----------|-------------|
| **classes**    | `Array<string>`                             | No       | []          |
| **modelValue** | `string`                                    | Yes      | `undefined` |
