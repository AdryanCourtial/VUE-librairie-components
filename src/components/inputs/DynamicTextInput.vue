<template>
    <template v-if="!isLoading">

        <input class="active"
        v-if="isToggle"
        :id="option.key"
        v-model="myModel" 
        :placeholder="option.placeHolder"
        :type="option.type"
        @keydown.esc="cancelChange"
        @keypress.enter="confirmTextInput" 
        ref="activeInput" >
    
        <p v-else class="disabled"
        type="text"
        @dblclick.left="ToggleInput"
        readonly> {{ formatValue }}</p>

    </template>

    <template v-else>
        <Loader />
    </template>

</template>

<script lang="ts" setup>
import { capitalize, computed, ref, watch } from 'vue';
import { parseToKEuro } from '../../utils/string.utils';
import Loader from '../other/Loader.vue';

const myModel = defineModel<string | number>()

export interface DynamicTextInputEmits {
    [props.option.key]: string | number
}
const emit = defineEmits<{
  (e: 'change', id: DynamicTextInputEmits, key: keyof DynamicTextInputEmits): void
}>()

const isToggle = ref<Boolean>()
const isLoading = ref<Boolean>()

const activeInput = ref<HTMLElement>()
const initialValue = ref<string | number>()

initialValue.value = myModel.value

interface DynamicTextInputProps {
    key: string
    placeHolder: string
    price?: Boolean
    type: 'number' | 'text'
    context?: 'price' | 'NAF'
}

const props = defineProps<{
    option: DynamicTextInputProps
}>()

const ToggleInput = () => {
    isToggle.value = !isToggle.value
}

watch(() => activeInput.value, () => {
    if (isToggle.value === true) {
        activeInput.value?.focus()
    }
})

const formatValue = computed(() => {
    if (!myModel.value) return "N/A"

    if (props.option.context === 'price' && typeof myModel.value === 'number') {
        return parseToKEuro(myModel.value)
    }

    if (props.option.type === 'text' && typeof myModel.value === 'string') {
        return capitalize(myModel.value)
    }

})

const validateTextInput = () => {
    
    if (initialValue.value === myModel.value) return false

    return true
}

const cancelChange = () => {
    myModel.value = initialValue.value
    ToggleInput()
}

const confirmTextInput = () => {

    if (myModel.value === undefined || !validateTextInput()) return

    emit('change', { 
        [props.option.key]: myModel.value,
    }, props.option.key)

    ToggleInput()
    console.log(isToggle.value)
    initialValue.value = myModel.value

}
</script>

<style lang="css" scoped>

.active, .disabled {
    color: black;
    width: 100%;
    height: fit-content;
    max-width: 200px;
    box-sizing: border-box;
    padding: 10px;
    font-size: large;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.disabled:hover {
    cursor: cell;
}

.active {
    border: none;
    outline: none;
    background-color: #e9e9e9;
}
</style>
