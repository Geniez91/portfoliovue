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
                            {{ expériences.usageExperience }}
                        </p>
                    </div>      
                </v-card>
            </div>

            </v-col>
        </v-row>
</template>

<script lang="ts" setup>
import type { ISkillsExperience, ISkillsLanguage, TSkillsShow } from '@/interfaces/interfaces'
import { useDisplay } from 'vuetify';

const {smAndDown}=useDisplay()
const props = defineProps<{
  typeLanguage: ISkillsExperience[];
  withoutCard?:boolean
}>();

</script>