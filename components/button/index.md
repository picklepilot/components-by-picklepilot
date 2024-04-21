---
category: '@Components'
---

<script setup lang="ts">
    import BaseButtonDemo from '../button/BaseButtonDemo.vue'
</script>

# Button

A button is a clickable element that can be used to trigger an action or event. It can be styled in different ways to match the design of your application.

## Demo

<iframe data-why class="iframe-demo">
    <BaseButtonDemo />
</iframe>

## Props

| Prop         | Type                                        | Default |
|--------------|---------------------------------------------|---------|
| **classes**  | `Array<string>`                             | []      |
| **disabled** | `boolean`                                   | false   |
| **size**     | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`      | "md"    |
| **variant**  | `"zinc" \| "green" \| "md" \| "lg" \| "xl"` | "zinc"  |