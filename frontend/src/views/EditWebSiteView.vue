<script setup>
  import SiteForm from '../components/SiteForm.vue';
  import { useRoute } from 'vue-router';
  import { ref, onBeforeMount } from 'vue';
import { client } from '../types/APIClient';

  const loading = ref(false);
  const route = useRoute();

  let site = {};
  
  function setWebsite() {
    client['SiteController.findById'](route.params.id).then(
      result => {
        site = result.data;
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
