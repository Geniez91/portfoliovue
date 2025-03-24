<template>
     <div class="ml-3">
        <div class="mt-5">
            <p class="text-h6 text-primary">Mes Compétences</p>
        </div>
        <div class="mt-3" :class="smAndDown ? 'd-flex flex-column':'d-flex'">
            <v-btn :class="smAndDown ? 'mb-3':''" v-for="skills in skillstabs" class="mr-3" color="white" :active="skillsShow===skills" active-color="secondary"  :style="{ border: skillsShow !== skills ? '2px solid' : '' }"  @click="changeSkillsMode(skills as TSkillsShow)">{{ skills }}</v-btn>
        </div>
     </div>

<DialogUpdate :dialog-update="dialogUpdate" @update-dialog="dialogUpdate=$event" v-if="dialogUpdate" ></DialogUpdate>
<DialogDelete :dialog-delete="dialogDelete" @delete-dialog="dialogDelete = $event" v-if="dialogDelete"></DialogDelete>
<DialogAdd v-if="dialogAdd" :dialog-add="dialogAdd" @add-dialog="dialogAdd = $event"></DialogAdd>
     <div v-if="skillsShow==='Développement Web'">
        <div class="ml-3">
        <div class="mt-5">
            <p class="text-h6 text-primary">Développement Front-end</p>
        </div>
        <SkillsCard @delete-skill="deleteSkill" :type-language="frontLanguageExperience" @update-skill="dialogUpdate=true"/>
        </div>
        <v-divider class="border-opacity-75 mt-12" color="primary"></v-divider>
      
        <div class="mt-5 ml-3">
        <p class="text-h6 text-primary">Développement Back-end</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard  @delete-skill="deleteSkill" @update-skill="dialogUpdate=true" :type-language="backLanguageExperience"></SkillsCard>
    </div>
     </div>
    </div>
    <div class="mt-5" v-if="skillsShow==='Base de donnees'">
        <div class="ml-3">
        <p class="text-h6 text-primary">Base de données</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard   @delete-skill="deleteSkill" @update-skill="dialogUpdate=true" :type-language="bddLanguageExperience"></SkillsCard>
    </div>
    </div>
    <v-divider class="border-opacity-75 mt-12" color="primary"></v-divider>
    <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Modélisation</p>
        <div class="d-flex mb-5" style="width: fit-content;">
        <SkillsCard @delete-skill="deleteSkill" @update-skill="dialogUpdate=true" :type-language="modelisationExperience"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Savoir être'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Soft Skills</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard  @delete-skill="deleteSkill" @update-skill="dialogUpdate=true" :type-language="softSkillsExperience" :without-card="true"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Langues'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Langues</p>
        <LanguageExperience @update-skill="dialogUpdate=true" @delete-skill="deleteSkill" :language-experience="languageExperience"></LanguageExperience>
    </div>
    
</div>
<v-divider class="border-opacity-75" color="primary"></v-divider>

<div class="d-flex justify-center align-center my-4" style="height: 90px;" v-if="token" >
    <div class="d-flex align-center">
        <v-btn variant="text" @click="dialogAdd=true" class="text-white mx-3">
            <v-icon icon="mdi-plus" size="42"></v-icon>
            <p class="text-white">Ajouter une Compétence</p>
        </v-btn>
    </div>
</div>
        
   


