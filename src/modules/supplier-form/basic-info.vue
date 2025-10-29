<template>
  <v-expansion-panels flat>
    <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
          <v-col cols="11">
            <span class="font-weight-medium">Basic Info</span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row dense>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'Group Name'"
              :label="'Group Name'"
              v-model="basicInfo.groupName"
              outlined
              dense
           
            />
         
         
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'Export Business Unit Name'"
              :label="'Export Business Unit Name'"
              outlined
              dense
              v-model="basicInfo.exportBusinessUnitName"
              :rules="[required(basicInfo.exportBusinessUnitName, 'Export Business Unit Name')]"
            />
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'Export Business Unit Address'"
              :label="'Export Business Unit Address'"
              outlined
              dense
              v-model="basicInfo.exportBusinessUnitAddress"
              :rules="[required(basicInfo.exportBusinessUnitAddress, 'Export Business Unit Address')]"
            />
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'Corporate Office Address'"
              :label="'Corporate Office Address'"
              outlined
              dense
              v-model="basicInfo.corporateOfficeAddress"
              :rules="[required(basicInfo.corporateOfficeAddress, 'Corporate Office Address')]"
            />
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'Website'"
              :label="'Website'"
              outlined
              dense
              v-model="basicInfo.website"
            />
          </v-col>
        
        </v-row>
       
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import axios from '@/plugins/axios';
import { ref, onMounted, computed } from 'vue'; 

import { required } from '@/validators/validators';


const basicInfo = ref({
  groupName: '',
  exportBusinessUnitName: '',
  exportBusinessUnitAddress: '',
  corporateOfficeAddress:'',
  website:''

});


</script>
