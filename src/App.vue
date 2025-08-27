<template>
  <div>
    <form @submit.prevent="SimulateSendFormulaire" class="demo">

      <div class="flex-row">
        <DynamicSingleSelectorsInput 
          :option="optionSelector"
          v-model="formulaire.dynamicMutlipleSelectorsInput"
          :display="u => u ? `${u.name} (#${u.id})` : 'Choisir un utilisateur'"
          @change="SimulateChangeValuePatch"
          @confirm-change="SimulateChangeValuePatch"
          >
          <option v-for="data in listUsers" :value="data"> {{ data.name }} </option>
        </DynamicSingleSelectorsInput>
      </div>

      <div class="flex-row">
        <DynamicMutlipleSelectorsInput 
          :option="optionMultipleSelector"
          v-model="formulaire.dynamicMutlipleSelectorsInput"
          :display="u => u ? `${u.name} (#${u.id})` : 'Choisir un utilisateur'"
          @change="SimulateChangeValuePatch"
          @confirm-change="SimulateChangeValuePatch"
          >
        </DynamicMutlipleSelectorsInput>

        <p> {{ formulaire.dynamicMutlipleSelectorsInput }}</p>
      </div>

      <div>
        <DynamicTextInput @change="SimulateChangeValuePatch" :option="{ key: 'name', placeHolder: 'Ajouter une valeur', type: 'text' }" v-model="formulaire.dynamicTextInput" />
      </div>

      <div>
        <DynamicTextInput @change="SimulateChangeValuePatch" :option="{ key: 'fees', placeHolder: 'Ajouter une valeur', type: 'number',  context: 'price' }" v-model="formulaire.dynamicPriceInput" />
      </div>

      <div class="flex-row">
        <DynamicButtonInput :option="{ name: 'Send', type: 'submit' }" />
        <DynamicButtonInput :option="{ name: 'Refresh', type: 'reset' }" />
        <DynamicButtonInput :option="{ name: 'Toggle Popup', type: 'button' }" @click="togglePopup(true, BasicTextPopup)"  />
      </div>

    </form>

    <p class="console"> {{  consoleFormStatus  }}</p>

    <Popup>
      <component :is="componentToShow" />
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import DynamicSingleSelectorsInput, { type DynamicSingleSelectorInput } from './components/inputs/DynamicSingleSelectorsInput.vue';
import DynamicButtonInput from './components/inputs/DynamicButtonInput.vue';
import Popup from './components/other/Popup.vue';
import { usePopupStore } from './stores/PopupStore';
import { storeToRefs } from 'pinia';
import BasicTextPopup from './components/popup/BasicTextPopup.vue';
import DynamicTextInput, { type DynamicTextInputEmits } from './components/inputs/DynamicTextInput.vue';
import DynamicMutlipleSelectorsInput, { type DynamicMultipleSelectorInput } from './components/inputs/DynamicMutlipleSelectorsInput.vue';

const popupStore = usePopupStore()
const { togglePopup } = popupStore
const { componentToShow } = storeToRefs(popupStore)



const formulaire = reactive({
  dynamicSingleInput: null as User | null,
  dynamicMutlipleSelectorsInput: [] as User[],
  dynamicTextInput: "",
  dynamicPriceInput: 0
})

interface User {
  id: string
  name: string
}

const consoleFormStatus = ref<string>("Rien à signaler")

const listUsers: User[] = [
  { id: '1', name: "Adryan" },
  { id: '2', name: "John" },
  { id: '3', name: "Doe" },
]

const optionSelector: DynamicSingleSelectorInput = {
    name: 'Selector Name',
    key: 'consultant',
    toggle: true,
    placeholder: 'Choisir un utilisateur',
    labelProp: 'name'
}

const optionMultipleSelector: DynamicMultipleSelectorInput = { 
  name: 'Multiple Selector',
  key: 'localisation',
  toggle: false,
  placeholder: 'Choisir un ou plusieurs utilisateurs',
  listData: listUsers,
  labelProp: 'name'
}

const SimulateChangeValuePatch = (data: DynamicTextInputEmits, key: keyof DynamicTextInputEmits) => {
   console.log("Données à Patch", data, key)
}

const SimulateSendFormulaire = () => {
  
}


</script>

<style lang="css" scoped>

.flex-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.demo > div {
  height: fit-content;
  min-height: 50px;
  border-bottom: solid 1px black;
  padding: 20px;
}

.console {
  color: brown;
}

</style>
