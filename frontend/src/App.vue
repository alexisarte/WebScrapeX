<script setup>
  import { RouterLink, RouterView } from 'vue-router';

  import LoginButton from "@/components/buttons/LoginButton.vue";
  import LogoutButton from "@/components/buttons/LogoutButton.vue";
  import SignupButton from "@/components/buttons/SignupButton.vue";

  import { useAuth0 } from "@auth0/auth0-vue";

  const { isAuthenticated } = useAuth0();

</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" class="whi" color="black">
      <v-app-bar-title>Web Scrape X</v-app-bar-title>
      <v-btn><RouterLink to="/">HOME</RouterLink></v-btn>
      <template v-if="!isAuthenticated">
        <LoginButton />
        <SignupButton />
      </template>
      <template v-if="isAuthenticated">
        <v-btn><RouterLink to="/websites">Sites</RouterLink></v-btn>
        <v-btn> <RouterLink to="/website/new">Add site</RouterLink></v-btn>
        <v-btn><RouterLink to="/profile">ACCOUNT</RouterLink></v-btn>
        <LogoutButton />
      </template>
    </v-app-bar>
    
    <v-main>
      <RouterView />
    </v-main>
    
  </v-app>
</template>

<style scoped></style>
