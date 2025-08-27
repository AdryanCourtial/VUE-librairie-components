import { defineStore } from "pinia";
import { ref, shallowRef, type Component } from "vue";

export const usePopupStore = defineStore("popup", () => {

    const popupIsOpen = ref<Boolean>(false)
    const componentToShow = shallowRef<Component>()

    const togglePopup = (state: Boolean, component?: Component) => {
        
        if (state === true && component) {
            componentToShow.value = component
            popupIsOpen.value = true
        } else {
            popupIsOpen.value = false
        }
        
    }

    return {
        popupIsOpen,
        togglePopup,
        componentToShow
    }

})