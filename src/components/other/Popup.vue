<template>
    <Teleport to="body">
        <div v-show="popupIsOpen">
            <Backdrop :option="{ click: () => togglePopup(false), style: 'blur' }" />
            <div class="container-popup">
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePopupStore } from '../../stores/PopupStore';
import Backdrop from './Backdrop.vue';
import { Teleport } from 'vue';

const popupStore = usePopupStore()
const { togglePopup } = popupStore
const { popupIsOpen } = storeToRefs(popupStore)

</script>

<style lang="css" scoped>
.container-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 80vh;
    background-color: aliceblue;
}

@media screen AND (min-width: 1024px) {
    .container-popup {
        width: 1024px;
        min-height: 600px;
    }  
}
</style>
