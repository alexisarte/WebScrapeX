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
  const visites = ref([]);
  const search = ref(false);

  async function setWebsites() {
    client['SiteController.find']().then((result) => {
      const answer = result.data.filter(w => w.sub === user.value.sub);
      websites.value = answer;
    })
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

  const showData = () => {
    client['VisiteController.find']().then((result) => {
      const aux = result.data.filter(v => v.document.title.includes('Bullrich'));
      visites.value = aux;
      console.log("result.dataaa", visites.value);
    })
    search.value = true;
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
      <v-card 
        class="pa-4"
        flat
        height="300px"
        img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
        @keyup.enter="showData"
      >
        <v-toolbar
          dense
          floating
        >
          <v-text-field
            hide-details
            prepend-icon="mdi-magnify"
            single-line
          ></v-text-field>
        </v-toolbar>
      </v-card>
    
    <template v-if="search">
      <v-list lines="one">
        <v-list-item
          v-for="v in visites"
          :key="v.id"
          :title="v.name"
          :subtitle="v.document.title"
        >
        </v-list-item>
      </v-list>
    </template>
    <template v-else>
      <p>Cargando datos...</p>
    </template>
    <!-- </v-sheet> -->
  </v-container>
</template>

<style>

</style>
