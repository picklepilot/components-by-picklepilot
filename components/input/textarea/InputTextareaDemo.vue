<template>
    <div class="items-center justify-center space-y-4 py-6">
        <div class="mx-auto w-full max-w-sm space-y-1.5">
            <InputLabel for-id="demo-input-text">Demo Input Text</InputLabel>
            <InputText
                placeholder="Enter text here..."
                id="demo-input-text"
                name="demo-input-text"
                autocomplete="off"
                rows="6"
                :model-value="text"
                :input-classes="['resize-vertical']"
                @blur="onBlur"
                @focus="onFocus"
                @update:model-value="text = $event"
            />
        </div>
        <div class="mx-auto w-full max-w-sm space-y-1.5">
            <InputLabel for-id="demo-input-text-readonly">Read only</InputLabel>
            <InputText
                placeholder="Enter text here..."
                id="demo-input-text-readonly"
                name="demo-input-text"
                autocomplete="off"
                rows="6"
                :model-value="readOnlyText"
                :readonly="true"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputLabel from '../label/InputLabel.vue'
import InputText from './InputTextarea.vue'

const text = ref(null)
const readOnlyText = ref('This is a read only text.')

function onBlur(evt) {
    console.log('onBlur', evt)
}

function onFocus(evt) {
    console.log('onFocus', evt)
}
</script>
