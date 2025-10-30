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
  
      <v-col cols="11" class="d-flex align-center justify-space-between">
            <span class="font-weight-medium">{{ sectionTitle }}</span>
            <v-icon small color="primary" @click="editTitle">mdi-pencil</v-icon>
          </v-col>
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
          :value="item.name"
          class="d-flex align-center"
        >
          <span>{{ item.name }}</span>
          <v-icon
            small
            color="primary"
            class="ml-2 cursor-pointer"
            @click.stop="editTabName(index)"
          >
            mdi-pencil
          </v-icon>
        </v-tab>
      </v-tabs>
      
      <v-window v-model="tab">
        <v-window-item :value="tabs[0].name">
          <BasicInfo class="mt-4"/>
          <LegalInfo class="mt-4"/>
          <TransactionBase class="mt-4"/>
          <AccordionTable :headers="headersMarketting" :title="'Marketing Concern'" class="mt-4"/>
          <AccordionTable :headers="headersMarketting" :title="'Authorized Signatory Person'" class="mt-4"/>
        </v-window-item>
        <v-window-item :value="tabs[1].name">
           <AccordionTable :headers="headersPacking" :title="'Packing'" class="mt-4"/>
           <AccordionTable :headers="headersCertificationCompliances" :title="'Certification & Compliance'" class="mt-4"/>
        </v-window-item>
        <v-window-item :value="tabs[2].name">
          <AccordionTable :headers="headersPaymentInfo" :title="'Payment Information'" class="mt-4"/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'; 
import BasicInfo from './general-info/basic-info.vue';
import LegalInfo from './general-info/legal-info.vue';
import AccordionTable from './component/accordion-table.vue';
import TransactionBase from './general-info/transaction-base.vue';

const tabs = ref([
  { name: 'General Information' },
  { name: 'Manufacturing Info' },
  { name: 'Commercial & Finance' }
]);

const tab = ref(tabs.value[0].name);

const sectionTitle = ref('Supplier Profile Management');

const editTitle = () => {
  const newTitle = prompt('Enter new section title', sectionTitle.value);
  if (newTitle) sectionTitle.value = newTitle;
};
const headersMarketting = [
  { title:'Name' , key: 'name' , type:'textbox' },
  { title:'Designation' , key: 'designation' , type:'textbox' },
  { title:'Contact No.' , key: 'contactNo' , type:'textbox' },
  { title:'Email' , key: 'email' , type:'textbox' },
];


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


 const headersPaymentInfo = [
  { title: 'Currency', key: 'currency', type: 'dropdown', option: ['BDT','USD'] },
  { title: 'Payment Term', key: 'paymentTerm', type: 'dropdown', option: ['RTGS','DA','A/C Payee Cheque','LC','TT'] },
  { title: 'Payment Method', key: 'paymentMethod', type: 'textbox' },
  { title: 'Tenure Days', key: 'tenureDays', type: 'textbox' },
]


// Function to edit tab name
const editTabName = (index) => {
  const newName = prompt('Enter new tab name', tabs.value[index].name);
  if (newName) {
    tabs.value[index].name = newName;
    // Keep the selected tab active
    tab.value = newName;
  }
};
</script>
