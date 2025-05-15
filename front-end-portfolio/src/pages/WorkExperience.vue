<template>
    <div class="mx-3 my-5">
        <p class="text-h6 text-primary">Mes Expériences professionnelles</p>
        <div  v-if="workExperienceStore.successMessage" class="my-5">
        <v-alert  color="success" icon="mdi-check-circle" width="fit-content">{{ workExperienceStore.successMessage }}</v-alert>
    </div>
        <div class="mt-7">
            <v-row style="width: fit-content;">
                <v-col v-for="experience in workExperiences" cols="12" :key="experience.id">
                    
                    <div class="mb-3">
                        
                    <p class="text-primary text-body-2" style="font-style: italic;">{{ formatDateToMonthYear(experience.startDate) }} - {{ formatDateToMonthYear(experience.endDate) }} {{ calculateDifferenceBetweenTwoDates(experience.startDate,experience.endDate) }}</p>
                </div>
                 <v-skeleton-loader color="grey" type="card" v-if="isLoaded==false"></v-skeleton-loader>
                                 <!-- <v-card color="secondary" hover :to="`workExperience/${experience.nameCompany}`" v-else>
                    <div class="d-flex">
                        <v-img :src="experience.srcImg as string" :alt="`${experience.nameCompany} logo`" style="border: 1px solid; border-radius: 5px; width: 70px;"></v-img>
                        <div class="d-flex flex-column justify-center ml-3">
                            <p class="mb-2 text-primary font-weight-bold text-subtitle-1">{{ experience.job }}</p>
                            <p class="text-subtitle-1 text-primary">{{ experience.nameCompany }}</p>
                        </div>
                    </div>
                    <v-divider class="border-opacity-75" color="primary"></v-divider>
                    <div class="ml-3 mt-2">
                        <p class="text-primary text-subtitle-1" style="text-decoration: underline;">Taches Effectués : </p>
                        <ul>
                            <li class="mx-4 mb-2 text-primary" v-for="(experiences) in experience.tasks">
                                {{ experiences }}
                            </li>
                        </ul>
                   
                       </div>
                    <div class="ml-3 mt-2">
                        <p class="text-primary text-subtitle-1" style="text-decoration: underline;">Stack Technique : </p>
                       
                        <v-row class="my-3">
                            <v-col md="1" sm="3" v-for="img in experience.stack">
                                <v-img :src="img.img" :alt="`${img} logo`" style="width: 60px; height: 60px;"></v-img>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="d-flex flex-column align-center my-2">
                        <router-link :to="`workExperience/${experience.nameCompany}`"><v-btn color="navbar">En savoir plus ?</v-btn></router-link>
                    </div>
                 
                </v-card> -->

                <div class="d-flex flex-column justify-space-evenly" v-if="token">
                <v-btn color="warning" :to="`editWorkExperience/${experience.id}`">
                    <v-icon icon="mdi-pencil"></v-icon>
                </v-btn>
                <v-btn color="red" @click="workExperienceStore.deleteWorkExperiences(experience.id!,token)">
                    <v-icon icon="mdi-delete" ></v-icon>
                </v-btn>
            </div>
                </v-col>
                
            </v-row>
            <div class="d-flex justify-center align-center my-4" style="height: 90px;" v-if="token" >
    <div class="d-flex align-center">
        <v-btn variant="text" to="addWorkExperience" class="text-white mx-3">
            <v-icon icon="mdi-plus" size="42"></v-icon>
            <p class="text-white">Ajouter une Expérience Profesionelle</p>
        </v-btn>
    </div>
</div>
        
        </div>
    </div>
</template> 
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useConnexionStore } from '@/store/connexion.store';
import {formatDateToMonthYear,calculateDifferenceBetweenTwoDates} from '@/services/utils'
import { useWorkExperienceStore } from '@/store/workExperience.store';

const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);
const workExperienceStore= useWorkExperienceStore()
const workExperiences = computed(() => workExperienceStore.workExperiences);
const isLoaded=computed(()=>workExperienceStore.isLoaded)

onMounted(async () => {
 await workExperienceStore.getAllWorkExperiences();
});
</script>
<style lang="css">
.v-responsive{
flex: none;
}
</style>