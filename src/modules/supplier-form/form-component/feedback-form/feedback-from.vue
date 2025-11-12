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
        <span class="font-weight-medium">{{ sectionTitle }} </span>
      </div>
    </v-card-title>

   <!-- {{ isAllOk }} -->
    <v-card-text class="pa-4" style="background-color: #f9f9f9;">
        <!-- {{ templateStore.getTemplateList.filter(x=>x.title=='Marketing Concern') }} -->
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
          <span>{{ item }}
            <template v-if="feedBackCount(item) > 0">
                <span class="badge bg-danger ms-1">{{ feedBackCount(item) }}</span>
            </template> 
            
          </span>
        </v-tab>
      </v-tabs>
     
      <v-window v-model="tab" eager>
        <v-window-item   
          v-for="(item, index) in tabs"
          :key="index"
          :value="item"
        >
            <template v-for="template in templateStore.getTemplateList.filter(x=>x.tab==item)">
                <!-- {{template.controls}} -->
                <template v-if="template.panelType == 'control'">
                    <!-- <TransactionBaseTemplate  class="mt-4" v-if="template.title === 'Transaction Base'" /> -->
                    <FeedbackControlTemplate  class="mt-4" :sectionTitle="template.title" :controls="template.controls" @emitData="payload=> onEmitData(payload,template.title)"/>
                </template>
                <template v-if="template.panelType == 'table'">
                   <FeedbackTableTemplate
                        class="mt-4"
                        v-model="template.controls[0]"
                        :sectionTitle="template.title"
                        :headers="template.controls[0].headers"
                   />

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
                :disabled="!disableNext"
            >
              NEXT <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            
          

            <v-btn
              color="success"
              rounded
              v-if="index === tabs.length - 1"
              @click.stop="handleClick('submit', index)"
                :disabled="!disableNext"
            >
             <template v-if="isAllOk">
                SUBMIT
             </template>
             <template v-else>
                FEEDBACK
             </template>
               <v-icon right>mdi-check</v-icon>
            </v-btn>
          </v-row>
        </v-window-item>

      </v-window>
     
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref ,onMounted ,computed} from 'vue'; 
import FeedbackControlTemplate from './feedback-control-template.vue';
import FeedbackTableTemplate from './feedback-table-template.vue';


import { useRoute,useRouter } from 'vue-router';
import axios from '@/plugins/axios';
import { useFormTemplateStore } from '@/store/form-builder/form-template.store';
const tabs = ref([]);
const tab = ref('');

const route = useRoute(); 
const router = useRouter(); 

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
    debugger;
    const uniqueTabs = [...new Set(templateJson.map(item => item.tab))];
    
    tabs.value = uniqueTabs;
    
    tab.value =uniqueTabs[0];
    templateStore.updateTemplateList(templateJson);
    //templateStore.updateControlList(templateJson)
}

const isAllOk = computed(()=>{
  
  return templateStore.getTemplateList
  .filter(item => item.controls.length > 0)
  .every(item => 
    item.controls.every(control => control.ok === true) 
  );
})

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
            await axios.patch('api/SupplierContacts',{ contactId:contactId.value ,  submittedJson:JSON.stringify(submittedJson) , status:2 });
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

const disableNext = computed(() => {
  const currentTabData = templateStore.getTemplateList.filter(
    x => x.tab === tab.value
  );

  return currentTabData.every(tab =>
    tab.controls.every(ctrl =>
      ctrl.ok || (ctrl.feedback && ctrl.feedback.trim() !== '')
    )
  )
});

function feedBackCount (tab) {
  const currentTabData = templateStore.getTemplateList.filter(
    x => x.tab === tab
  );

   const allControls = currentTabData.flatMap(item => item.controls || []);
  return allControls.reduce((accum,cur) => {
     if(cur.feedback && cur.feedback.trim() !== ''){
        accum+=1;
     }
     return accum;
  },0);
  
 
};


</script>
