---
category: '@Components'
---

<script setup lang="ts">
import ColorPicker from './ColorPicker.vue' 
import { ref } from 'vue' 

const existingColor = ref('bg-blue-200')
</script>

# Color Picker

[NEEDS DOCS]

## Example

<ColorPicker :model-value="existingColor" modifier="bg-" @update:model-value="existingColor = $event" />

<div class="rounded-lg p-2 mt-3" :class="existingColor">
    Value: {{ existingColor }}
</div>