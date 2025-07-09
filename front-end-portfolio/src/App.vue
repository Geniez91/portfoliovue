<template>
  <v-app>
    <v-main>
      <NavBar></NavBar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import '@toast-ui/editor/dist/toastui-editor.css'
import NavBar from './components/NavBar.vue'
</script>

<style lang="css" scoped>
.v-application {
  background: linear-gradient(#f5f5f5, #0e67ed);
}

.v-application.v-theme--light {
  background: linear-gradient(#f5f5f5, #0e67ed);
}

.v-application.v-theme--dark {
  background: linear-gradient(#121212, #1e1e1e);
}
</style>
