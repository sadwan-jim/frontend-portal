 <template>
  <div class="mt-4">
    <v-data-table
      :headers="headers"
      :items="supplierContactStore.getSupplierContactList || []"
    >
       <template v-slot:item.status="{ item }">
        {{ getStatusString(item.status) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon v-if="item.status>1" @click="previewResult(item)">mdi-file-document</v-icon>
        <v-icon @click="previewForm(item)">mdi-eye</v-icon>
        <v-icon @click="sendEmail(item)">mdi-email</v-icon>
      </template>
    </v-data-table>
     <!-- Reusable AlertControl -->
    <AlertControl ref="alertRef" />
  </div>
</template>
     
<script setup>
import { ref, onMounted,computed } from 'vue'; 
import { useRouter } from 'vue-router';
import { useFormControlStore } from '@/store/form-builder/form-control.store.js';
import { useSupplierContactStore } from '@/store/supplier-contact/supplier-contact';
import { useFormTemplateStore } from '@/store/form-builder/form-template.store.js';

import axios from '@/plugins/axios';
import AlertControl from '@/components/alerts/AlertControl.vue' ;
const supplierContactStore = useSupplierContactStore();



const router = useRouter(); 
const alertRef = ref(null)

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Company Name', key: 'contactName' },
  { title: 'Contact Type', key: 'contactType' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]);


const getStatusString = computed(() => (status) => {
  switch (status) {
    case 0:
      return 'Initial Create';
    case 1:
      return 'Email Sent';
    case 2:
      return 'Supplier Submit';
    case 3:
      return 'Pending FeedBack';
    case 4:
      return 'Feed Back Sent';
    default:
      return 'Unknown';
  }
});




const formControlStore = useFormControlStore()
const templateStore  = useFormTemplateStore() 


async function previewResult(item){
  console.log("ITEM",JSON.parse(item.submittedJson))
  await templateStore.updateTemplateList(JSON.parse(item.submittedJson))
   const url = router.resolve({ name: 'FeedbackForm', query: { contactId: item.id} }).href;
   window.open(url, '_blank');
}

function previewForm(item){
  console.log("ITEM application",item)
 

  // const formControlList = JSON.parse(item.application.formTemplate)
  // formControlStore.updateControlList([ {...formControlList} ]);
   const url = router.resolve({ name: 'DynamicForm', query: { templateId: item.formTemplate.id } }).href;
   window.open(url, '_blank');

   //router.push({ name: 'FormPreview', params: { id: item.formTemplate.id } });
}


onMounted(() => {
  supplierContactStore.fetchSupplierContactList();
});

async function sendEmail(item){
  console.log(item,"AA::AA")
  const { email, name, formTemplate,id,status } = item;

  const itemPayload = { contactId:id, email, name, templateId: formTemplate.id,status:status };
  
  
  console.log(itemPayload,"AA::AA")
  const res =  await axios.post(`api/SupplierContacts/SendEmail`,itemPayload)
  
  supplierContactStore.updateSupplierContact({ ...item ,  status:1});

  alertRef.value.show('🎉 Email Send successfully!', 'success')
}

</script>