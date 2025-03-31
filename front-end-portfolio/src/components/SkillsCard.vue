<template>
            <v-row class="mt-1">
            <v-col v-for="(expériences) in typeLanguage">
                <div class="d-flex" :class="smAndDown ?'d-flex flex-column mb-2':'d-flex'">
                <div class="d-flex flex-column align-center mr-8" >
                <v-img :src="expériences.srcImg" :width="150" :height="100" :alt="`${expériences.language} logo`"></v-img>
                    <p class="text-body-1 text-primary font-weight-bold text-center">{{ expériences.language }}</p>
                </div>
                <v-card color="card" class="mr-9 pa-2" style="border: 2px solid;" v-if="withoutCard===false" >
                    <div class="d-flex align-center">
                        <v-icon icon="mdi-briefcase" color="black" size="38" class="mr-2"></v-icon>
                        <p class="font-weight-bold text-body-1">{{ expériences.yearsExperience }} ans d'expériences</p>
                    </div>
                    <div class="d-flex mt-3 align-center">
                        <v-icon icon="mdi-code-tags" color="green" size="38" class="mr-2"></v-icon>
                        <p class="font-weight-bold text-body-1">Dernière utilisation : 
                            {{ getDaysofDate(expériences.usageExperience!) }}
                        </p>
                    </div>      
                </v-card>
                <div class="d-flex flex-column justify-space-evenly" v-if="token">
                <v-btn color="warning" @click="emit('update-skill',expériences)">
                    <v-icon icon="mdi-pencil"></v-icon>
                </v-btn>
                <v-btn color="red" @click="emit('delete-skill',expériences.language,expériences.id)">
                    <v-icon icon="mdi-delete"></v-icon>
                </v-btn>
            </div>
            </div>

            </v-col>
        </v-row>
</template>

<script lang="ts" setup>
import type { ISkills } from '@/interfaces/interfaces'
import { getDaysofDate } from '@/services/utils';
import { useConnexionStore } from '@/store/connexion.store';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);

const emit = defineEmits<{
  (event: 'delete-skill', language: string,id:number): string;
  (event:'update-skill',skill:ISkills):void
}>();


const {smAndDown}=useDisplay()
const props = defineProps<{
  typeLanguage: ISkills[];
  withoutCard?:boolean
}>();

</script>