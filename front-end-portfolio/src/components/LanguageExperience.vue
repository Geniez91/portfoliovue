<template>
            <div class="mb-3" :class="smAndDown ? 'd-flex flex-column':'d-flex'">
            <div v-for="(expériences) in languageExperience" class="mt-4 mx-2">
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
                <div class="d-flex flex-column justify-space-evenly mx-2" v-if="token">
                <v-btn color="warning" class="mb-4" @click="emit('update-skill',expériences)">
                    <v-icon icon="mdi-pencil"></v-icon>
                </v-btn>
                <v-btn color="red" @click="emit('delete-skill',expériences.language,expériences.id)">
                    <v-icon icon="mdi-delete"></v-icon>
                </v-btn>
            </div>
            </div>
            </div>
        </div>
        </div>
</template>

<script lang="ts" setup>
import type { ISkills, ISkillsExperience, ISkillsLanguage, TSkillsShow } from '@/interfaces/interfaces'
import { useConnexionStore } from '@/store/connexion.store';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const {smAndDown}=useDisplay()
const connexionStore = useConnexionStore();
const token = computed(() => connexionStore.token);

const emit = defineEmits<{
  (event: 'delete-skill', language: string,id:number): string;
  (event:'update-skill',skill:ISkills):void
}>();

const props = defineProps<{
languageExperience: ISkills[];
}>();

</script>