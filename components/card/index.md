<script setup lang="ts">
    import BaseButton from '../button/BaseButton.vue'
    import BaseCard from './BaseCard.vue'
</script>

---
category: '@Components'
---

# Card

## Demo (as-is)

<iframe data-why class="w-full h-[200px] -mx-2">
    <div class="max-w-sm w-full px-2">
        <BaseCard>
            <template #header>
                <div class="text-lg font-bold">Card Title</div>
            </template>
            <template #content>
                <div class="text-sm">Card Content</div>
            </template>
            <template #footer>
                <div class="text-sm">Card Footer</div>
            </template>
        </BaseCard>
    </div>
</iframe>

## Demo (Bordered)

<iframe data-why class="w-full h-[450px] -mx-2">
    <div class="max-w-sm w-full px-2">
        <BaseCard :classes="['border-zinc-200 shadow-md']">
            <template #header>
                <div class="text-lg font-bold">Card Title</div>
            </template>
            <template #content>
                <div class="text-sm">Card Content</div>
            </template>
            <template #footer>
                <div class="text-sm">
                    <BaseButton>Button</BaseButton>
                </div>
            </template>
        </BaseCard>
    </div>
</iframe>