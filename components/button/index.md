<script setup lang="ts">
    import BaseButton from '../button/BaseButton.vue'

function onClicked(evt) {
    alert('CLICKED BUTTON', evt)
}

</script>

---
category: '@Components'
---

# Button

## Demo (as-is)

<iframe data-why class="w-full h-[200px] -mx-2">
    <div class="max-w-sm w-full px-2">
        <BaseButton variant="zinc" @click.stop.prevent="onClicked">
            My Button
        </BaseButton>
    </div>
</iframe>