</template>
<script lang="ts" setup>
import VueImg from '/assets/Vue.png'
import TypeScript from '/assets/TypeScript.png'
import HTML from '/assets/HTML.png'
import CSS from '/assets/css.png'
import Javascript from '/assets/Javascript.png'
import Angular from '/assets/Angular.png'
import PHP from '/assets/php.png'
import React from '/assets/React.png'
import NodeJs from '/assets/Node.js.png'
import Nest from '/assets/NestJS.svg'
import PostgreSql from '/assets/Postgresql.png'
import MySQL from '/assets/MySQL.png'
import OracleSql from '/assets/OracleSql.png'
import Bdd from '/assets/bdd.png'
import UML from '/assets/uml.png'
import Equipe from '/assets/equipe.png'
import Collaboration from '/assets/collaboration.png'
import Alecoute from '/assets/a lecoute.png'
import Serieux from '/assets/serieux.png'
import France from '/assets/france.png'
import Anglais from '/assets/anglais.jpg'
import type { ISkillsExperience, ISkillsLanguage, TSkillsShow } from '@/interfaces/interfaces'
import {  computed, ref } from 'vue'
import SkillsCard from '@/components/SkillsCard.vue'
import LanguageExperience from '@/components/LanguageExperience.vue'
import { useDisplay } from 'vuetify'
import { useConnexionStore } from '@/store/connexion.store'
import DialogAdd from '@/components/DialogAdd.vue'
import DialogDelete from '@/components/DialogDelete.vue'
import DialogUpdate from '@/components/DialogUpdate.vue'

const {smAndDown}= useDisplay()
const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);

const dialogAdd=ref(false)
const dialogDelete=ref(false)
const dialogUpdate=ref(false)
const selectedLangage = ref("");


function deleteSkill(langage:string){
    selectedLangage.value=langage;
    dialogDelete.value=true;
}

const skillsShow=ref<TSkillsShow>('Développement Web')

const skillstabs:TSkillsShow[]=['Développement Web','Base de donnees','Savoir être','Langues']

const frontLanguageExperience:ISkillsExperience[]=[{
    language:'VueJS',
    yearsExperience:2,
    usageExperience:2025,
    srcImg:VueImg
},
{
    language:'TypeScript',
    yearsExperience:2,
    usageExperience:2025,
    srcImg:TypeScript
},
{
    language:'HTML',
    yearsExperience:2,
    usageExperience:2025,
    srcImg:HTML
},
{
    language:'CSS',
    yearsExperience:2,
    usageExperience:2025,
    srcImg:CSS
},
{
    language:'Javascript',
    yearsExperience:2,
    usageExperience:2025,
    srcImg:Javascript
},
{
    language:'Angular',
    yearsExperience:0,
    usageExperience:2024,
    srcImg:Angular
},
{
    language:'PHP',
    yearsExperience:0,
    usageExperience:2022,
    srcImg:PHP
},
{
    language:'React',
    yearsExperience:0,
    usageExperience:2022,
    srcImg:React
}
]

const backLanguageExperience:ISkillsExperience[]=[
{
    language:'Nest',
    yearsExperience:2,
    usageExperience:2024,
    srcImg:Nest
},{
    language:'Node.Js',
    yearsExperience:2,
    usageExperience:2024,
    srcImg:NodeJs
},
]

const bddLanguageExperience:ISkillsExperience[]=[
{
    language:'PostgreSQL',
    yearsExperience:2,
    usageExperience:2024,
    srcImg:PostgreSql
},{
    language:'Mysql',
    yearsExperience:0,
    usageExperience:2022,
    srcImg:MySQL
},
{
    language:'OracleSQL',
    yearsExperience:0,
    usageExperience:2022,
    srcImg:OracleSql
},
]

const modelisationExperience:ISkillsExperience[]=[
    {
        language:'Modelisation Base de données (MCD/MLD)',
        yearsExperience:2,
        usageExperience:2024,
        srcImg:Bdd
    },
    {
        language:'UML',
        yearsExperience:0,
        usageExperience:2022,
        srcImg:UML
    },
]

const softSkillsExperience:ISkillsExperience[]=[
    {
        language:'Travail en équipe',
        srcImg:Equipe
    },
    {
        language:'Collaboratif',
        srcImg:Collaboration
    },
    {
        language:'A l\'écoute',
        srcImg:Alecoute
    },
    {
        language:'Sérieux',
        srcImg:Serieux
    },
]

const languageExperience:ISkillsLanguage[]=[
 {
    language:'Français',
    level:'Langue Maternelle',
    srcImg:France
 },
 {
    language:'Anglais',
    level:'Intermédiaire',
    srcImg:Anglais,
    TOIEC:805
 }
]

function changeSkillsMode(value:TSkillsShow):void{
skillsShow.value=value
}

</script>