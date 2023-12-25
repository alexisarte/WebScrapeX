<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import { client } from '../types/APIClient';

  const route = useRoute();

  const website = ref({});
  const visites = ref([]);
  const error = ref(false);
  const success = ref(false);

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

  onBeforeMount(setWebsite);
  onBeforeMount(getVisites);
</script>

<template>
  <v-container>
    <v-alert v-if="success" type="success" title="Site successfully deleted"></v-alert>
    <v-alert v-if="error" type="error" title="The site could not be deleted"></v-alert>
    <h1>{{website.name}}</h1>
    <v-sheet width="800" class="mx-auto" v-if="website">
      <!-- <v-list lines="one">
        <v-list-item
          v-for="v in visites"
          :key="v.id"
          :title="v.name"
          :subtitle="v.url"
        >
        </v-list-item>
      </v-list> -->
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
