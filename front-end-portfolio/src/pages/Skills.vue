<template>
     <div class="ml-3">
        <div class="mt-5">
            <p class="text-h6 text-black">Mes Compétences</p>
        </div>
        <div class="mt-3" :class="smAndDown ? 'd-flex flex-column':'d-flex'">
            <v-btn :class="smAndDown ? 'mb-3':''" v-for="skills in skillstabs" class="mr-3" color="white" :active="skillsShow===skills" active-color="#39B8B1"  :style="{ border: skillsShow !== skills ? '2px solid' : '' }"  @click="changeSkillsMode(skills as TSkillsShow)">{{ skills }}</v-btn>
        </div>
     </div>
     <div v-if="skillsShow==='Développement Web'">
        <div class="ml-3">
        <div class="mt-5">
            <p class="text-h6 text-black">Développement Front-end</p>
        </div>
        <SkillsCard :type-language="frontLanguageExperience"/>
        </div>
        <v-divider class="border-opacity-75 mt-12" color="black"></v-divider>
      
        <div class="mt-5 ml-3">
        <p class="text-h6 text-black">Développement Back-end</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard :type-language="backLanguageExperience"></SkillsCard>
    </div>
     </div>
    </div>
    <div class="mt-5" v-if="skillsShow==='Base de donnees'">
        <div class="ml-3">
        <p class="text-h6 text-black">Base de données</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard :type-language="bddLanguageExperience"></SkillsCard>
    </div>
    </div>
    <v-divider class="border-opacity-75 mt-12" color="black"></v-divider>
    <div class="ml-3 mt-5">
        <p class="text-h6 text-black">Modélisation</p>
        <div class="d-flex mb-5" style="width: fit-content;">
        <SkillsCard :type-language="modelisationExperience"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Savoir être'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-black">Soft Skills</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard :type-language="softSkillsExperience" :without-card="true"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Langues'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-black">Langues</p>
        <LanguageExperience :language-experience="languageExperience"></LanguageExperience>
    </div>
</div>
        
   


</template>
<script lang="ts" setup>
import VueImg from '../assets/Vue.png'
import TypeScript from '../assets/TypeScript.png'
import HTML from '../assets/HTML.png'
import CSS from '../assets/css.png'
import Javascript from '../assets/Javascript.png'
import Angular from '../assets/Angular.png'
import PHP from '../assets/php.png'
import React from '../assets/React.png'
import NodeJs from '../assets/Node.js.png'
import Nest from '../assets/NestJS.svg'
import PostgreSql from '../assets/Postgresql.png'
import MySQL from '../assets/MySQL.png'
import OracleSql from '../assets/OracleSql.png'
import Bdd from '../assets/bdd.png'
import UML from '../assets/uml.png'
import Equipe from '../assets/equipe.png'
import Collaboration from '../assets/collaboration.png'
import Alecoute from '../assets/a lecoute.png'
import Serieux from '../assets/serieux.png'
import France from '../assets/france.png'
import Anglais from '../assets/anglais.jpg'
import type { ISkillsExperience, ISkillsLanguage, TSkillsShow } from '@/interfaces/interfaces'
import {  ref } from 'vue'
import SkillsCard from '@/components/SkillsCard.vue'
import LanguageExperience from '@/components/LanguageExperience.vue'
import ButtonArrowTo from '@/components/ButtonArrowTo.vue'
import { useDisplay } from 'vuetify'

const {smAndDown}= useDisplay()

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