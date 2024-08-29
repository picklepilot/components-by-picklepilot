<script setup>
import { ref, onMounted } from 'vue'
// Special api to mount the app
import { createApp } from 'whyframe:app'
import '../../main.css'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

const el = ref()

onMounted(() => {
    // Mount the app to the ref
    createApp(el.value)
})
</script>

<template>
    <div ref="el" class="h-full w-full"></div>
</template>

<style lang="css">
.iframe-demo #app {
    height: 100%;
    width: 100%;
}
</style>
