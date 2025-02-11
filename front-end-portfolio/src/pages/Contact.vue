<template>
    <div class="d-flex flex-column align-center">
        <div class="mt-5 ml-3">
            <p class="text-h6 text-primary">Contact</p>
        </div>
        <hr 
  class="my-6"
  :style="{ borderColor: 'var(--v-theme-primary)' }"
  :width="smAndDown ? '300px' : '500px'"
>
        <v-alert v-if="alertSuccess" prominent color="success" icon="mdi-check-circle" width="500px" class="mb-6">Votre message a bien été transmis par mail ! Je vous recontacterais par la suite.</v-alert>
        <v-form  :style="smAndDown? 'width:300px;':'width:500px;'" @submit.prevent v-model="isFormValid">
            <v-card color="card" class="pa-5">
                <div >
                <p class="text-primary text-body-1 font-weight-bold mb-5">Nom : </p>
                <v-text-field v-model="name" :rules="[emptyRules]" @update:model-value="name=$event" ></v-text-field>
            </div>
            <div>
                <p class="text-primary text-body-1 font-weight-bold mb-5">Mail : </p>
                <v-text-field prepend-inner-icon="mdi-gmail" :rules="[emailRules,emptyRules]"  v-model="email"  @update:model-value="email=$event"></v-text-field>
            </div>
            <div>
                <p class="text-primary text-body-1 font-weight-bold mb-5">Objet : </p>
                <v-text-field :rules="[subjectRules,emptyRules]" v-model="subject"  @update:model-value="subject=$event" :counter="maxCharacterSubjet" :persistent-counter="true"></v-text-field>
            </div>
            <div>
                <p class="text-primary text-body-1 font-weight-bold mb-5">Message : </p>
                <v-textarea v-model="message" label="Label" :rules="[emptyRules]" @update:model-value="message=$event"></v-textarea>
            </div>
            <div class="d-flex flex-column align-center">
                <v-btn type="submit" :disabled="!isFormValid" @Click="sendEmail()">Valider</v-btn>
            </div>
            </v-card>
        </v-form>
        <hr 
  class="my-6"
  :style="{ borderColor: 'var(--v-theme-primary)' }"
  :width="smAndDown ? '300px' : '500px'"
>
       <WelcomeLinks class="mb-9"></WelcomeLinks>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WelcomeLinks from '@/components/WelcomeLinks.vue';
import type { IEmailSend } from '@/interfaces/interfaces';
import emailjs from '@emailjs/browser';
import {emailRules,emptyRules} from '../services/contact.service'
import { useDisplay } from 'vuetify';

const {smAndDown}= useDisplay()

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


const name=ref('');
const email=ref('');
const subject=ref('');
const message=ref('');
const maxCharacterSubjet=ref(75)
const isFormValid=ref(false);
const alertSuccess=ref(false)


function subjectRules(value:string):any{
    if(value.length<=maxCharacterSubjet.value) return true
    return `L'objet d'un mail ne peux pas dépasser plus de 75 caractère`
}

async function sendEmail():Promise<void>{
    const emailObject={
        email:email.value,
        message:message.value,
        name:name.value,
        subject:subject.value
    }
    
    try {
        await emailjs.send(serviceId,templateId,emailObject,publicKey)
        alertSuccess.value=true;
        console.log("Envoie Réussi")
    }
    catch(error){
        console.log('Error :' + error)
        throw error;
    }
}

</script>