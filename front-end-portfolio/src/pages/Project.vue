<template>
    <div class="mx-3 my-5">
        <p class="text-h6 text-black">Mes Projets</p>
        <div class="mt-5">
            <v-autocomplete
            autofocus
          prepend-inner-icon="mdi-magnify"
  placeholder="Nom du projet"
  :items="projetsTitle(projets)"
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
                    <p class="text-black text-h6" style="text-decoration: underline;">{{ year }}</p>
                </div>
                <v-row class="mt-3">
    <v-col cols="12" sm="4" md="4" lg="4" v-for="projet in item" :key="projet.name">
        <v-card color="#39B8B1" class="d-flex flex-column justify-space-between fill-height " hover>
            <div class="d-flex align-center flex-column mt-8">
                <p class="text-black font-weight-bold text-subtitle-1">{{ projet.name }}</p>
            </div>
            <div class="my-6">
                <v-carousel hide-delimiters show-arrows="hover" style="border-radius: 5px; border: 2px solid black; width: 100%; height: 300px; z-index: 5;   box-shadow: 0 4px 4px 0 black "
                cycle>
                    <v-carousel-item v-for="item in projet.thumbnail" fill 
    :src="item"
  ></v-carousel-item>
                </v-carousel>
            </div>
            <div class="mx-3">
                <p class="text-black text-body-1 font-weight-medium">{{ projet.description }}</p>
            </div>
            <div class="mx-3 mt-2">
                <p class="text-black text-body-1 font-weight-medium">Nombre de personnes ayant réalisée le projet : {{ projet.nbCollaborator }}</p>
            </div>
            <div class="mx-3 mt-2">
                <p class="text-black text-subtitle-1" style="text-decoration: underline;">Stack Technique :</p>
            </div>
            <div class="d-flex my-2 mx-3">
                <div v-for="img in projet.stackImg" :key="img.name" class="mr-4">
                    <v-img :src="img.img" style="width: 60px; height: 60px;"></v-img>
                </div>
            </div>
            <div class="d-flex flex-column  mt-2">
                <v-btn>En savoir plus ?</v-btn>
            </div>
        </v-card>
    </v-col>
</v-row> 
            <v-divider class="border-opacity-100 mt-10" color="black"></v-divider>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import type { IProject } from '@/interfaces/interfaces';
import Portfolio from '../assets/portfolio.png'
import Experience from '../assets/experience.png'
import Formations from '../assets/formations.png'
import Facebook from '../assets/facebook-logo.jpg'
import pointNews from '../assets/pointnews.png'
import { computed, ref } from 'vue';
import { ANGULAR, C, CSS, FIREBASE, FLUTTER, Go, HTML, JAVASCRIPT, NEST, PANDAS, PHP, PYTHON, REACT, REACT_NATIVE, REDIS, SKLEARN, TYPESCRIPT, VUE } from '@/constant/constant';
import {filterProjet, getTagsFilter, getTagStack, projetsTitle, searchProjetFilter, sortProjetByYear, toggleTag} from '../services/project.service'

