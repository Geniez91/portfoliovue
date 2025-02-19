<template>
        <div class="d-flex flex-column align-start mt-3" style="position: relative;">
      <div v-for="(formation, index) in formations" :key="index" class="timeline-item">
        <div class="circle"></div>
        <div class="line" v-if="index < formations.length - 1"></div>
        <div class="content text-primary">
          <p class="text-subtitle-1 font-weight-bold">{{ formation.year }}</p>
          <p class="text-subtitle-1 font-weight-medium">{{ formation.title }}</p>
          <p class="text-subtitle-1 " style="text-decoration: underline;">{{ formation.name }}</p>
         <div class="d-flex">
            <v-btn prepend-icon="mdi-earth" variant="text" class="text-subtitle-1 font-weight-medium pa-0" :href="formation.website">Site web</v-btn>
        </div>
          <p style="max-width: 500px;" v-if="formation.description" class="text-body-1" >{{ formation.description }}</p>
          <v-img class="mt-3" :alt="`${formation.name} logo`" :src="formation.logo" :width="80"></v-img>
     
        </div>

      </div>
      </div>
</template>

<script setup lang="ts">
import Efrei from '/assets/efrei.jpg'
import IUTParis from '/assets/iutParis.png'
import LyceeParcVilgenis from '/assets/lyceeparcvilgenis.png'
import LyceeJulesVerne from '/assets/julesverne.jpeg'
import type { IAcademic } from '@/interfaces/interfaces';

const formations:IAcademic[] = [
  {
    year: "2022-2024",
    title: "Mastère Dev Manager Full Stack (RNCP 7)",
    description: "Le Mastère Dev Manager Full Stack forme des développeurs de haut niveau aux compétences multiples maitrisant les technologies back End et front End, capables d’encadrer des équipes de développements et d’accompagner les équipes lors des différentes étapes de la création d’un logiciel",
    logo: Efrei, 
    name:'Efrei',
    website:'https://www.efrei.fr/programmes-experts/mastere-developpeur-full-stack/'
  },
  {
    year: "2021-2022",
    title: "Licence Professionnelle : Conception Développement et test de logiciels",
    logo: IUTParis, 
    name:'IUT Paris Cité (16ème arrondissement)',
    description:'Le parcours Génie logiciel, système d’information et ERP offre aux étudiant(e)s les compétences nécessaires à la conception et au développement de systèmes d’information.',
    website:'https://iutparis-seine.u-paris.fr/informatique/licence-professionnelle-metiers-de-linformatique-conception-developpement-et-tests-de-logiciels/'
  },
  {
    year: "2018-2020",
    title: "BTS SIO option SLAM",
    logo: LyceeParcVilgenis,
    name:'Lycée Parc de Vilgenis',
    description:`L'étudiant participe à la conception, au développement, ainsi qu'au déploiement et à la maintenance des composants logiciels d'une solution applicative (Web, mobile, client…). Il ou elle acquiert ainsi des compétences en conception et développement d'une solution applicative, en maintenance de celle-ci, mais aussi en bases de données, en gestion des données numériques et en gestion de version (git/forme logicielle).`,
    website:'https://www.lyceevilgenis.fr/index.php'
  },
  {
    year: "2017-2018",
    title: "Bac STMG option SIG",
    logo: LyceeJulesVerne,
    name:'Lycée Jules Verne',
    website:'https://lyc-verne-limours.ac-versailles.fr/'
  },
];
</script>

<style scoped>
.circle {
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border: 2px solid #000;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.timeline-item {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  min-height: 50px;
}

.line {
  width: 2px;
  height: 650px;
  background-color: #000;
  position: absolute;
  left: 18px;
  z-index: 0;
}

.content {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  gap: 4px;
  margin-bottom: 30px;
}

</style>
