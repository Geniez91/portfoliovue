<template>
  <v-app>
    <v-main>
      <NavBar></NavBar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import '@toast-ui/editor/dist/toastui-editor.css';
import NavBar from './components/NavBar.vue';

</script>

<style lang="css" scoped>
.v-application{
  background: linear-gradient( #F5F5F5, #0E67ED);;
}

.v-application.v-theme--light {
  background: linear-gradient(#F5F5F5, #0E67ED);
}

.v-application.v-theme--dark {
  background: linear-gradient( #121212, #1E1E1E);
}

  
</style>