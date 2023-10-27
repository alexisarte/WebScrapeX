<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()

const handleSignUp = () => {
  loginWithRedirect({
    appState: {
      target: '/profile'
    },
    authorizationParams: {
      screen_hint: 'signup'
    }
  })
}
</script>

<template>
  <v-btn icon @click="handleSignUp">SIGNUP</v-btn>
</template>