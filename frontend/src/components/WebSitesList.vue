<script setup>
  import { ref, onBeforeMount, onMounted } from 'vue';
  import { useAuth0 } from '@auth0/auth0-vue';
  import { useAuthStore } from '@/stores/userAuthStore.js';
  import { client } from '../types/APIClient';
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const authStore = useAuthStore();

  const websites = ref([]);
  // const search = ref(false);

  async function setWebsites() {
    const filterByName = {
      where: {
        sub: user.value.sub,
      },
    };
    client['SiteController.find']({ filter: filterByName }).then((result) => {
      websites.value = result.data;
    })
    console.log("trayendo datossssssssssssssss");
  }

  const deleteWebSite = (id) => {
    client['SiteController.deleteById'](id).then(() => {
      websites.value = websites.value.filter(w => w.id !== id);
    })
  };

  async function setAuthStore() { 
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      // se registra el token una vez autenticado para los request de la API.
      client.defaults.headers['authorization'] = `Bearer ${token}`;
      authStore.login(token, user.value);
    } else {
      authStore.logout();
    }
  }
  
  onBeforeMount(() => setAuthStore());

  onMounted(() => setWebsites());

</script>

<template>
  <v-container>
    <!-- <v-sheet> -->
      <h1>Registered websites</h1>
      <v-list lines="one">
        <v-list-item v-for="w in websites"
          :key="w.id"
          :title="w.name"
          :subtitle="w.url"
        >
        <v-btn icon><RouterLink :to="{name:'editWebsite', params:{id:w.id}}"><v-icon>mdi-tooltip-edit</v-icon></RouterLink></v-btn>
        <v-btn icon @click="deleteWebSite(w.id)"><v-icon>mdi-delete-forever</v-icon></v-btn>
        <v-btn icon><RouterLink :to="{name:'siteDetail', params:{id:w.id}}"><v-icon>mdi-details</v-icon></RouterLink></v-btn>
        </v-list-item>
      </v-list>
    <!-- </v-sheet> -->
  </v-container>
</template>

<style>

</style>
