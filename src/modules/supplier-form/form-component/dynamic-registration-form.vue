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
        {{ templateStore.getTemplateList }}
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
                    <TransactionBaseTemplate v-if="template.title === 'Transaction Base'" />
                    <ControlTemplate v-else :sectionTitle="template.title" :controls="template.controls" @emitData="payload=> onEmitData(payload,template.title)"/>
                </template>
                <template v-if="template.panelType == 'table'">
                    <TableTemplate :sectionTitle="template.title" :headers="template.controls[0].headers"/>
                </template>

            </template>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref ,onMounted} from 'vue'; 
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


</script>
