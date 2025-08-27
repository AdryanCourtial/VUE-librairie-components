<template>
    <span class="loader"></span>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped>

.loader {
    width: 100%;
    aspect-ratio: 1;
    border: 3px solid black;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 

</style>
