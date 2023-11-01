<script setup>
  import { ref, onBeforeMount, onMounted } from 'vue';
  import WebSiteService from '../services/WebSiteServiceClass';

  import { useAuth0 } from '@auth0/auth0-vue';
  import { useAuthStore } from '@/stores/userAuthStore.js';
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const authStore = useAuthStore();

  const websites = ref([]);

  function setWebsites() {
    WebSiteService.getWebSites().then(
      result => websites.value = result
    );
  }

  const deleteWebSite = (id) => WebSiteService.deleteWebSite(id).then(() => {
    websites.value = websites.value.filter(w => w.id !== id);
  });

  async function setAuthStore() {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      authStore.login(token, user.value);
    } else {
      authStore.logout();
    }
  }
  
  onMounted(() => setAuthStore());

  onBeforeMount(() => setWebsites());

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
