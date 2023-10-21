<script setup>
  import { ref } from 'vue';
  import WebSiteService from '../services/WebSiteService.js';

  
  const website = ref({
    name: '',
    url: '',
    maxDepth: 0,
    frequency: 0,
    extractor: ''
  });

  const error = ref(false);
  const success = ref(false);

  const saveWebSite = async () => {
    WebSiteService.postWebSites(website.value).then(() => {
      success.value = true;
    }).catch(() => {
      error.value = true;
    });
  }

</script>

<template>
  <v-container>
    <h1>Add a new website</h1>
    <v-sheet max-width="800" class="mx-auto">
      <v-alert
      v-if="success"
      type="success"
      title="Site saved correctly"
      ></v-alert>
      <v-alert
        v-if="error"
        type="error"
        title="The site could not be saved"
        text="Check the form fields"
      ></v-alert>
      
      <v-form>
        <v-text-field
          v-model="website.name"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="website.url"
          label="URL"
          required
        ></v-text-field>
        <v-text-field
          v-model="website.maxDepth"
          label="MaxDepth"
          required
        ></v-text-field>
        <v-text-field
          v-model="website.frequency"
          label="Frequency"
          required
        ></v-text-field>
        <v-text-field
          v-model="website.extractor"
          label="Extractor"
          required
        ></v-text-field>
        <v-btn @click="saveWebSite" block color="green" class="mt-2">
          Save
        </v-btn>
      </v-form>
    </v-sheet>  
  </v-container>
</template>

<style scoped>
</style>

