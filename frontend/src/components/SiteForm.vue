<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { client } from '../types/APIClient';
  import { useAuth0 } from '@auth0/auth0-vue';
  const { user } = useAuth0();

  const route = useRoute();

  const props = defineProps({
    title: String,
    site: {
      type: Object,
      default() {
        return {
          name: '',
          url: '',
          maxDepth: 0,
          frequency: 0,
          extractor: '(cheerio)=>{\n return {attr:cheerio("elem")}\n}',
          sub:''
        };
      }
    }
  });

  const website = ref(props.site);
  const error = ref(false);
  const success = ref(false);

  const handleClick = () => {
    website.value.frequency = parseInt(website.value.frequency);
    website.value.maxDepth = parseInt(website.value.maxDepth);
    if (route.params.id) {
      updateWebSite();
    } else {
      saveWebSite();
    }
  };

  const saveWebSite = () => {
    website.value.sub = user.value.sub;
    error.value = false;
    success.value = false;
    client['SiteController.create'](null, website.value).then(() => {
        success.value = true;
      })
      .catch(() => {
        error.value = true;
      });
  };

  const updateWebSite = () => {
    error.value = false;
    success.value = false;
    console.log("website.value", website.value);

    client['SiteController.replaceById'](route.params.id, website.value).then(() => {
        success.value = true;
      })
      .catch(() => {
        error.value = true;
      });
  };
</script>

<template>
  <v-container>
    <h1>{{ props.title }}</h1>
    <v-sheet max-width="800" class="mx-auto">
      <v-alert v-if="success" type="success" title="Site saved correctly"></v-alert>
      <v-alert
        v-if="error"
        type="error"
        title="The site could not be saved"
        text="Check the form fields"
      ></v-alert>

      <v-form>
        <v-text-field v-model="website.name" label="Name" required></v-text-field>
        <v-text-field v-model="website.url" label="URL" required></v-text-field>
        <v-text-field v-model="website.maxDepth" label="MaxDepth" required></v-text-field>
        <v-text-field v-model="website.frequency" label="Frequency" required></v-text-field>
        <v-textarea v-model="website.extractor" label="Extractor" required></v-textarea>
        <v-btn @click="handleClick" block color="green" class="mt-2"> Save </v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
