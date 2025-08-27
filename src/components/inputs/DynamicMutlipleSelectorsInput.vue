<template>
    <select class="selected" :id="`id_${option.name}_selector`" :name="option.name" v-model="myModel" :size="option.size" >
        <option value="" :disabled="option.disabled" > ------- </option>
        <option v-for="data in option.listData" :value="(data as Record<string, any>)[option.keyToShow]"> {{ (data as Record<string, any>)[option.keyToShow] }} </option>
    </select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


export interface DynamicSingleSelectorInput {
    name: string,
    listData: Record<string, any>[],
    keyToShow: string
    size?: string
    disabled?: boolean
}

const initialValue = ref<string | number>()

const myModel = defineModel<string>()

initialValue.value = myModel.value

defineProps<{
    option: DynamicSingleSelectorInput
}>()


</script>

<style lang="css" scoped>
    
</style>
