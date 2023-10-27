<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import WebSiteService from '../services/WebSiteService.js';

  const route = useRoute();
  
  const website = ref({});
  const error = ref(false);
  const success = ref(false);

  const setWebsite = async () => {
    const result = await WebSiteService.getWebSite(route.params.id);
    website.value = result;
  }

  onBeforeMount(setWebsite);
  
  const deleteWebSite = () => {
    WebSiteService.deleteWebSite(route.params.id).then(() => {
      success.value = true;
      website.value = false;
    }).catch(() => {
      error.value = true;
    });
  }

</script>

<template>
  <v-container>
    <v-alert
      v-if="success"
      type="success"
      title="Site successfully deleted"
    ></v-alert>
    <v-alert
      v-if="error"
      type="error"
      title="The site could not be deleted"
    ></v-alert>
    <h1>{{ website.name }}</h1>
    <v-sheet width="800" class="mx-auto" v-if="website">
      <p>{{website.name}}</p>
      <p>{{website.url}}</p>
      <p>{{website.maxDepth}}</p>
      <p>{{website.frequency}}</p>
      <p>{{website.extractor}}</p>
      <v-btn @click="deleteWebSite" block color="red" class="mt-2">
        Delete
      </v-btn>
    </v-sheet>
  </v-container>  
</template>

<style scoped>
</style>

