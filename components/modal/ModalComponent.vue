<template>
    <div class="relative" role="dialog">
        <div
            :class="
                clsx(
                    'fixed inset-0 z-10 w-screen overflow-y-auto p-10',
                    !showModal && 'pointer-events-none',
                )
            "
            @click="$emit('close', false)"
        >
            <div
                class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
                <transition
                    enter-from-class="duration-300 ease-out opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="duration-300 ease-out opacity-100 translate-y-0 sm:scale-100"
                    leave-from-class="duration-200 ease-in opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="duration-200 ease-in opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="showModal"
                        ref="modal"
                        :class="
                            clsx(
                                'relative h-[1020px] transform rounded-xl bg-white p-4 shadow-xl transition-all sm:w-full sm:max-w-lg',
                            )
                        "
                        @click.stop
                    >
                        <slot></slot>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, watch, withDefaults } from 'vue'
import clsx from 'clsx'

interface Props {
    /**
     * Toggle the modal visibility
     *
     * @default false
     * @type {boolean}
     */
    showModal: boolean
}

const props = withDefaults(defineProps<Props>(), {})

watch(
    () => props.showModal,
    (showModal) => {
        if (showModal) {
            document.body.classList.add('overflow-y-hidden')
        } else {
            document.body.classList.remove('overflow-y-hidden')
        }
    },
    { immediate: true },
)
</script>
