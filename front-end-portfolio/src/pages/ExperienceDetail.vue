<template>
    <v-breadcrumbs divider=">" bg-color="info" class="text-black" :items="Breadcrumbs"></v-breadcrumbs>
  <div class="m-0">
    <v-card class="text-primary pb-10" color="secondary"height="fit-content">
        <vue-markdown-render class='ma-7':source="markdownContent" :options="{ html: true }"></vue-markdown-render>
    </v-card>

  </div>
    <div>
       
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import VueMarkdownRender from 'vue-markdown-render';
import { useRoute } from 'vue-router';
import type { IWorkExperience2 } from '@/interfaces/interfaces';
import { getAllWorkExperience } from '@/services/workExperience.service';


const route = useRoute();

const Breadcrumbs = ref([
  {
    title: 'Accueil',
    disabled: false,
    href: '/',
  },
  {
    title: 'Expériences professionnelles',
    disabled: false,
    href: '/workExperience',
  },
  {
    title:  typeof route.params.name === 'string' ? route.params.name : '',
    disabled: false,
    href: '',
  },
]);

const markdownContent = ref('');
const workExperiences = ref<IWorkExperience2[]>([]);
const currentWorkExperience=ref<IWorkExperience2>()
currentWorkExperience.value?.nameCompany

function findWorkExperience(){
  return workExperiences.value.find(
    (exp) => exp.nameCompany === route.params.name
  );
}

onMounted(async () => {
  workExperiences.value  = await getAllWorkExperience();
  currentWorkExperience.value = findWorkExperience()
  markdownContent.value = currentWorkExperience.value?.content!
  
});
</script>

<style lang="css">
.chip{
  border: 1px solid;
  border-radius: 20px;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
  background-color:lightgray;
  width:fit-content
}

.col4{
  flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
}

.row{
  display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
}

.bigImgDetail{
  max-width: 800px;
  width: 100%;
  height: auto;
}

.flexChip{
  display: flex;
}

@media (max-width: 768px) {
  .col4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .flexChip {
   display: flex;
   flex-direction: column;
   padding-bottom: 10px;
  }
}

</style>