const selectTag=ref<string[]>([])
const nameProjet=ref<string>('')
const projets=ref<IProject[]>([
    {
    name:'PortFolio',
    year:new Date('2025'),
    description:`Création de mon portfolio me permettant de décrire mon parcours, mes expériences profesionnelles et mes projets réalisés`,
    linkGithub:'https://github.com/Geniez91/portfoliovue',
    nbCollaborator:1,
    stackImg:[VUE,TYPESCRIPT,HTML,CSS],
    thumbnail:[Portfolio,Experience,Formations]
},
{
    name:'Projet IA Euro',
    year:new Date('2024'),
    description:'Projet académique de Machine Learning qui permet de prédire des matchs de Football',
    linkGithub:'https://github.com/Geniez91/ProjetIAEuro',
    nbCollaborator:3,
    stackImg:[PYTHON,SKLEARN,PANDAS],
    thumbnail:[Experience]
},
{
    name:'Les Echecs',
    year:new Date('2024'),
    description:`Projet Académique qui simule un jeu d'echec dans le but d'apprendre à coder avec des tests unitaires en utilisant la méthode TDD.`,
    linkGithub:'https://github.com/Geniez91/chess',
    nbCollaborator:3,
    stackImg:[TYPESCRIPT],
    thumbnail:[Experience]
},
{
    name:'TodoListApp',
    year:new Date('2023'),
    description:`Il s'agit d'une application web de gestion de tâches développée avec Angular, permettant d'effectuer les opérations CRUD (Créer, Lire, Mettre à jour et Supprimer).`,
    linkGithub:'https://github.com/Geniez91/TodoListApp',
    nbCollaborator:3,
    stackImg:[ANGULAR,TYPESCRIPT,HTML,CSS],
    thumbnail:[Experience]
},
{
    name:'Application micro service de Cinéma',
    year:new Date('2023'),
    description:`Il s'agit d'une application microservices dotée d'un backend développé avec NestJS pour la gestion des tickets et l'envoi de notifications via Discord. L'application dispose également d'un frontend en Vue.js et est conteneurisée avec Docker afin d'automatiser son déploiement`,
    nbCollaborator:3,
    stackImg:[NEST],
    linkGithub:'https://github.com/Geniez91/microservice',
    thumbnail:[Experience]

},
{
    name:'Api Réseau social',
    description:`Cette API, développée en NestJS, intègre les principales fonctionnalités des réseaux sociaux, telles que la gestion des utilisateurs, des publications, des catégories de posts et des commentaires, le tout sous forme d'opérations CRUD (Create, Read, Update, Delete).`,
    linkGithub:'https://github.com/Geniez91/nestsocial',
    nbCollaborator:3,
    stackImg:[NEST,TYPESCRIPT],
    thumbnail:[Facebook],
    year:new Date('2023')
},
{
    name:'WatchSeries',
    description:'Application Mobile de recherche de films et de séries en React Native',
    linkGithub:'https://github.com/Geniez91/WatchSeries',
    nbCollaborator:1,
    stackImg:[REACT_NATIVE,JAVASCRIPT],
    thumbnail:[Experience],
    year:new Date('2022')
},
{
    name:'ArrowverseQuiz',
    description:'Site de Quiz sur l"univers de la série Arrow',
    linkGithub:'https://github.com/Geniez91/ArrowVerseQuizz',
    nbCollaborator:1,
    stackImg:[REACT,JAVASCRIPT],
    thumbnail:[Experience],
    year:new Date('2021')
},
{
    name:'PointNews',
    description: `Site d'actualité sur les films et les séries`,
    linkGithub:'https://github.com/Geniez91/PointNews',
    nbCollaborator:1,
    stackImg:[PHP,JAVASCRIPT,CSS,HTML],
    thumbnail:[pointNews],
    year:new Date('2021')
},
{
    name:'RESA',
    description:'Logiciel de Réservation pour les vacances en C#',
    linkGithub:'https://github.com/Geniez91/RESA',
    nbCollaborator:1,
    stackImg:[C],
    thumbnail:[Experience],
    year:new Date('2020')

},
{
    name:'URL Shortener',
    description:`Un URL Shortener est un outil qui permet de transformer une URL longue et complexe en une URL courte et facile à partager. Il fonctionne en générant une clé unique pour l'URL longue et en la stockant dans une base de données. Lorsque l'utilisateur visite l'URL courte, il est redirigé vers l'URL longue d'origine.`,
    linkGithub:'https://github.com/rayan917/go-url-shorter',
    nbCollaborator:3,
    stackImg:[Go,REDIS,ANGULAR,TYPESCRIPT],
    thumbnail:[Experience],
    year:new Date('2024')
},
{
    name:'Projet Web Avril',
    description:`Ce projet inclut une application web développée avec Angular et une application mobile en Flutter, toutes deux utilisant Firebase comme backend. Firebase fournit à la fois les services d'authentification des utilisateurs et le stockage des données relatives aux villes.`,
    linkGithub:'https://github.com/ibrahimaberete/projet-web-avril',
    nbCollaborator:4,
    stackImg:[TYPESCRIPT,HTML,CSS,FLUTTER,ANGULAR,FIREBASE],
    thumbnail:[Experience],
    year:new Date('2024')
},
{
    name:'DoctoLib',
    description:`DoctoLib est une application Angular conçue pour permettre aux utilisateurs de planifier des rendez-vous médicaux, s'inspirant du modèle de Doctolib. Les fonctionnalités développées comprennent la connexion, l'inscription, l'affichage des rendez-vous disponibles, la prise de rendez-vous, l'annulation de rendez-vous, l'affichage détaillé des informations des médecins, et la page de profil de l'utilisateur avec la possibilité d'éditer son profil.`,
    linkGithub:'https://github.com/rayan917/doctolib-angular',
    nbCollaborator:3,
    stackImg:[CSS,HTML,TYPESCRIPT,ANGULAR],
    thumbnail:[Experience],
    year:new Date('2023')
}
])

const projetbyYear = computed(() => {
  return sortProjetByYear(filtersProjet.value)
});

const tagsFilter=computed<IProject[]>(()=>{
  return getTagsFilter(selectTag.value,projets.value)
})

const searchFilter=computed<IProject[]>(()=>{
    return searchProjetFilter(projets.value,nameProjet.value)
})

const filtersProjet=computed<IProject[]>(()=>{
   return filterProjet(tagsFilter.value,searchFilter.value)
})

const tagStack=computed<string[]>(()=>{
    return getTagStack(projets.value)
})

function searchNameProjet(value:string):void{
    nameProjet.value=value;
}
</script>

