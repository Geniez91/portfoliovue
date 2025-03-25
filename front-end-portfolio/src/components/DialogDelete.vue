<template>
     <v-dialog v-if="dialogDelete" activator="parent" max-width="500">
        
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
              Supprimer une Compétence
            </div>

            <v-btn
              icon="mdi-close"
              variant="text"
              @click="emit('delete-dialog', false);"
            ></v-btn>
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-card-text>
          <div>
            <p>Etes-vous sur de vouloir supprimer la compétence {{ props.selectedLanguage }} de votre portfolio ?</p>
          </div>
          </v-card-text>

          <v-divider class="mt-2"></v-divider>

          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="Cancel"
              @click="emit('delete-dialog', false);"
            ></v-btn>

            <v-btn
class="text-none"
color="primary"
rounded="xl"
text="Send"
variant="flat"
@click="deleteSkillsEvent
"
>
Send
</v-btn>

          </v-card-actions>
        </v-card>
     
    </v-dialog>
</template>

<script lang="ts" setup>
import { useConnexionStore } from '@/store/connexion.store';
import { useSkillStore } from '@/store/skill.store';
import { computed, ref } from 'vue';

const props = defineProps<{
    dialogDelete: boolean;
    selectedLanguage:string;
    idLangage:number;
}>();

const emit=defineEmits(['delete-dialog'])

const skillsStore = useSkillStore();
const connexionStore = useConnexionStore();
const {  deleteSkillById } = skillsStore;
const token = computed(() => connexionStore.token);

function deleteSkillsEvent(){
  deleteSkillById(props.idLangage,token.value!)
  emit('delete-dialog', false);
}
</script>