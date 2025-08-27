<template>

    <p v-if="!isToggle && option.toggle" class="disabled" type="text" @dblclick.left="ToggleInput" readonly> {{ option.visualise() }} </p>

    <select v-else class="selected" :id="`id_${option.name}_selector`" 
    :name="option.name" 
    v-model="myModel"
    :size="option.size" 
    @change="onChange"
    @keypress.enter="onConfirmChange">
        <option value="" :disabled="option.disabled" > --- </option>
        <slot />
    </select>

</template>

<script lang="ts" setup>
import { ref, type Reactive } from 'vue'


export interface DynamicSingleSelectorInput {
    name: string,
    visualise: () => string,
    key?: string,
    size?: string,
    toggle?: boolean
    disabled?: boolean
}

const initialValue = ref<string | number>()
const isToggle = ref<Boolean>(false)

const myModel = defineModel<Reactive<any>>()

initialValue.value = myModel.value

const props = defineProps<{
    option: DynamicSingleSelectorInput
}>()

const emits = defineEmits<{
    (e: 'change', id: any, key: string): void
}>()

const ToggleInput = () => {
    isToggle.value = !isToggle.value
}

const onChange = () => {
    if (myModel.value === undefined) return

    console.log("Value changed", myModel.value)

}

const onConfirmChange = () => {
    console.log("Value confirmed", myModel.value)
    emits('change', myModel.value as string, props.option.key ?? "N/A")
    ToggleInput()
}

</script>

<style lang="css" scoped>

.selected {
    height: fit-content;
    padding: .5em 1em;
}

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

</style>
