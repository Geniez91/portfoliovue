<template>
    <div class="mx-3 my-5">
        <p class="text-h6 text-primary">Mes Projets</p>
        <div class="mt-5">
            <v-autocomplete
            autofocus
          prepend-inner-icon="mdi-magnify"
  placeholder="Nom du projet"
  :items="projetsTitle(projet)"
  variant="solo"
  rounded
  clearable
  :model-value="nameProjet"
  @update:model-value="searchNameProjet($event)"
></v-autocomplete>
        </div>
        <div>
            <v-chip
            v-for="tag in tagStack"
      class="ma-2"
      @click=" selectTag = toggleTag(tag, selectTag);"
       :color="selectTag.includes(tag) ? 'secondary' : 'silver'"
      variant="flat"

    >
      {{ tag }}
    </v-chip>
   
        </div>
        <div >
            <div v-for="(item,year) in projetbyYear" :key="year">
                <div class="d-flex flex-column align-center mt-8">
                    <p class="text-primary text-h6" style="text-decoration: underline;">{{ year }}</p>
                </div>
                <v-row class="mt-3">
    <v-col cols="12" sm="12" md="6" lg="4" v-for="projet in item" :key="projet.name">
        <v-card color="secondary" class="d-flex flex-column justify-space-between fill-height ">
            <div class="d-flex align-center flex-column mt-8">
                <p class="text-primary font-weight-bold text-subtitle-1">{{ projet.name }}</p>
            </div>
            <div class="my-6">
                <v-carousel hide-delimiters show-arrows="hover" style="border-radius: 5px; border: 2px solid black; width: 100%; height: 300px; z-index: 5;   box-shadow: 0 4px 4px 0 black "
                cycle>
                    <v-carousel-item v-for="item in projet.thumbnail" fill 
    :src="getImageSrc(item)"
  ></v-carousel-item>
                </v-carousel>
            </div>
            <div class="mx-3">
                <p class="text-primary text-body-1 font-weight-medium">{{ projet.description }}</p>
            </div>
            <div class="mx-3 mt-2">
                <p class="text-primary text-body-1 font-weight-medium">Nombre de personnes ayant réalisée le projet : {{ projet.nbCollaborator }}</p>
            </div>
            <div class="mx-3 mt-2">
                <p class="text-primary text-subtitle-1" style="text-decoration: underline;">Stack Technique :</p>
            </div>
            <v-row class="my-2 mx-3" style="width: fit-content;">
                <v-col v-for="img in projet.stackImg" :key="img.name" class="mr-4">
                    <v-img :src="img.img" :alt="`${img.name} image`" style="width: 60px; height: 60px;" :key="img.name"></v-img>
                </v-col>
            </v-row>
            <div class="d-flex flex-column  mt-2">
                <v-btn color="navbar" :to="`projects/${projet.name}`">En savoir plus ?</v-btn>
                 <v-btn color="warning" :to="`editProject/${projet.id}`">
                    <v-icon icon="mdi-pencil"></v-icon>
                </v-btn>
                <v-btn color="red" @click="projectStore.deleteProjects(token!,projet.id!)">
                    <v-icon icon="mdi-delete" ></v-icon>
                </v-btn>
            </div>
        </v-card>
    </v-col>
</v-row> 
            <v-divider class="border-opacity-100 mt-10" color="primary"></v-divider>
            </div>
        </div>
            <div class="d-flex justify-center align-center my-4" style="height: 90px;" v-if="token" >
    <div class="d-flex align-center">
        <v-btn variant="text" to="addProject" class="text-white mx-3">
            <v-icon icon="mdi-plus" size="42"></v-icon>
            <p class="text-white">Ajouter un Projet</p>
        </v-btn>
    </div>
</div>
    </div>
</template>
<script lang="ts" setup>
import type {  IProject3 } from '@/interfaces/interfaces';
import { computed, onMounted, ref } from 'vue';
import {filterProjet, getTagsFilter, getTagStack, projetsTitle, searchProjetFilter, sortProjetByYear, toggleTag} from '../services/project.service'
import { useConnexionStore } from '@/store/connexion.store';
import { useProjectStore } from '@/store/project.store';

const connexionStore = useConnexionStore();
const projectStore=useProjectStore()
const token = computed(() => connexionStore.token);

const projetStore= useProjectStore()
const projet = computed(() => projetStore.project);
const isLoaded=computed(()=>projetStore.isLoaded)

onMounted(async () => {
 await projetStore.getAllProjects();
 console.log(projet.value)
});

function getImageSrc(src: string | File): string {
  if (typeof src === 'string') return src;
  return URL.createObjectURL(src); 
}


const selectTag=ref<string[]>([])
const nameProjet=ref<string>('')

const projetbyYear = computed(() => {
  return sortProjetByYear(filtersProjet.value)
});

const tagsFilter=computed<IProject3[]>(()=>{
  return getTagsFilter(selectTag.value,projet.value)
})

const searchFilter=computed<IProject3[]>(()=>{
    return searchProjetFilter(projet.value,nameProjet.value)
})

const filtersProjet=computed<IProject3[]>(()=>{
   return filterProjet(tagsFilter.value,searchFilter.value)
})

const tagStack=computed<string[]>(()=>{
    return getTagStack(projet.value)
})

function searchNameProjet(value:string):void{
    nameProjet.value=value;
}
</script>

