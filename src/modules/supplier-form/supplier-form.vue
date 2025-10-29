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
          <LegalInfo class="mt-4"/>
          <AccordionTable :headers="headersMarketting" :title="'Marketing Concern'" class="mt-4"/>
          <AccordionTable :headers="headersMarketting" :title="'Authorized Signatory Person'" class="mt-4"/>
          <TransactionBase/>
        </v-window-item>
        <v-window-item :value="'Manufacturing Info'">
           <AccordionTable :headers="headersPacking" :title="'Packing'" class="mt-4"/>
           <AccordionTable :headers="headersCertificationCompliances" :title="'Certification & Compliance'" class="mt-4"/>
        </v-window-item>
        <v-window-item :value="'Commercial & Finance'">
          <p>SCRIN</p> 
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'; 
import BasicInfo from './general-info/basic-info.vue';
import LegalInfo from './general-info/legal-info.vue';
import MarketingConcern from './general-info/marketing-concern.vue';
import AccordionTable from './component/accordion-table.vue';
import TransactionBase from './general-info/transaction-base.vue';
const tabs = ref(['General Information','Manufacturing Info','Commercial & Finance']);
const tab = ref('General Information');

const headersMarketting = [
    { title:'Name' , key: 'name' , type:'textbox' },
    { title:'Designation' , key: 'designation' , type:'textbox' },
    { title:'Contact No.' , key: 'contactNo' , type:'textbox' },
    { title:'Email' , key: 'email' , type:'textbox' },
]

const headersPacking = [
    { title:'Yarn Net Weight Per Cone' , key: 'yarnNetWeightPerCone' , type:'textbox' },
    { title:'Cone Per Carton' , key: 'conePerCarton' , type:'textbox' },
    { title:'Gross Weight Per Carton' , key: 'grossWeightPerCarton' , type:'textbox' },
    
]

const headersCertificationCompliances = [
    { title:'Sustainability Certifications' , key: 'sustainabilityCertifications' , type:'textbox' },
    { title:'Validity Date' , key: 'validityDate' , type:'textbox' },
    { title:'Social Environmental Audits' , key: 'socialEnvironmentalAudits' , type:'textbox' },
    
]

</script>
