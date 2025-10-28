<template>
  <v-card
    class="mx-auto my-5"
    style="max-width: 1200px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1);"
  >
    <v-card-title
      class="d-flex align-center justify-space-between"
      style="background: linear-gradient(135deg, #FF6B6B, #4ECDCC); color: white; padding: 16px 24px;"
    >
      <div class="d-flex align-center">
        <v-img
          src="/logo.png"
          alt="Logo"
          width="50"
          height="50"
          class="mr-3 rounded"
        />
        <span class="text-h6 font-weight-bold">Supplier Profile Management</span>
      </div>
    </v-card-title>
    
    <v-card-text class="pa-4" style="background-color: #f9f9f9;">
      <v-tabs
        v-model="tab"
        show-arrows
        class="v-tabs-pill"
      >
        <v-tab
          v-for="(item, index) in tabs"
          :key="index"
          :value="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      
      <v-window v-model="tab">
        <v-window-item :value="'General Information'">
          <BasicInfo class="mt-4"/>
        </v-window-item>
        <v-window-item :value="'Manufacturing Info'">
          <p>BROTHERHOOD OF NOD</p> <!-- Dynamic content could go here -->
        </v-window-item>
        <v-window-item :value="'Commercial & Finance'">
          <p>SCRIN</p> <!-- More dynamic content -->
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'; 
import BasicInfo from './basic-info.vue';

const tabs = ref(['General Information','Manufacturing Info','Commercial & Finance']);
const tab = ref('General Information');
</script>
