<template>

    <div class="d-flex flex-column align-center">
      <div class="mt-5 ml-3">
          <p class="text-h6 text-primary">Mise à jour de votre mot de passe : </p>
      </div>

      <hr 
class="my-6"
:style="{ borderColor: 'var(--v-theme-primary)' }"
:width="smAndDown ? '300px' : '500px'"
>

      <v-form cla :style="smAndDown? 'width:300px;':'width:500px;'" @submit.prevent v-model="isFormValid" >
          <v-card color="card" class="pa-5">
          <div>
              <p class="text-primary text-body-1 font-weight-bold mb-5">Adresse mail : </p>
              <v-text-field prepend-inner-icon="mdi-gmail" :rules="[emailRules,emptyRules]"  v-model="email"  @update:model-value="email=$event"></v-text-field>
          </div>
          <div class="d-flex flex-column align-center">
              <v-btn type="submit" :disabled="!isFormValid" @Click="login(email,password)">Valider</v-btn>
          </div>
          </v-card>
      </v-form>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import {emailRules} from '../services/contact.service'
import {emptyRules} from '../services/utils'
import { ref } from 'vue';
import { useConnexionStore } from '@/store/connexion.store';
const {smAndDown}=useDisplay()

const password=ref('');
const email=ref('');
const isFormValid=ref(false);

const {login,token,errorMessage}=useConnexionStore()
</script>