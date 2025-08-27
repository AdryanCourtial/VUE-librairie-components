<template>
  <p
    v-if="props.option.toggle && !isOpen"
    class="display"
    tabindex="0"
    @dblclick="toggle"
    @keydown.enter.prevent="toggle"
  >
    {{ displayText }}
  </p>

  <select
    v-else
    class="selected"
    :id="`id_${props.option.name}_selector`"
    :name="props.option.name"
    v-model="model"
    :size="props.option.size"
    :disabled="props.option.disabled"
    @change="emitChange"
    @keypress.enter.prevent="confirmAndClose"
  >
    <option :value="null" disabled>
      {{ props.option.placeholder ?? '---' }}
    </option>
    <slot />
  </select>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

export interface DynamicSingleSelectorInput {
  name: string
  key?: string
  size?: number | string
  toggle?: boolean
  disabled?: boolean
  placeholder?: string
  labelProp?: string
}

const props = defineProps<{
  option: DynamicSingleSelectorInput
  display?: (value: any) => string
}>()

const model = defineModel<any>({ default: null })

const isOpen = ref<boolean>(false)

const toggle = () => { 
    if (props.option.toggle !== false) isOpen.value = !isOpen.value 
}

const closeIfToggle = () => { 
    if (props.option.toggle !== false) isOpen.value = false 
}

const emits = defineEmits<{
  (e: 'change', value: any, key: string): void
  (e: 'confirmChange', value: any, key: string): void
}>()

const displayText = computed(() => {
  if (!model.value) return props.option.placeholder ?? '—'

  if (typeof props.display === 'function') 
    return props.display(model.value)

  if (props.option.labelProp && model.value?.[props.option.labelProp] != null)
    return String(model.value[props.option.labelProp])

  if (typeof model.value === 'string' || typeof model.value === 'number')
    return String(model.value)

  return props.option.placeholder ?? '—'
})

const emitChange = () => {
  emits('change', model.value, props.option.key ?? 'N/A')
}

const emitConfirmChange = () => {
  emits('confirmChange', model.value, props.option.key ?? 'N/A')
}



const confirmAndClose = () => {
  emitConfirmChange()
  closeIfToggle()
}
</script>

<style scoped>

.selected {
  height: fit-content;
  padding: .5em 1em;
}

.display {
  color: black;
  width: 100%;
  max-width: 260px;
  box-sizing: border-box;
  padding: 10px;
  font-size: large;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  border: 1px dashed transparent;
}

.display:hover { 
    cursor: cell; 
    border-color: #ddd; 
}

</style>
