<template>
  <v-expansion-panels flat>
    <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
          <v-col cols="11">
            <span class="font-weight-medium">Transaction Base</span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row dense>
          <v-col cols="4" class="mb-4">
            <v-radio-group  :label="'Transaction Type'" v-model="transactionType" row>
                <v-radio
                   :label="'Self'"
                   :value="'self'"
                />
                <v-radio
                   :label="'Agent'"
                   :value="'agent'"
                />
            </v-radio-group>
         
         
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

const transactionType =  ref(''); 

const basicInfo = ref({
  groupName: '',
  exportBusinessUnitName: '',
  exportBusinessUnitAddress: '',
  corporateOfficeAddress:'',
  website:''

});


</script>
