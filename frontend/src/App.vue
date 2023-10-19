<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" class="whi">
      <v-app-bar-title>Web Scrape X</v-app-bar-title>
      <v-btn><RouterLink to="/">Sites</RouterLink></v-btn>
      <v-btn> <RouterLink to="/website/new">Add site</RouterLink></v-btn>
      <v-btn>Logout</v-btn>
    </v-app-bar>
    
    <v-main>
      <RouterView />
    </v-main>
    
  </v-app>
</template>

<style scoped></style>
