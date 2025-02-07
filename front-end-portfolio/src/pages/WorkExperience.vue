<template>
    <div class="mx-3 my-5">
        <p class="text-h6 text-black">Mes Expériences professionnelles</p>
        <div class="mt-7">
            <v-row>
                <v-col v-for="experience in workExperience" cols="12">
                    <div class="mb-3">
                    <p class="text-black text-body-2" style="font-style: italic;">{{ experience.period }}</p>
                </div>
                <v-card color="#39B8B1" hover >
                    <div class="d-flex">
                        <v-img :src="experience.entrepriseImg" style="border: 1px solid; border-radius: 5px; width: 70px;"></v-img>
                        <div class="d-flex flex-column justify-center ml-3">
                            <p class="mb-2 text-black font-weight-bold text-subtitle-1">{{ experience.name }}</p>
                            <p class="text-subtitle-1 text-black">{{ experience.entreprise }}</p>
                        </div>
                    </div>
                    <v-divider class="border-opacity-75" color="black"></v-divider>
                    <div class="ml-3 mt-2">
                        <p class="text-black text-subtitle-1" style="text-decoration: underline;">Taches Effectués : </p>
                        <ul>
                            <li v-for="description in experience.description" class="mb-2 ml-3">
                                <p v-html="description" class="text-black text-body-1"></p>
                            </li>
                        </ul>
                       </div>
                    <div class="ml-3 mt-2">
                        <p class="text-black text-subtitle-1" style="text-decoration: underline;">Stack Technique : </p>
                       
                        <div class="d-flex  my-2">
                           <div v-for="img in experience.stackImg" class="mr-4">
                                <v-img :src="img" style="width: 60px; height: 60px;"></v-img>
                           </div>
                        </div>
                   
                    </div>
                    <div class="d-flex flex-column align-center my-2">
                        <router-link :to="`workExperience/${experience.entreprise}`"><v-btn>En savoir plus ?</v-btn></router-link>
                    </div>
                 
                </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template> 
<script lang="ts" setup>
import type { IWorkExperience } from '@/interfaces/interfaces';
import VueImg from '../assets/Vue.png'
import TypeScript from '../assets/TypeScript.png'
import HTML from '../assets/HTML.png'
import CSS from '../assets/css.png'
import Javascript from '../assets/Javascript.png'
import Nest from '../assets/NestJS.svg'
import PostgreSql from '../assets/Postgresql.png'
import Carbonscore from '../assets/carbonscore.jpg'
import IUTParis from '../assets/iutParis.png'
import Python from '../assets/python.png'
import SkLearn from '../assets/sklearn.png'
import Pandas from '../assets/pandas.png'
import MathplotLib from '../assets/mathplotlib.png'
import C2RMF from '../assets/C2RMF.png'
import PHP from '../assets/php.png'
import FruityIce from '../assets/fruityIce.png'
import Wordpress from '../assets/wordpress.png'

const workExperience:IWorkExperience[]=[{
    period:'Octobre 2022 - Novembre 2024 (2 ans)',
    entreprise:'TechupClimate',
    name:'Apprenti Développeur Full Stack',
    description:[`<span class='font-weight-bold'>Développement Front-end :</span> Contribution à l’amélioration d’une
application web existante en concevant et implémentant de nouvelles
fonctionnalités avec Vue.js, TypeScript, Chart.js et CSS. Résolution de
bugs et amélioration des fonctionnalités existantes pour offrir une
meilleure expérience utilisateur`,`<span class='font-weight-bold'>Développement Back-end : </span>Participation à des cycles de
développement complets, partant d’une idée simple, en passant par la
conceptualisation de la base de données (MCD) jusqu’à l’implémentation
de nouvelles routes API REST en NestJS. Utilisation de PostgreSQL pour
la gestion des données et de l’ORM Prisma pour simplifier les requêtes.`,`<span class='font-weight-bold'>Tests Unitaires et Qualité de code : </span>Écriture de tests unitaires avec
Vitest et Jest pour chacune des fonctions créées afin de garantir la
robustesse du code. Mise en pratique des guidelines TypeScript de
Google, assurant ainsi une cohérence et une meilleure maintenabilité du
code.`],
    stackImg:[VueImg,TypeScript,HTML,CSS,Javascript,Nest,PostgreSql],
    entrepriseImg:Carbonscore
},
{
    period:'Mai 2022 - Juin 2022 (2 mois)',
    entreprise:'IUT Paris Cité',
    entrepriseImg:IUTParis,
    name:'Stagiaire Machine Learning',
    description:['Exploitation des données avec Python (Pandas,Matplotlib)',`Amélioration des performances de l'intelligence artificielle avec SKlearn`],
    stackImg:[Python,Pandas,SkLearn,MathplotLib]
},{
    period:'Janvier 2020 - Fevrier 2020 (2 mois)',
    entreprise:'Centre de Recherche et des Restauration des musées de France',
    entrepriseImg:C2RMF,
    name:'Stagiaire Développement Web',
    description:[`Débogage d'un intranet et mise en place de nouvelles
fonctionnalités en PHP`,'Modification de la base de données existante',`Rédaction d'une documentation technique`]
,stackImg:[PHP,Javascript,HTML,CSS]},
{
period:'Mai 2019 - Juin 2019 (2 mois)',
entreprise:'Fruity-Ice',
entrepriseImg:FruityIce,
name:'Stagiaire Développement Web',
description:[`Création d'un site vitrine sous Wordpress pour un restaurant.`,'Etude et mise en place du référencement du site web sous Wordpress'],
stackImg:[Wordpress,HTML,CSS,PHP]
}]

</script>
<style lang="css">
.v-responsive{
flex: none;
}
</style>