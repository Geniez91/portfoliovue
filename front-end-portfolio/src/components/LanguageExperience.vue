<template>
            <div class="mb-3" :class="smAndDown ? 'd-flex flex-column':'d-flex'">
            <div v-for="(expériences) in languageExperience" class="mt-4">
                <div class="d-flex">
                <div class="d-flex flex-column align-center mr-8">
                <v-img :src="expériences.srcImg" :width="130" :height="100" :alt="`${expériences.language} logo`"></v-img>
                    <p class="text-body-1 text-primary font-weight-bold">{{ expériences.language }}</p>
                </div>
                <div class="d-flex align-center">
                <v-card color="card" class="mr-9 pa-2" style="border: 2px solid;" >
                    <div class="d-flex align-center">
                        <v-icon icon="mdi-briefcase" color="black" size="38" class="mr-2"></v-icon>
                        <p class="font-weight-bold text-body-1">Niveau : {{ expériences.level }} <span v-if="expériences.TOIEC">(TOIEC : {{ expériences.TOIEC }})</span></p>
                    </div>
          
                </v-card>
            </div>
            </div>
        </div>
        </div>
</template>

<script lang="ts" setup>
import type { ISkills, ISkillsExperience, ISkillsLanguage, TSkillsShow } from '@/interfaces/interfaces'
import { useDisplay } from 'vuetify';

const {smAndDown}=useDisplay()

const props = defineProps<{
languageExperience: ISkills[];
}>();

</script>