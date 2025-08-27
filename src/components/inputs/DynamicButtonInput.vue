<template>
    <button :type="option.type" class="dynamic_button" @click="option.execute" > {{ option.name ?? "Button" }}</button>
</template>

<script lang="ts" setup>

export interface DynamicButtonInput {
    type: "button" | "submit" | "reset"
    name: string
    execute?: () => void
}

defineProps<{
    option: DynamicButtonInput
}>()
</script>

<style lang="css" scoped>

.dynamic_button {
    height: fit-content;
    width: fit-content;
    padding: .25em 1em;
}

</style>
