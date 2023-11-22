<script setup>
  // import { useAuthStore } from '@/stores/userAuthStore.js';
  // const authStore = useAuthStore();
  // const user = authStore.getUserData;

  
  import { onMounted } from 'vue';
  
  import { useAuth0 } from '@auth0/auth0-vue';
  import { useAuthStore } from '@/stores/userAuthStore.js';
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const authStore = useAuthStore();
  
  const accessToken = authStore.getToken;
  
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
  <div>
    <h1>Profile Page</h1>
    <div>
      <div>
        <div>
          <img :src="user.picture" />
          <div>
            <h2>{{ user.name }}</h2>
            <span>{{ user.email }}</span>
          </div>
        </div>
        <div>
          <span title="User Token">{{ accessToken }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
