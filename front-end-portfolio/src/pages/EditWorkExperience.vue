<template>
    <div class="mx-3 my-5">
      <div>
        <h2 class="text-h6 text-primary">Modification d'une expérience professionnelle</h2>
      </div>
      <v-divider class="my-2 border-opacity-75" color="primary"></v-divider>
      <v-card class="my-3 px-3">
      <v-form>
        <div class="my-2">
          <p>Nom de l'entreprise : </p>
          <v-text-field type="text" v-model="currentWorkExperience.nameCompany" @update:model-value="currentWorkExperience.nameCompany=$event" :rules="[emptyRules]"> </v-text-field>
        </div>
        <div class="my-2">
          <p>Emploi  : </p>
          <v-text-field type="text" v-model="currentWorkExperience.job" :rules="[emptyRules]"> </v-text-field>
        </div>
  
        <div class="my-2">
          <p>Periode de l'expérience :</p>
          <div class="d-flex">
            <v-date-input
            v-model="currentWorkExperience.startDate"
            label="Start Date"
            :max="currentWorkExperience.endDate"
            class="mr-5"
  
          ></v-date-input>
          <v-date-input
            v-model="currentWorkExperience.endDate"
            label="End Date"
            :min="currentWorkExperience.startDate" 
          ></v-date-input>
          </div>
        </div>
        <div class="my-2">
          <p>Liste des Taches Effectués</p>
          <div ref="divTasks">
            <v-text-field v-for="(task,index) in currentWorkExperience.tasks"
            :key="index"
            v-model="currentWorkExperience.tasks[index]"
            label="Description des tâches effectuées"
            :rules="[emptyRules]"
            @change="currentWorkExperience.tasks[index]=task"
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
            v-model="currentWorkExperience.stack"
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
        <Wrapper ref="editorRef" :initial-value="currentWorkExperience.content"/>
      </v-card>

      <div class="d-flex justify-center">
        <v-btn class="my-5" @click="addWorkExperienceHandler" color="warning" prepend-icon="mdi-pencil">Editer</v-btn>
      </div>
        
       
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import Wrapper from '@/components/Wrapper.vue';
  import '@toast-ui/editor/dist/toastui-editor.css';
  import { computed, onMounted, ref } from 'vue';
  import { STACKLIST } from '@/constant/constant';
  import {type IWorkExperience2 } from '@/interfaces/interfaces';
  import { useConnexionStore } from '@/store/connexion.store';
  import {useWorkExperienceStore} from '@/store/workExperience.store'
  import {emptyRules} from '../services/utils'
  import { useRoute,useRouter } from 'vue-router';
  
  const connexionStore = useConnexionStore();
  const token = computed(() => connexionStore.token);
  const editorRef = ref<InstanceType<typeof Wrapper> | null>(null);
  const imageSkills=ref<File>()
  const tasksList=ref<string[]>([''])
  const {updateWorkExperienceById}=useWorkExperienceStore()
  const workExperienceStore= useWorkExperienceStore()
  function findWorkExperience(){
    const found = workExperiences.value.find(
    (exp) => exp.id?.toString() === route.params.id
  );
  if (!found) {
    throw new Error("Work experience not found");
  }
  return found;
}

const workExperiences = computed(() => workExperienceStore.workExperiences);
const route = useRoute();
const router= useRouter()
const currentWorkExperience=ref<IWorkExperience2>(findWorkExperience())

  function addTask(){
    tasksList.value.push('')
  }
  
  async function addWorkExperienceHandler(){
    const editorInstance = editorRef.value?.editor;

    if(token.value){
      if(imageSkills.value){
      currentWorkExperience.value={
        ...currentWorkExperience.value,
        srcImg:imageSkills.value,
        content:editorInstance.getMarkdown()
    }
 }
   currentWorkExperience.value={
        ...currentWorkExperience.value,
        content:editorInstance.getMarkdown()
   }
    await updateWorkExperienceById(currentWorkExperience.value,token.value)
    }
       router.push("/workExperience")
    }

  onMounted(() => {
    const exp = findWorkExperience()
  exp.startDate = new Date(exp.startDate)
  exp.endDate = new Date(exp.endDate)
  currentWorkExperience.value = exp
  })
  </script>
  
  <style lang="css" scoped>
  
  </style>
  