<script setup>
  import { ref } from 'vue';
  import WebSiteService from '../services/WebSiteServiceClass';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const props = defineProps({
    title: String,
    site: {
      type: Object,
      default() {
        return {
          name: '',
          url: '',
          maxDepth: 0,
          frequency: 0,
          extractor: ''
        };
      }
    }
  });

  const website = ref(props.site);
  const error = ref(false);
  const success = ref(false);

  const handleClick = () => {
    if (route.params.id) {
      updateWebSite();
    } else {
      saveWebSite();
    }
  };

  const saveWebSite = () => {
    error.value = false;
    success.value = false;
    WebSiteService.createWebSite(website.value)
      .then(() => {
        success.value = true;
      })
      .catch(() => {
        error.value = true;
      });
  };

  const updateWebSite = () => {
    error.value = false;
    success.value = false;
    WebSiteService.updateWebSite(route.params.id, website.value)
      .then(() => {
        success.value = true;
      })
      .catch(() => {
        error.value = true;
      });
  };
</script>

<template>
  <v-container>
    <h1>{{ props.title }}</h1>
    <v-sheet max-width="800" class="mx-auto">
      <v-alert v-if="success" type="success" title="Site saved correctly"></v-alert>
      <v-alert
        v-if="error"
        type="error"
        title="The site could not be saved"
        text="Check the form fields"
      ></v-alert>

      <v-form>
        <v-text-field v-model="website.name" label="Name" required></v-text-field>
        <v-text-field v-model="website.url" label="URL" required></v-text-field>
        <v-text-field v-model="website.maxDepth" label="MaxDepth" required></v-text-field>
        <v-text-field v-model="website.frequency" label="Frequency" required></v-text-field>
        <v-text-field v-model="website.extractor" label="Extractor" required></v-text-field>
        <v-btn @click="handleClick" block color="green" class="mt-2"> Save </v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
