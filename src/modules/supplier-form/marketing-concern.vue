<template>
  <v-expansion-panels flat>
    <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
          <v-col cols="11">
            <span class="font-weight-medium">Marketing Concern</span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row dense>
          <v-col cols="12" class="mb-4">
            <FormDataTable
              :headers="headers"
             
            />
          <!-- @save="payload => onTableSave(payload)" -->
         
          </v-col>
        
        
        </v-row>
   
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import axios from '@/plugins/axios';
import { ref, onMounted, computed } from 'vue'; 
import FormDataTable from '@/components/controls/form-data-table.vue';
import { required } from '@/validators/validators';


const headers = [
    { title:'Name' , key: 'name' , type:'textbox' },
    { title:'Designation' , key: 'designation' , type:'textbox' },
    { title:'Contact No.' , key: 'designation' , type:'textbox' },
    { title:'Designation' , key: 'contactNo' , type:'textbox' },
    { title:'Email' , key: 'email' , type:'textbox' },
]

const basicInfo = ref({
  groupName: '',
  exportBusinessUnitName: '',
  exportBusinessUnitAddress: '',
  corporateOfficeAddress:'',
  website:''

});


</script>
