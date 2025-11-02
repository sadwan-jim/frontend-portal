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
        <span class="font-weight-medium">{{ sectionTitle }}</span>
        <v-icon small color="white" class="ml-2" @click="editTitle">mdi-pencil</v-icon>
      </div>

      
      <v-btn small color="primary" style="color: white !important;"  @click="saveTemplate">Copy Template</v-btn>
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
        <v-window-item :value="tabs[0].name" eager>
          <BasicInfo 
            ref="basicInfoRef" 
            class="mt-4" 
            @emitConfig="config=>handleConfig('basicInfoConfig',config,tabs[0].name)"
          />

          <LegalInfo 
            ref="legalInfoRef" 
            class="mt-4" 
            @emitConfig="config=>handleConfig('legalInfoConfig',config,tabs[0].name)"
            
          />
          <TransactionBase class="mt-4"/>
          <AccordionTable
            ref="marketingInfoRef"
            :headers="headersMarketting" 
            :title="'Marketing Concern'" 
            class="mt-4"
            @emitConfig="config=>handleConfig('marketingInfoConfig',config,tabs[0].name)"
          />
          <AccordionTable
            ref="authorizedSignatoryInfoRef"
            :headers="headersMarketting" 
            :title="'Authorized Signatory Person'" 
            class="mt-4"
            @emitConfig="config=>handleConfig('authorizedSignatoryInfoConfig',config,tabs[0].name)"
          />
        </v-window-item>
        <v-window-item :value="tabs[1].name" eager>
          <AccordionTable
            ref="packingInfoRef" 
            :headers="headersPacking" 
            :title="'Packing'" 
            class="mt-4"
            @emitConfig="config=>handleConfig('packingInfoConfig',config,tabs[1].name)"
          />
          <AccordionTable
           ref="certificationInfoRef" 
           :headers="headersCertificationCompliances" 
           :title="'Certification & Compliance'" 
           class="mt-4"
           @emitConfig="config=>handleConfig('certificationInfoConfig',config,tabs[1].name)"
          />
        </v-window-item>
        <v-window-item :value="tabs[2].name" eager>
          <AccordionTable
           ref="paymentInfoRef" 
           :headers="headersPaymentInfo" 
           :title="'Payment Information'" 
           class="mt-4"
           @emitConfig="config=>handleConfig('paymentInfoConfig',config,tabs[2].name)"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'; 
import BasicInfo from './general-info/basic-info-template.vue';
import LegalInfo from './general-info/legal-info-template.vue';
import AccordionTable from './component/accordion-table.vue';
import TransactionBase from './general-info/transaction-base-template.vue';
import { useFormTemplateStore } from '@/store/form-builder/form-template.store';
import TemplateServices from '../../services/template.services';

const templateStore = useFormTemplateStore();

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

// const basicInfoConfig = ref([]);

const basicInfoRef = ref(null);
const legalInfoRef = ref(null);
const marketingInfoRef = ref(null);
const authorizedSignatoryInfoRef = ref(null);
const packingInfoRef = ref(null);
const certificationInfoRef = ref(null);
const paymentInfoRef = ref(null);

const configs = {
  basicInfoConfig: { title:'Basic Info', tab:'' , controls:[] ,panelType:'control'},
  legalInfoConfig: { title:'Legal Info', tab:'' , controls:[] ,panelType:'control'},
  transactionBaseConfig: { title:'Transaction Base', tab:'General Information' , controls:[] ,panelType:'control'},
  marketingInfoConfig: { title:'Marketing Concern', tab:'' , controls:[] ,panelType:'table'},
  authorizedSignatoryInfoConfig:{ title:'Authorized Signatory Person', tab:'' , controls:[],panelType:'table'},
  packingInfoConfig:{ title:'Packing', tab:'' , controls:[],panelType:'table'},
  certificationInfoConfig:{title:'Certification & Compliance', tab:'' , controls:[],panelType:'table'},
  paymentInfoConfig:{title:'Payment Information', tab:'' , controls:[],panelType:'table'}

};


function handleConfig(name,config,tabname) {
  configs[name].controls = config;
  configs[name].tab = tabname;
  console.log('Received from BasicInfo:', configs[name]);
}


function saveTemplate(){
  basicInfoRef.value.sendConfig();
  legalInfoRef.value.sendConfig();
  marketingInfoRef.value.sendConfig();
  authorizedSignatoryInfoRef.value.sendConfig();
  packingInfoRef.value.sendConfig();
  certificationInfoRef.value.sendConfig();
  paymentInfoRef.value.sendConfig();
  
  templateStore.updateTemplateList(Object.values(configs));
  const newTemplateName = prompt('Enter new template name');
  if (newTemplateName) {
     TemplateServices.create({ name:newTemplateName, templateJson: JSON.stringify(Object.values(configs))});
  }
 
}
</script>
