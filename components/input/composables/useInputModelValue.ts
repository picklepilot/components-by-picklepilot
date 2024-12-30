import { ref, watch } from 'vue'

export function useInputModelValue(
    props: { modelValue: any },
    defaultValue?: any,
) {
    const effectiveValue = ref<any>(props.modelValue || defaultValue)

    watch(
        () => props.modelValue,
        (newValue: any) => {
            effectiveValue.value = newValue
        },
    )

    return {
        effectiveValue,
    }
}
