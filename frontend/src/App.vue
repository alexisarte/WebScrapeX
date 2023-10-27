<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { onMounted } from 'vue';

  import LoginButton from '@/components/buttons/LoginButton.vue';
  import LogoutButton from '@/components/buttons/LogoutButton.vue';
  import SignupButton from '@/components/buttons/SignupButton.vue';

  import { useAuth0 } from '@auth0/auth0-vue';
  import { useAuthStore } from '@/stores/userAuthStore.js';
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const authStore = useAuthStore();

  async function setAuthStore() {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      authStore.login(token, user.value);
    } else {
      authStore.logout();
    }
  }
  onMounted(() => setAuthStore());
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" class="whi" color="black">
      <v-app-bar-title>Web Scrape X</v-app-bar-title>
      <RouterLink to="/"><v-icon>mdi-home</v-icon></RouterLink>
      <template v-if="!isAuthenticated">
        <LoginButton />
        <SignupButton />
      </template>
      <template v-if="isAuthenticated">
        <v-btn icon>
          <RouterLink to="/websites"><v-icon>mdi-spider-web</v-icon></RouterLink>
        </v-btn>
        <v-btn icon>
          <RouterLink to="/website/new"><v-icon>mdi-plus-circle-outline</v-icon></RouterLink>
        </v-btn>
        <v-btn icon>
          <RouterLink to="/profile"><v-icon>mdi-account</v-icon></RouterLink>
        </v-btn>
        <LogoutButton />
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
