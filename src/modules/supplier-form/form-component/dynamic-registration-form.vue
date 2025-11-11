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
      </div>
    </v-card-title>

   
    <v-card-text class="pa-4" style="background-color: #f9f9f9;">
        <!-- {{ templateStore.getTemplateList }} -->
      <v-tabs
        v-model="tab"
        show-arrows
        class="v-tabs-pill"
      >
        <v-tab
          v-for="(item, index) in tabs"
          :key="index"
          :value="item"
          class="d-flex align-center"
        >
          <span>{{ item }}</span>
        </v-tab>
      </v-tabs>
     
      <v-window v-model="tab" eager>
        <v-window-item   
          v-for="(item, index) in tabs"
          :key="index"
          :value="item"
        >
            <template v-for="template in templateStore.getTemplateList.filter(x=>x.tab==item)">
                <!-- {{template}} -->
                <template v-if="template.panelType == 'control'">
                    <TransactionBaseTemplate  class="mt-4" v-if="template.title === 'Transaction Base'" />
                    <ControlTemplate  class="mt-4" v-else :sectionTitle="template.title" :controls="template.controls" @emitData="payload=> onEmitData(payload,template.title)"/>
                </template>
                <template v-if="template.panelType == 'table'">
                    <TableTemplate  class="mt-4" :tableData ="template.controls[0].tableData||[]"  v-model="template.controls[0].tableData" :sectionTitle="template.title" :headers="template.controls[0].headers"/>
                </template>

            </template>
                     <v-row justify="center" class="mt-6" style="margin:0px;">
            <v-btn
              color="primary"
              rounded
              outlined
              v-if="index > 0"
              class="mr-3"
              @click.stop="handleClick('prev', index)"
            >
              <v-icon left>mdi-arrow-left</v-icon> PREVIOUS
            </v-btn>

            <v-btn
              color="primary"
              rounded
              outlined
              v-if="index < tabs.length - 1"
              class="mr-3"
              @click.stop="handleClick('next', index)"
            >
              NEXT <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            
          

            <v-btn
              color="success"
              rounded
              v-if="index === tabs.length - 1"
              @click.stop="handleClick('submit', index)"
            >
              SUBMIT <v-icon right>mdi-check</v-icon>
            </v-btn>
          </v-row>
        </v-window-item>

      </v-window>
     
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref ,onMounted ,computed} from 'vue'; 
import ControlTemplate from './control-template.vue';
import TableTemplate from './table-template.vue';
import TransactionBaseTemplate from '../general-info/transaction-base-template.vue';
import { useStringCase } from '@/composable/useStringCase.js';

import { useRoute,useRouter } from 'vue-router';
import axios from '@/plugins/axios';
import { useFormTemplateStore } from '@/store/form-builder/form-template.store';
const tabs = ref([]);
const tab = ref('');

const route = useRoute(); 
const router = useRouter(); 
const { toCamelCase } = useStringCase();
const templateStore = useFormTemplateStore();

onMounted(async () => {
    console.log(templateStore.getTemplateList,"::::::templateStore.getTemplateList")
        setTemplateData(templateStore.getTemplateList)
      if(route.query.templateId){
        console.log(":AA Mounted Template ID",route.query.templateId)
        const templateID = route.query.templateId;
        const res =  await axios.get(`api/FormTemplates/${templateID}`)
        
        setTemplateData(JSON.parse(res.data.templateJson))
        console.log("RES",res)
      }
});
function setTemplateData(templateJson){
       //const formStructureData = JSON.parse(templateJson)

    const uniqueTabs = [...new Set(templateJson.map(item => item.tab))];
    
    tabs.value = uniqueTabs;
    
    tab.value =uniqueTabs[0];
    templateStore.updateTemplateList(templateJson);
    //templateStore.updateControlList(templateJson)
}



function onEmitData(payload ,title){
    console.log(payload ,title,"::::::payload ,title")
}


const sectionTitle = ref('Supplier Profile Management');
const contactId = computed(() => {
    return route.query.contactId||'';
});

async function handleClick(name,index){
    //console.log("name,index",name,index)
 debugger;
    switch(name)
    {
        case 'next':{
            tab.value = tabs.value[index+1];
            break;
        }
        case 'prev':{
             tab.value = tabs.value[index-1];
            break;
        }
        case 'submit':{
          try{
            const submittedJson = templateStore.getTemplateList;
            const payLoad = { contactId:(contactId.value ),  submittedJson:JSON.stringify(submittedJson) , status:2 }
            await axios.patch('api/SupplierContacts',{...payLoad});
            // alertRef.value.show('🎉 Form submitted successfully!', 'success')
             router.push({ name: 'Success' })
             //window.location.href = '/success';  // or use router.push('/success')

        }catch(error){
            //alertRef.value.show('❌ Error submitting form. Please try again.', 'error')
            console.error("Error submitting form:",error)
        }

        }

    }

}
</script>
