<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, user } = useAuth0();

import { client } from '../../types/APIClient';

const handleSignUp = () => {
  console.log("holaaaaaaaaaaaaaaaaaaa");
  loginWithRedirect({
    appState: {
      target: '/profile'
    },
    authorizationParams: {
      screen_hint: 'signup'
    }
  });
  console.log("holaaaaaaaaaaaaaaaaaaa");
  const user2 = {
    name: user.value.name,
    token: user.value.sub,
  }
  client['UserController.create'](null, user2).then(() => {
    console.log("user222222222222222222", user2);
  })
};
</script>

<template>
  <v-btn icon @click="handleSignUp"><v-icon>mdi-account-plus-outline</v-icon></v-btn>
</template>
