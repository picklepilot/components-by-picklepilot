<script setup lang="ts">
    import BaseCard from './BaseCard.vue'
</script>

---
category: '@Components'
---

<iframe data-why class="w-full h-[450px]">
    <div class="max-w-sm w-full">
        <BaseCard :classes="['bg-purple-500 text-white']">
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

# Card

[TODO] Describe me