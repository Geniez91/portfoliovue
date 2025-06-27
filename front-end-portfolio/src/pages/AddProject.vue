<template>
  <div class="mx-3 my-5">
    <div>
      <h2 class="text-h6 text-primary">Ajout d'un Projet</h2>
    </div>
    <v-divider class="my-2 border-opacity-75" color="primary"></v-divider>
    <v-card class="my-3 px-3">
    <v-form>
      <div class="my-2">
        <p>Nom du Projet : </p>
        <v-text-field type="text" v-model="nameProjet" @update:model-value="nameProjet=$event" :rules="[emptyRules]"> </v-text-field>
      </div>
      <div class="my-2">
        <p>Description  : </p>
        <v-text-field type="text" v-model="description" :rules="[emptyRules]"> </v-text-field>
      </div>

      <div class="my-2">
        <p>Lien Github  : </p>
        <v-text-field type="text" v-model="linkGitHub" :rules="[emptyRules]"> </v-text-field>
      </div>

      <div class="my-2">
        <p>Nombre de collaborateur  : </p>
      <v-number-input
  v-model="nbCollaborator"
></v-number-input>
      </div>

      <div class="my-2">
        <p>Année de réalisation du projet :</p>
        <div class="d-flex">
          <v-date-input
          v-model="year"
          label="Year of the project"
          :max="endDate"
          class="mr-5"

        ></v-date-input>

        </div>
  
      </div>


      <div>
        <div class="text-medium-emphasis mb-4">
          Image d'illustration de l'expérience Profesionelle : 
        </div>
        <v-file-upload label="File input" multiple v-model="imageSkills"></v-file-upload>
    </div>

      <div class="my-2">
        <p>Stack Technique</p>
        <v-autocomplete
          v-model="stackproject"
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
    <v-btn color="info" prepend-icon="mdi-plus" class="my-5" @click="addProjectHandler">Ajouter</v-btn>
    </div>
     
    </div>
  </div>
</template>

<script lang="ts" setup>
import Wrapper from '@/components/Wrapper.vue';
import '@toast-ui/editor/dist/toastui-editor.css';
import { computed, ref } from 'vue';
import { STACKLIST } from '@/constant/constant';
import type { IProject3, IStack } from '@/interfaces/interfaces';
import { useConnexionStore } from '@/store/connexion.store';
import {emptyRules} from '../services/utils'
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/store/project.store';

const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);
const editorRef = ref<InstanceType<typeof Wrapper> | null>(null);
const imageSkills=ref<File[]>()
const nameProjet=ref<string>()
const description=ref<string>()
const linkGitHub=ref<string>()
const year = ref<Date>();
const endDate= ref<Date>();
const nbCollaborator=ref<number>(0)
const project=ref<IProject3>()
const stackproject = ref<IStack[]>([]);
const {addProjects}=useProjectStore()
const route=useRouter()

async function addProjectHandler(){
  const editorInstance = editorRef.value?.editor;

  if(description.value&& nameProjet.value && linkGitHub.value && year.value&& nbCollaborator.value && editorInstance&& token.value&& imageSkills.value){
    project.value={
      description:description.value,
      name:nameProjet.value,
      linkGithub:linkGitHub.value,
      nbCollaborator:nbCollaborator.value,
      stackImg:stackproject.value,
      year:year.value,
      thumbnail:imageSkills.value,
      content:editorInstance.getMarkdown(),
  }
  console.log('test1')
  await addProjects(project.value,token.value)
  route.push('projects')
  }
  console.log('test')
  

};
</script>

<style lang="css" scoped>

</style>
