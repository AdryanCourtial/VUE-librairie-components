<template>
    <div class="container-multiple-selector">
        <div class="header-multiple-selector" @click="toggle()">
            <p> NOM DU HEADER <span> ({{ myModel.length }})</span> </p>
            <input v-model="search" class="compteur" @click.stop />
            <img src="/ChevronRight.png" :style="{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }" />
        </div>
        <ul v-show="handleIfOpen" class="options-list">

            <template v-if="searchFiltered.length === 0">
                <li>Aucune valeur trouvée</li>
            </template>

            <li v-else 
            v-for="value in searchFiltered" 
            @click="chooseOption(value)"
            v-if="searchFiltered"
            :style="{
                color: isAlreadySelected(value) ? 'lightgray' : 'black',
            }"> {{ value[option.labelProp] }}</li>

        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

export interface DynamicMultipleSelectorInput {
  name: string
  key: string
  listData: Array<Record<string, any>>
  size?: number | string
  toggle?: boolean
  disabled?: boolean
  placeholder?: string
  labelProp: string
}

const props = defineProps<{
  option: DynamicMultipleSelectorInput
  display?: (value: any) => string
}>()


const myModel = defineModel<unknown[]>({ default: []})

const isOpen = ref<boolean>(false)
const search = ref<string>("")

const toggle = (value?: boolean) => {
    if (value === undefined) {
        if (!value) {
            return isOpen.value = !isOpen.value
        }
        isOpen.value = value
    }
}

const searchFiltered = computed(() => {
    return props.option.listData.filter((value) => value[props.option.labelProp].toLowerCase().includes(search.value.toLowerCase()))
})

const handleIfOpen = computed(() => {
    return isOpen.value
})

watch(search, () => {
    if (!isOpen.value) isOpen.value = true
})

const getKey = (v: any) => typeof v === 'object' && v !== null ? v.id ?? JSON.stringify(v) : v

const isAlreadySelected = (value: unknown) => {
    if (!Array.isArray(myModel.value)) return false
    const k = getKey(value)
    return myModel.value.findIndex(v => getKey(v) === k) >= 0
}

const chooseOption = (value: unknown) => {
  const arr = Array.isArray(myModel.value) ? [...myModel.value] : []

  const k = getKey(value)
  const idx = arr.findIndex(v => getKey(v) === k)

  if (idx >= 0) {
    arr.splice(idx, 1)
  } else {
    arr.push(value)
  }

  myModel.value = arr
}

</script>

<style scoped>

.container-multiple-selector {
    position: relative;
    width: fit-content;
}

.header-multiple-selector {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 0 .5em;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: solid 1px black;
    border-radius: 0.2em;
    box-sizing: border-box;


    .compteur {
        background-color: white;
        height: 80%;
        flex: 1;
        display: flex;
        border-radius: 0.2em;
        justify-content: center;
        align-items: center;
    }

    img {
        height: 70%;
        transition: .5s;
    }
}

.options-list {
    width: 80%;
    margin: 10px auto;
    overflow-y: auto;
    border: solid 1px black;
    border-radius: 0.2em;
    background-color: white;
    max-height: 200px;

    li {
        padding: .5em 1em;
        cursor: pointer;
        transition: 0.5s;
    }

    li:hover {
        background-color: lightgray;
    }
    
}
</style>
