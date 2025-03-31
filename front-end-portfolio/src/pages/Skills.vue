<template>
     <div class="ml-3">
        <div  v-if="succesMessage" class="my-5">
        <v-alert  color="success" icon="mdi-check-circle" width="fit-content">{{ succesMessage }}</v-alert>
    </div>
        <div class="mt-5">
            <p class="text-h6 text-primary">Mes Compétences</p>
        </div>
        <div class="mt-3" :class="smAndDown ? 'd-flex flex-column':'d-flex'">
            <v-btn :class="smAndDown ? 'mb-3':''" v-for="skills in skillstabs" class="mr-3" color="white" :active="skillsShow===skills" active-color="secondary"  :style="{ border: skillsShow !== skills ? '2px solid' : '' }"  @click="changeSkillsMode(skills as TSkillsShow)">{{ skills }}</v-btn>
        </div>
     </div>

<DialogUpdate  @success-message="succesMessage=$event" @error-message="errorMessage=$event" :skill="selectedSkills" :dialog-update="dialogUpdate" @update-dialog="dialogUpdate=$event" v-if="dialogUpdate" ></DialogUpdate>
<DialogDelete  @success-message="succesMessage=$event" @error-message="errorMessage=$event" :id-langage="idLangage" :dialog-delete="dialogDelete" :selected-language="selectedLangage" @delete-dialog="dialogDelete = $event" v-if="dialogDelete"></DialogDelete>
<DialogAdd  v-if="dialogAdd" @success-message="succesMessage=$event" @error-message="errorMessage=$event" :dialog-add="dialogAdd" @add-dialog="dialogAdd = $event"></DialogAdd>
<div v-if="skillsShow==='Développement Web'">
        <div class="ml-3">
        <div class="mt-5">
            <p class="text-h6 text-primary">Développement Front-end</p>
        </div>
        <SkillsCard @delete-skill="deleteSkill" :type-language="getSkillsByType('Front-end')" @update-skill="updateSkill"/>
        </div>
        <v-divider class="border-opacity-75 mt-12" color="primary"></v-divider>
      
        <div class="mt-5 ml-3">
        <p class="text-h6 text-primary">Développement Back-end</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard  @delete-skill="deleteSkill" @update-skill="updateSkill" :type-language="getSkillsByType('Back-end')"></SkillsCard>
    </div>
     </div>
    </div>
    <div class="mt-5" v-if="skillsShow==='Base de donnees'">
        <div class="ml-3">
        <p class="text-h6 text-primary">Base de données</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard   @delete-skill="deleteSkill" @update-skill="updateSkill" :type-language="getSkillsByType('Base de données')"></SkillsCard>
    </div>
    </div>
    <v-divider class="border-opacity-75 mt-12" color="primary"></v-divider>
    <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Modélisation</p>
        <div class="d-flex mb-5" style="width: fit-content;">
        <SkillsCard @delete-skill="deleteSkill" @update-skill="updateSkill" :type-language="getSkillsByType('Modelisation')"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Savoir être'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Soft Skills</p>
        <div class="d-flex mb-5" style="width: fit-content;">
            <SkillsCard  @delete-skill="deleteSkill" @update-skill="updateSkill" :type-language="getSkillsByType('Soft Skills')" :without-card="true"></SkillsCard>
    </div>
    </div>
    </div>
    <div v-if="skillsShow==='Langues'">
        <div class="ml-3 mt-5">
        <p class="text-h6 text-primary">Langues</p>
        <LanguageExperience @update-skill="updateSkill" @delete-skill="deleteSkill" :language-experience="getSkillsByType('Languages')"></LanguageExperience>
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
import type { ISkills, TSkillsShow } from '@/interfaces/interfaces'
import {  computed, onMounted, ref } from 'vue'
import SkillsCard from '@/components/SkillsCard.vue'
import LanguageExperience from '@/components/LanguageExperience.vue'
import { useDisplay } from 'vuetify'
import { useConnexionStore } from '@/store/connexion.store'
import DialogAdd from '@/components/DialogAdd.vue'
import DialogDelete from '@/components/DialogDelete.vue'
import DialogUpdate from '@/components/DialogUpdate.vue'
import { useSkillStore } from '@/store/skill.store'
import { storeToRefs } from 'pinia'

const {smAndDown}= useDisplay()
const connexionStore = useConnexionStore();
const skillsStore = useSkillStore();

const { skills } = storeToRefs(skillsStore); 
const { getSkills, addSkill,} = skillsStore;

const token = computed(() => connexionStore.token);

const dialogAdd=ref(false)
const dialogDelete=ref(false)
const dialogUpdate=ref(false)
const selectedLangage = ref("");
const idLangage=ref()
const selectedSkills=ref()
const errorMessage=ref<string>()
const succesMessage=ref<string>()

function deleteSkill(langage:string,id:number){
    selectedLangage.value=langage;
    idLangage.value=id
    dialogDelete.value=true;
}

function updateSkill(skill:ISkills){
    selectedSkills.value=skill
    dialogUpdate.value=true
}

function getSkillsByType(type:string):ISkills[]{
    return skills.value.filter((skills)=>skills.idType===type)
}

const skillsShow=ref<TSkillsShow>('Développement Web')
const skillstabs:TSkillsShow[]=['Développement Web','Base de donnees','Savoir être','Langues']

function changeSkillsMode(value:TSkillsShow):void{
skillsShow.value=value
}

onMounted(async()=>{
  await getSkills()
})

</script>