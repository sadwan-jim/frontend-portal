<template>
  <v-tabs
    v-model="tab"
    show-arrows
    class="v-tabs-pill"
  >
    <v-tab
      v-for="(item,index) in ['new','existing']"
      :key="index"
      :value="item"
    >
      {{ item }}
    </v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item  :value="'new'">
      <NewSupplierForm/>
    </v-window-item>
    <v-window-item  :value="'existing'">
       <NewSupplierForm/>
    </v-window-item>
  </v-window>

</template>

<script setup>
import { ref } from 'vue'; 
import NewSupplierForm from './new-supplier-form.vue';



const tab = ref('new')






</script>
