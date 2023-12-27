<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import { client } from '../types/APIClient';

  const route = useRoute();

  const website = ref({});
  const visites = ref([]);
  // const error = ref(false);
  // const success = ref(false);

  const setWebsite = () =>  {
    client['SiteController.findById'](route.params.id).then((result) => {
      console.log("result.dataaa", website.value)
      website.value = result.data
    })
  }

  const getVisites = () => {
    client['SiteVisitController.find'](route.params.id).then((result) => 
      visites.value = result.data
    )
  }

  const search = (keyprase) => {
    console.log("keyprase", keyprase);
    visites.value = visites.value.filter(v => v.name.includes(keyprase));
  }

  onBeforeMount(setWebsite);
  onBeforeMount(getVisites);
</script>

<template>
  <v-container>
    <!-- <v-alert v-if="success" type="success" title="Site successfully deleted"></v-alert>
    <v-alert v-if="error" type="error" title="The site could not be deleted"></v-alert> -->
    <v-card 
      class="pa-4"
      max-width="400"
      height="100px"
      img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
      @keyup.enter="miInput => search(miInput.target.value)"
    >
      <v-toolbar
        dense
        floating
      >
        <v-text-field
          ref="miInput"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
        ></v-text-field>
      </v-toolbar>
    </v-card>
    <h1>{{website.name}}</h1>
    <v-sheet width="800" class="mx-auto" v-if="website">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              URL
            </th>
            <th class="text-left">
              Document
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in visites"
            :key="item.id"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.url }}</td>
            <td>{{ item.document }}</td>
          </tr>
        </tbody>
      </v-table>
      
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
