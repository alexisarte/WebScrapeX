<script setup>
  import SiteForm from '../components/SiteForm.vue';
  import { useRoute } from 'vue-router';
  import { ref, onBeforeMount } from 'vue';
  import WebSiteService from '../services/WebSiteService.js';

  const loading = ref(false);
  const route = useRoute();

  let site = {};
  
  const setWebsite = async () => {
    const result = await WebSiteService.getWebSite(route.params.id);
    site = result;
    loading.value = true;
  }
  
  onBeforeMount(setWebsite);
</script>

<template>
  <main>
    <!-- Verifica si los datos se han cargado antes de renderizar el componente SiteForm -->
    <template v-if="loading">
      <SiteForm :title="'Edit website'" :site="site" />
    </template>
    <template v-else>
      <p>Cargando datos...</p>
    </template>
  </main>
</template>

<style>
</style>
