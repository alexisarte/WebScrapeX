<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { client } from '../types/APIClient';
  import { useAuth0 } from '@auth0/auth0-vue';
  const { user } = useAuth0();

  import { HighCode } from 'vue-highlight-code';
  import 'vue-highlight-code/dist/style.css';

  const light = 'light';

  const route = useRoute();

  const props = defineProps({
    title: String,
    site: {
      type: Object,
      default() {
        return {
          name: '',
          url: '',
          maxDepth: 1,
          frequency: 1,
          extractor: '(cheerio, pageResolver) => {\n return {title:cheerio("title").text(), descripcion:cheerio("#cuerpo_nota_aqui > p:nth-child(1)").text(), enlaces:pageResolver(cheerio)} \n}',
          pageResolver: '(cheerio) => { var links = []; cheerio("a").each(function (i, elem) { const href = cheerio(this).attr("href"); const url = new URL(href); if (href && href.startsWith(url.hostname)) links.push(href)}); return links; }',
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
        <!-- <HighCode :theme="light" v-model="website.extractor" :codeValue="website.extractor" :textEditor="true"> -->
          <v-textarea v-model="website.extractor" label="Extractor" required></v-textarea>
        <!-- </HighCode> -->
        <v-textarea v-model="website.pageResolver" label="Page Resolver" required></v-textarea>
        <v-btn @click="handleClick" block color="green" class="mt-2"> Save </v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
