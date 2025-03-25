<template>
<v-dialog activator="parent" max-width="500">
        
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          Ajouter une Compétence
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="emit('add-dialog', false);"
        ></v-btn>
      </v-card-title>

      <v-divider class="mb-4"></v-divider>

      <v-card-text>
        <div>
        <div class="text-medium-emphasis mb-4">
          Nom de la compétence : 
        </div>
        <v-text-field v-model="nameSkills" @update:model-value="nameSkills=$event" ></v-text-field>
    </div>
    <div>
        <div class="text-medium-emphasis mb-4">
          Type de Compétence
        </div>

        <v-select
:items="skillsTypeList"
:model-value="selectTypeSkills"
@update:model-value="selectTypeSkills=$event"
></v-select>
    </div>
  
    <div v-if="selectTypeSkills !== 'Soft Skills' && selectTypeSkills !== 'Languages'">
        <div class="text-medium-emphasis mb-4">
          Année d'expérience
        </div>

        <v-number-input
:reverse="false"
controlVariant="split"
label=""
:hideInput="false"
:inset="false"
v-model="yearsExperience"
></v-number-input>
    </div>
    <div v-if="selectTypeSkills !== 'Soft Skills' && selectTypeSkills !== 'Languages'">
        <div class="text-medium-emphasis mb-4">
          Dernière utilisation
        </div>
        <v-date-input
v-model="selectedDate"
label="Sélectionnez une date"
@change="selectedDate=$event"
></v-date-input>
    </div>
  
    <div v-if="selectTypeSkills==='Languages'">
      <div class="text-medium-emphasis mb-4" >
          Niveau : 
        </div>
        <v-select :items="skillsLevel" :model-value="selectSkillsLevel" @update:model-value="selectSkillsLevel=$event"></v-select>
    </div>
    <div v-if="selectTypeSkills==='Languages'">
      <div class="text-medium-emphasis mb-4" >
          TOIEC : 
        </div>
        <v-number-input
:reverse="false"
controlVariant="split"
label=""
:hideInput="false"
:inset="false"
v-model="toiec"
></v-number-input>
    </div>

    <div>
        <div class="text-medium-emphasis mb-4">
          Image d'illustration de la compétence : 
        </div>
        <v-file-input label="File input" v-model="imageSkills"></v-file-input>
    </div>
      </v-card-text>

      <v-divider class="mt-2"></v-divider>

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
          class="text-none"
          rounded="xl"
          text="Cancel"
          @click="emit('add-dialog', false);"
        ></v-btn>

        <v-btn
class="text-none"
color="primary"
rounded="xl"
text="Send"
variant="flat"
@click=" addSkillsEvent(nameSkills!,selectTypeSkills!, imageSkills!, token!, yearsExperience!, selectedDate!)
"
>
Send
</v-btn>

      </v-card-actions>
    </v-card>
 
</v-dialog>
</template>

<script lang="ts" setup>
import type { TSkills } from '@/interfaces/interfaces'
import {addSkills} from '@/services/skills.service'
import { useConnexionStore } from '@/store/connexion.store'
import { computed, ref } from 'vue'
import { useSkillStore } from '@/store/skill.store'
import { storeToRefs } from 'pinia'

const props = defineProps<{
    dialogAdd: boolean;
}>();



const nameSkills=ref<string>()
const selectTypeSkills=ref<TSkills>()
const imageSkills=ref<File>()
const yearsExperience=ref<number>()
const toiec=ref<number>()
const selectedDate = ref<Date>();
const connexionStore = useConnexionStore();
const skillsStore = useSkillStore();
const {  addSkill } = skillsStore;

const token = computed(() => connexionStore.token);

const skillsTypeList:TSkills[]=['Front-end','Back-end','Base de données','Languages','Modelisation','Soft Skills']

const skillsLevel:string[]=['Debutant','Intermediaire','Maternelle']
const selectSkillsLevel=ref<string>('')

const emit=defineEmits(['add-dialog'])

async function addSkillsEvent(nameSkills:string,selectTypeSkills:TSkills , imageSkills:File , token:string , yearsExperience:number , selectedDate:Date ){
  addSkill(nameSkills!,selectTypeSkills!, imageSkills!, token!, yearsExperience!, selectedDate!)
  emit('add-dialog', false);
}
</script>