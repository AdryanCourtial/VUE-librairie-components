<template>
    <div
    :class="`${option.style} backdrop`"
    @click="option.click"
    />
</template>

<script lang="ts" setup>
interface BackdropProps {
    click?: () => void
    style: "dark" | "blur"
}

defineProps<{
    option: BackdropProps
}>()
</script>

<style lang="css" scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.dark {
    background-color: black;
    opacity: 0.6;
}

.blur {
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.4);
}

</style>
