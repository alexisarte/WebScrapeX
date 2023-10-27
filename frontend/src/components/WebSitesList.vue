<script setup>
  import { ref, onBeforeMount } from 'vue';
  import WebSiteService from '../services/WebSiteService.js';

  const websites = ref([]);

  const setWebsites = async () => {
    const result = await WebSiteService.getWebSites()
    websites.value = result;
  }

  const deleteWebSite = (id) => WebSiteService.deleteWebSite(id).then(() => {
    websites.value = websites.value.filter(w => w.id !== id);
  });

  onBeforeMount(setWebsites);

</script>

<template>
  <v-container>
    <!-- <v-sheet> -->
      <h1>Registered websites</h1>
      <v-list lines="one">
        <v-list-item
          v-for="w in websites"
          :key="w.id"
          :title="w.name"
          :subtitle="w.url"
        >
        <v-btn><RouterLink :to="{name:'detail', params:{id:w.id}}">Edit</RouterLink></v-btn>
        <v-btn @click="deleteWebSite(w.id)">Delete</v-btn>
        </v-list-item>
      </v-list>
    <!-- </v-sheet> -->
  </v-container>
</template>

<style>

</style>
