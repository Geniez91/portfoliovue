

<template>
    <div class="d-flex flex-column align-center mt-16">
        <CircleImage :height="250" :width="250" :img-src="ProgrammingImage"/>
    </div>
    <div class="d-flex flex-column align-center mt-6">
        <WelcomePresentation></WelcomePresentation>
  </div>
  <v-row class="mt-16 ml-8">
    <WelcomeDescription class=""></WelcomeDescription>
  </v-row>
  <div class="d-flex flex-column align-center mt-16">
    <WelcomeLinks class="text-slide-in"></WelcomeLinks>
  </div>
  <div class="d-flex flex-column align-center mt-16">
    <ButtonArrowTo class="text-slide-in" :tooltip="'Mes Compétences'" to="/skills"></ButtonArrowTo>
  </div>
  
</template>

<script setup lang="ts">
import ProgrammingImage from '/assets/programming.png';
import ButtonArrowTo from '@/components/ButtonArrowTo.vue';
import CircleImage from '@/components/CircleImage.vue';
import WelcomeDescription from '@/components/WelcomeDescription.vue';
import WelcomeLinks from '@/components/WelcomeLinks.vue';
import WelcomePresentation from '@/components/WelcomePresentation.vue';
</script>

<style lang="css">
.text-write{
  border-right: 4px solid #333333;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  animation: 
    typing 3s steps(47, end) forwards,
    cursor .10s step-end  alternate;
  /* text-wrap: auto; */
}

.text-slide-in {
  display: inline-block;
  opacity: 0;
  animation: slideInFromLeft 1s ease-out forwards;
  animation-delay: 4s; 
}

@keyframes cursor{
  50% {border-color: transparent;}
}

@keyframes typing{
  from{width: 0;}
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
