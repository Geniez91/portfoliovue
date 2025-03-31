<template>
         <v-dialog activator="parent" max-width="500">
        
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
              Modifier une Compétence
            </div>

            <v-btn
              icon="mdi-close"
              variant="text"
              @click="emit('update-dialog', false);"
            ></v-btn>
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-card-text>
            <div>
            <div class="text-medium-emphasis mb-4">
              Nom de la compétence : 
            </div>
            <v-text-field v-model="skill.language" @update:model-value="skill.language=$event" ></v-text-field>
        </div>
        <div>
            <div class="text-medium-emphasis mb-4">
              Type de Compétence
            </div>

            <v-select
:items="skillsTypeList"
:model-value="skill.idType"
@update:model-value="skill.idType=$event"
></v-select>
        </div>
      
        <div v-if="skill.idType !== 'Soft Skills' && skill.idType !== 'Languages'">
            <div class="text-medium-emphasis mb-4">
              Année d'expérience
            </div>

            <v-number-input
:reverse="false"
controlVariant="split"
label=""
:hideInput="false"
:inset="false"
v-model="skill.yearsExperience"
></v-number-input>
        </div>
        <div v-if="skill.idType !== 'Soft Skills' && skill.idType !== 'Languages'">
            <div class="text-medium-emphasis mb-4">
              Dernière utilisation
            </div>
            <v-date-input
  v-model="skill.usageExperience"
  label="Sélectionnez une date"
  @change="selectedDate=$event"
></v-date-input>
        </div>
        <div v-if="skill.idType==='Languages'">
      <div class="text-medium-emphasis mb-4" >
          Niveau : 
        </div>
        <v-select :items="skillsLevel" :model-value="skill.level" @update:model-value="skill.level=$event"></v-select>
    </div>
    <div v-if="skill.idType==='Languages'">
      <div class="text-medium-emphasis mb-4" >
          TOIEC : 
        </div>
        <v-number-input
:reverse="false"
controlVariant="split"
label=""
:hideInput="false"
:inset="false"
v-model="skill.TOIEC"
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
              @click="emit('update-dialog', false);"
            ></v-btn>

            <v-btn
class="text-none"
color="primary"
rounded="xl"
text="Send"
variant="flat"
@click="updateSkillEvent"
>
Send
</v-btn>

          </v-card-actions>
        </v-card>
     
    </v-dialog>
</template>

<script setup lang="ts">
import type { ISkills, TSkills } from '@/interfaces/interfaces';
import { updateSkill } from '@/services/skills.service';
import { useConnexionStore } from '@/store/connexion.store';
import { useSkillStore } from '@/store/skill.store';
import { computed, ref } from 'vue';

const props = defineProps<{
    dialogUpdate: boolean;
    skill:ISkills
}>();

console.log(props.skill)
const emit=defineEmits(['update-dialog','error-message','success-message'])
const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);
const skillsStore = useSkillStore();
const skill=ref<ISkills>(props.skill)
const nameSkills=ref<string>()
const selectTypeSkills=ref<TSkills>()
const imageSkills=ref<File>()
const yearsExperience=ref<number>()
const selectedDate = ref<Date>();
const {  updateSkillById } = skillsStore;
const skillsLevel:string[]=['Debutant','Intermediaire','Maternelle']
const successMessage=computed(()=>skillsStore.successMessage)
const errorMessage=computed(()=>skillsStore.errorMessage)


const skillsTypeList:TSkills[]=['Front-end','Back-end','Base de données','Languages','Modelisation','Soft Skills']

async function updateSkillEvent(){
 await updateSkillById(skill.value.id,skill.value,token.value!,imageSkills.value!)
  emit('success-message',successMessage.value)
  emit('error-message',errorMessage.value)
  emit('update-dialog', false);
}
</script>