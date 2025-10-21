<template>
    <div class="mt-4">
        <v-row>
            <v-col cols="12">
                <v-radio-group row v-model="form.contactType">
                    <v-radio label="Self" value="self"></v-radio>
                    <v-radio label="Agent" value="agent"></v-radio>
                    <v-radio label="SCD" value="scd"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>    
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.name"
              :placeholder="'Enter Name'"
              :label="'Supplier Name'"
              :rules="[required(form.name, 'Name')]"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.email"
              :placeholder="'Enter Email'"
              :label="emailLabel"
              :rules="[required(form.email, 'Email'), emailFormat]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.contactName"
              :placeholder="'Contact Person'"
              :label="contatcPersonLabel"
              :rules="[required(form.contactName, 'Company Name')]"
            />
          </v-col>
          <v-col cols="6">
            <dropdown
              :label="'Application'"
              :placeholder="'Application'"
              :options="[]"
              :keyProp="'name'"
              :valProp="'id'"
              :apiUrl="'/api/Applications'"
              v-model="form.applicationId"
              @update:modelValue="(value) => handleChange(value, 'applicationId')"
            
              :rules="[required(form.applicationId, 'Application')]"
            />
            <!-- <v-text-field
              v-model="form.applicationId"
              :placeholder="'Enter Application'"
              :label="'Application'"
              :rules="[applicationRequired]"
            /> -->
          </v-col>
        </v-row>
        <v-row >
            <v-col cols="6">
              <dropdown
                :label="'Form Template'"
                :placeholder="'Form Template'"
                :options="[]"
                :keyProp="'name'"
                :valProp="'id'"
                :apiUrl="'/api/FormTemplates'"
                v-model="form.formTemplateId"
                @update:modelValue="(value) => handleChange(value, 'formTemplateId')"
                :rules="[required(form.formTemplateId, 'Template')]"
              />
            </v-col>
            <v-col v-if="form.contactType=='agent'" cols="6">
                <v-text-field
                    v-model="form.contactName"
                    :placeholder="'Agent Name'"
                    :label="'Agent Name'"

                />
            </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" @click="submitForm">
              Submit
            </v-btn>
          </v-col>
        </v-row>

        <v-divider style="margin-top: 10px;"/>

        <!-- {{form}} -->
              <!-- item-value="id" -->
        <v-data-table
          :headers="headers"
          :items="supplierContactStore.getSupplierContactList||[]"
        >
        <template v-slot:item.actions="{ item }">
  
            <v-icon v-if="item.submittedJson" @click="previewResult(item)">mdi-file-document</v-icon>
            <v-icon @click="previewForm(item)">mdi-eye</v-icon>
            <v-icon @click="sendEmail(item)">mdi-email</v-icon>

          <!-- </v-btn> -->
        </template>
      </v-data-table>
      </div>
</template>      
<script setup>
import { ref, onMounted,computed } from 'vue'; 
import { useRouter } from 'vue-router';
import { useFormControlStore } from '@/store/form-builder/form-control.store.js';
import { useSupplierContactStore } from '@/store/supplier-contact/supplier-contact';
import { required } from '@/validators/validators';
import dropdown from '@/components/controls/dropdown.vue';
import axios from '@/plugins/axios';
const supplierContactStore = useSupplierContactStore();



const router = useRouter(); 


const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Company Name', key: 'contactName' },
   { title: 'Contact Type', key: 'contactType' },
  { title: 'Actions', key: 'actions', sortable: false }
]);


const form = ref({
  name: '',
  email: '',
  contactName: '',
  agentName:'',
  applicationId: null,
  formTemplateId:null,
  contactType:'self'
});

const formControlStore = useFormControlStore()

const contatcPersonLabel = computed(()=>{
    const value = form.value.contactType; 
    switch(value)
    {
        case 'agent':{
            return `Agent's Contact Person`;
          
        }
        case 'scd':{
            return `SCD's Person`;
           
        }
        case 'self':{
            return `Supplier's Contact Person`;
           
        }
    }
    return form.value.contactType
})

const emailLabel = computed(()=>{
    const value = form.value.contactType; 
    switch(value)
    {
        case 'agent':{
            return `Agent's Email`;
           
        }
        case 'scd':{
            return `SCD's Email;`
        }
        case 'self':{
            return `Supplier's Email`;
         
        }
    }
    return form.value.contactType
})

function handleChange(payload,name){
  console.log(payload.id,":::::payload")

  form.value[name] = payload.id;
}

const emailFormat = (v) => /.+@.+\..+/.test(v) || 'Enter a valid email address';

function previewResult(item){
   const url = router.resolve({ name: 'FormPreview', query: { contactId: item.id } }).href;
   window.open(url, '_blank');
}

function previewForm(item){
  console.log("ITEM application",item)
 

  // const formControlList = JSON.parse(item.application.formTemplate)
  // formControlStore.updateControlList([ {...formControlList} ]);
   const url = router.resolve({ name: 'FormPreview', query: { templateId: item.formTemplate.id } }).href;
   window.open(url, '_blank');

   //router.push({ name: 'FormPreview', params: { id: item.formTemplate.id } });
}


onMounted(() => {
  supplierContactStore.fetchSupplierContactList();
});

async function sendEmail(item){
  console.log(item,"AA::AA")
  const { email, name, formTemplate,id } = item;

  const itemPayload = { contactId:id, email, name, templateId: formTemplate.id };

   console.log(itemPayload,"AA::AA")

  const res =  await axios.post(`api/SupplierContacts/SendEmail`,itemPayload)

  alert("Email Send")
}


const submitForm = () => {
      console.log('Form submitted', form.value);

  if (form.value.name && form.value.email && form.value.contactName && form.value.applicationId) {
    console.log('Form submitted', form.value);
    supplierContactStore.addSupplierContact(form.value)

  } else {
    console.log('Form is invalid');
  }
};
</script>