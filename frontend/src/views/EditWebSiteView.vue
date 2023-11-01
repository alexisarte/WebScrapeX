<script setup>
  import SiteForm from '../components/SiteForm.vue';
  import { useRoute } from 'vue-router';
  import { ref, onBeforeMount } from 'vue';
  import WebSiteService from '../services/WebSiteServiceClass';

  const loading = ref(false);
  const route = useRoute();

  let site = {};
  
  function setWebsite() {
    WebSiteService.getWebSite(route.params.id).then(
      result => {
        site = result;
        console.log("site", site)
        loading.value = true;
      }
    );
  }
  
  onBeforeMount(() => setWebsite());
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
