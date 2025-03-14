<template>
     <div class="ml-3">
        <div class="mt-5">
            <p class="text-h6 text-primary">Mes Compétences</p>
        </div>
        <div class="mt-3" :class="smAndDown ? 'd-flex flex-column':'d-flex'">
            <v-btn :class="smAndDown ? 'mb-3':''" v-for="skills in skillstabs" class="mr-3" color="white" :active="skillsShow===skills" active-color="secondary"  :style="{ border: skillsShow !== skills ? '2px solid' : '' }"  @click="changeSkillsMode(skills as TSkillsShow)">{{ skills }}</v-btn>
        </div>
     </div>
     <v-dialog v-if="dialogAdd" activator="parent" max-width="500">
        
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Ajouter une Compétence
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="dialogAdd = false"
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
          
            <div>
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
            <div>
                <div class="text-medium-emphasis mb-4">
                  Dernière utilisation
                </div>
                <v-date-input
      v-model="selectedDate"
      label="Sélectionnez une date"
      @change="selectedDate=$event"
    ></v-date-input>
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
                  @click="dialogAdd = false"
                ></v-btn>

                <v-btn
  class="text-none"
  color="primary"
  rounded="xl"
  text="Send"
  variant="flat"
  @click="
    console.log('Selected Year:', selectTypeSkills);
    addSkills(nameSkills!, yearsExperience!, selectedDate!, imageSkills!, selectTypeSkills!, token!)
  "
>
  Send
</v-btn>

              </v-card-actions>
            </v-card>
         
        </v-dialog>


     <div v-if="skillsShow==='Développement Web'">
        <div class="ml-3">
        <div class="mt-5">
            <p class="text-h6 text-primary">Développement Front-end</p>
        </div>
        <SkillsCard :type-language="frontLanguageExperience"/>
        </div>
        <v-divider class="border-opacity-75 mt-12" color="primary"></v-divider>
      
        <div class="mt-5 ml-3">
        <p class="text-h6 text-primary">Développement Back-end</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard :type-language="backLanguageExperience"></SkillsCard>
    </div>
     </div>
    </div>
    <div class="mt-5" v-if="skillsShow==='Base de donnees'">
        <div class="ml-3">
        <p class="text-h6 text-primary">Base de données</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard :type-language="bddLanguageExperience"></SkillsCard>
    </div>
    </div>
    <v-divider class="border-opacity-75 mt-12" color="primary"></v-divider>
    <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Modélisation</p>
        <div class="d-flex mb-5" style="width: fit-content;">
        <SkillsCard :type-language="modelisationExperience"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Savoir être'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Soft Skills</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard :type-language="softSkillsExperience" :without-card="true"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Langues'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Langues</p>
        <LanguageExperience :language-experience="languageExperience"></LanguageExperience>
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
import type { ISkillsExperience, ISkillsLanguage, TSkills, TSkillsLanguage, TSkillsShow } from '@/interfaces/interfaces'
import {  computed, ref } from 'vue'
import SkillsCard from '@/components/SkillsCard.vue'
import LanguageExperience from '@/components/LanguageExperience.vue'
import ButtonArrowTo from '@/components/ButtonArrowTo.vue'
import { useDisplay } from 'vuetify'
import { useConnexionStore } from '@/store/connexion.store'
import {addSkills} from '@/services/skills.service'

const {smAndDown}= useDisplay()
const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);

const dialogAdd=ref(false)
const nameSkills=ref<string>()
const selectTypeSkills=ref<TSkills>()
const imageSkills=ref<File>()
const yearsExperience=ref<number>()

const addSkill=ref<ISkillsExperience>()

const selectedDate = ref<Date>();
const selectedYear = ref<number>();

function extractYear(date: string):void {
  if (date) {
    selectedYear.value = new Date(date).getFullYear();
  } 
};

const skillsShow=ref<TSkillsShow>('Développement Web')

const skillstabs:TSkillsShow[]=['Développement Web','Base de donnees','Savoir être','Langues']

const skillsTypeList:TSkills[]=['Front-end','Back-end','Base de données','Languages','Modelisation','Soft Skills']

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