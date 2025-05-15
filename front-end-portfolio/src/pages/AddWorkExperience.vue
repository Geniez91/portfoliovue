<template>
  <div class="mx-3 my-5">
    <div>
      <h2 class="text-h6 text-primary">Ajout d'une expérience professionnelle</h2>
    </div>
    <v-divider class="my-2 border-opacity-75" color="primary"></v-divider>
    <v-card class="my-3 px-3">
    <v-form>
      <div class="my-2">
        <p>Nom de l'entreprise : </p>
        <v-text-field type="text" v-model="nameCompany" @update:model-value="nameCompany=$event" :rules="[emptyRules]"> </v-text-field>
      </div>
      <div class="my-2">
        <p>Emploi  : </p>
        <v-text-field type="text" v-model="job" :rules="[emptyRules]"> </v-text-field>
      </div>

      <div class="my-2">
        <p>Periode de l'expérience :</p>
        <div class="d-flex">
          <v-date-input
          v-model="startDate"
          label="Start Date"
          :max="endDate"
          class="mr-5"

        ></v-date-input>
        <v-date-input
          v-model="endDate"
          label="End Date"
          :min="startDate" 
        ></v-date-input>
        </div>
  
      </div>

      <div class="my-2">
        <p>Liste des Taches Effectués</p>
        <div ref="divTasks">
          <v-text-field v-for="(task,index) in tasksList"
          :key="index"
          v-model="tasksList[index]"
          label="Description des tâches effectuées"
          :rules="[emptyRules]"
          @change="tasksList[index]=task"
          >
          </v-text-field>
        </div>
        <v-btn @click="addTask">Ajouter une Tache</v-btn>
      </div>

      <div>
        <div class="text-medium-emphasis mb-4">
          Image d'illustration de l'expérience Profesionelle : 
        </div>
        <v-file-input label="File input" v-model="imageSkills"></v-file-input>
    </div>

      <div class="my-2">
        <p>Stack Technique</p>
        <v-autocomplete
          v-model="stackWorkExperience"
          :items="STACKLIST"
          color="blue-grey-lighten-2"
          item-value="item"
          label="Select"
          chips
          closable-chips
          multiple
        >
          <template v-slot:chip="{ props, item }">
            <v-chip
              v-bind="props"
              :prepend-avatar="item.raw.img"
              :text="item.raw.name"        
              density="compact"
              size="x-large"
            ></v-chip>
          </template>

          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="item.raw.img" 
              :subtitle="item.raw.name"
              :title="item.raw.name"
            ></v-list-item>
          </template>
        </v-autocomplete>
      </div>
    </v-form>
  </v-card>
    <div>
      <div>
      <h2 class="text-h6 text-primary">Détail de l'expérience : </h2>
    </div>
    <v-divider class="my-2 border-opacity-75" color="primary"></v-divider>

    <v-card>
      <Wrapper ref="editorRef" />
    </v-card>
      
    <div class="d-flex justify-center">
    <v-btn color="info" prepend-icon="mdi-plus" class="my-5" @click="addWorkExperienceHandler">Ajouter</v-btn>
    </div>
     
    </div>
  </div>
</template>

<script lang="ts" setup>
import Wrapper from '@/components/Wrapper.vue';
import '@toast-ui/editor/dist/toastui-editor.css';
import { computed, ref } from 'vue';
import { STACKLIST } from '@/constant/constant';
import type { IStackWorkExperience,IWorkExperience1 } from '@/interfaces/interfaces';
import { useConnexionStore } from '@/store/connexion.store';
import {useWorkExperienceStore} from '@/store/workExperience.store'
import {emptyRules} from '../services/utils'
import { useRouter } from 'vue-router';

const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);
const editorRef = ref<InstanceType<typeof Wrapper> | null>(null);
const imageSkills=ref<File>()

const nameCompany=ref<string>()
const job=ref<string>()
const startDate = ref<Date>();
const endDate= ref<Date>();
const workExperience1=ref<IWorkExperience1>()
const tasksList=ref<string[]>([''])
const stackWorkExperience = ref<IStackWorkExperience[]>([]);
const {addWorkExperiences}=useWorkExperienceStore()
const route=useRouter()

function addTask(){
  tasksList.value.push('')
}

async function addWorkExperienceHandler(){
  const editorInstance = editorRef.value?.editor;

  if(job.value&& nameCompany.value && endDate.value && startDate.value&& tasksList.value && editorInstance&& token.value&& imageSkills.value){
    workExperience1.value={
    srcImg:imageSkills.value,
    content:editorInstance.getMarkdown(),
    job:job.value,
    nameCompany:nameCompany.value,
    endDate:endDate.value,
    startDate:startDate.value,
    tasks:tasksList.value,
    stack:stackWorkExperience.value
  }
  await addWorkExperiences(workExperience1.value,token.value)
  route.push('workExperience')
  }
  

};
</script>

<style lang="css" scoped>

</style>
