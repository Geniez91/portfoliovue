<template>
    <div class="d-flex flex-column align-center mt-16">
        <div class="cardWelcome">
            <v-img :width="250" src="../assets//programming.png" class="circle-image"/>
        </div>
       <div>
       </div>
    </div>
    <div class="d-flex flex-column align-center mt-6">
    <div class="container">
      <p class="text-write text-h5 text-black font-weight-bold">
        Bonjour à tous et Bienvenue sur mon portfolio ! 
      </p>
  
    </div>

    <p class="text-h5 text-black font-weight-bold">
       Je m'appelle Jérémy Weltmann et je suis Développeur Web Full Stack.
      </p>

    
  </div>
  <v-row class="mt-16 ml-8">
    <v-col class="col-6">
      <div class="d-flex flex-column align-center">
      <v-icon icon="mdi-briefcase" color="black" size="150"></v-icon>
      <p class="text-black text-h6">2 ans d'expériences en tant qu’apprenti Développeur Full Stack au sein de CarbonScore</p>
    </div>
    </v-col>
    <v-divider class="border-opacity-75 mx-5" vertical color="black"></v-divider>
    <v-col class="col-6">
      <div class="d-flex flex-column align-center">
      <v-icon icon="mdi-school" color="black" size="150" @click=""></v-icon>
      <p class="text-black text-h6">Diplomé d’un mastère dev manager full Stack (RNCP 7) à l’ecole EFREI.</p>
    </div>
    </v-col>
  </v-row>
  <div class="d-flex flex-column align-center mt-16">
    <div class="d-flex">
      <a href="https://github.com/Geniez91?tab=repositories" class="cardLinks mr-12">
        <v-img src="../assets/github.jpg" alt="GitHub" />
      </a>
        <a href="https://www.linkedin.com/in/jeremy-weltmann/" class="cardLinks">
            <v-img  src="../assets//linkedin.png" alt="Mon LinkedIn" />
          </a>
      </div>
  </div>
  <div class="d-flex flex-column align-center mt-16">
    <v-btn v-tooltip:bottom="'Mes Compétences'" variant="text" icon="mdi-arrow-down" size="32"/>

  </div>
  
</template>

<style lang="css">

.container{
  display: inline-block;
}
.cardWelcome {
  height: 250px;
  width: 250px;
  border: 1px solid;
  border-radius: 50%; 
  background-color: white;
  box-shadow: 0 4px 4px 0 rgba(253, 167, 167, 0.25); 
  overflow: hidden; 
  display: flex;
  justify-content: center; 
  align-items: center;
}

.cardLinks {
  height: 60px;
  width: 60px;
  border-radius: 50%; 
  overflow: hidden; 
}

.circle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-write{
  border-right: 4px solid #333333;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  animation: 
    typing 4s steps(47),
    cursor .10s step-end  alternate;
}

@keyframes cursor{
  50% {border-color: transparent;}
}

@keyframes typing{
  from{width: 0;}
}
</style>