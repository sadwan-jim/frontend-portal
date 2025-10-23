 <template>
  <VCard
      class="mx-auto my-5"
    style="max-width: 1200px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1);"
  >
    <!-- Header with gradient and logo -->
    <VCardTitle class="card-header d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-img
          src="/logo.png"
          alt="Logo"
          width="50"
          height="50"
          class="mr-3 rounded-lg"
        ></v-img>
        <span class="text-h6 font-weight-bold">Supplier Profile Management</span>
      </div>
    </VCardTitle>

    <!-- Main Content -->
    <VCardText class="pa-5 body-section">
      <!-- Tabs -->
      <VTabs
        v-model="activeTab"
        show-arrows
        class="tabs-pill mb-6"
      >
        <VTab
          v-for="(item, index) in formTabStore.getTabList"
          :key="index"
          :value="item"
          class="tab-item"
        >
          {{ item }}
        </VTab>
      </VTabs>

      <!-- Tab Content -->
      <v-window
        v-model="activeTab"
        class="mt-5 disable-tab-transition"
        :touch="false"
      >
        <v-window-item
          v-for="(item, index) in formTabStore.getTabList"
          :key="index"
          :value="item"
        >
          <v-row>
            <v-col
              cols="12"
              v-for="control in formControlStore.getControlList.filter(x => x.tab === item && x.accordionID === '')"
              :key="control.id"
            >
              <v-expansion-panels v-if="control.type === 'accordion'" flat>
                <v-expansion-panel class="expansion-panel">
                  <v-expansion-panel-title class="expansion-title">
                    <v-row class="align-center" no-gutters>
                      <v-col cols="1" class="d-flex justify-center">
                        <v-icon size="30" color="info" icon="mdi-office-building" />
                      </v-col>
                      <v-col cols="11">
                        <h4 class="font-weight-medium mb-0">
                          {{ control.props.label || 'Title' }}
                        </h4>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text class="expansion-body">
                    <v-row>
                      <v-col
                        cols="12"
                        v-for="econtrol in formControlStore.getControlList.filter(x => x.tab === item && x.accordionID === control.id)"
                        :key="econtrol.id"
                      >
                        <v-row>
                          <v-col>
                            <template v-if="econtrol.type === 'table'">
                              <FormDataTable
                                :headers="econtrol.props.column || []"
                                :tableItems="econtrol.props.value || []"
                                @save="payload => onTableSave(payload, econtrol)"
                              />
                            </template>

                            <v-text-field
                              v-else
                              v-model="econtrol.props.value"
                              :placeholder="econtrol.props.placeholder"
                              :label="econtrol.props.label"
                              variant="outlined"
                              color="primary"
                            />
                          </v-col>

                          <v-col>
                            <v-text-field
                              v-model="econtrol.props.feedback"
                              :placeholder="'Feedback'"
                              :label="`Feedback ${econtrol.props.label}`"
                              variant="outlined"
                              color="teal"
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>

          <!-- Navigation Buttons -->
        <v-row justify="center" class="mt-6" style="margin:0px;">
            <v-btn
              color="primary"
              variant="tonal"
              rounded
              v-if="index > 0"
              class="mr-3"
              @click.stop="handleClick('prev', index)"
            >
              <v-icon left>mdi-arrow-left</v-icon> Previous
            </v-btn>

            <v-btn
              color="primary"
              rounded
              variant="flat"
              v-if="index < formTabStore.getTabList.length - 1"
              class="mr-3"
              @click.stop="handleClick('next', index)"
            >
              Next <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>

            <v-btn
              color="success"
              rounded
              variant="elevated"
              v-if="index === formTabStore.getTabList.length - 1"
              @click.stop="handleClick('submit', index)"
            >
              Submit <v-icon right>mdi-check</v-icon>
            </v-btn>
          </v-row>
        </v-window-item>
      </v-window>
    </VCardText>
     <!-- Reusable AlertControl -->
    <AlertControl ref="alertRef" />
  </VCard>
</template>

<style scoped>
/* --- Main Card --- */
.supplier-card {
  border-radius: 18px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
}

/* --- Header --- */
.card-header {
  background: linear-gradient(135deg, #FF6B6B, #4ECDCC);
  color: white;
  padding: 18px 24px;
}

/* --- Body --- */
.body-section {
  background-color: #f9f9f9;
}

 

/* --- Expansion Panels --- */
.expansion-panel {
  border-radius: 10px;
  margin-bottom: 16px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.expansion-panel:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.expansion-title {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #333;
  border-radius: 10px 10px 0 0;
}

.expansion-body {
  background-color: #fafafa;
}

/* --- Buttons --- */
.v-btn {
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: uppercase;
}

.v-btn:hover {
  transform: scale(1.03);
  transition: all 0.2s ease-in-out;
}
 /* Placeholder text */
.feedback-field input::placeholder {
  font-weight: bold;
  color: red;
  opacity: 1; /* Ensure color is applied */
}
</style>

<script setup>
import { useFormControlStore } from '@/store/form-builder/form-control.store.js';
import { useFormTabStore } from '@/store/form-builder/form-tab.store.js';
import axios from '@/plugins/axios';
import { ref, onMounted,computed } from 'vue'; 
import { useRoute } from 'vue-router';
import dropdown from '@/components/controls/dropdown.vue';
import FormDataTable from '@/components/controls/form-data-table.vue';
import AlertControl from '@/components/alerts/AlertControl.vue' ;
 const route = useRoute(); 
 
const formControlStore = useFormControlStore()
const formTabStore =  useFormTabStore()
const alertRef = ref(null)
onMounted(async () => {
   
      console.log('Mounted - Form ID:', route.query.templateId);
      if(route.query.templateId){
        console.log(":AA Mounted Template ID",route.query.templateId)
        const templateID = route.query.templateId;
        const res =  await axios.get(`api/FormTemplates/${templateID}`)

        contactRef.value=res.data;
        
        setTemplateData(res.data.templateJson)
        console.log("RES",res)
      }
      if(route.query.contactId){
         const contactID = route.query.contactId;
         const res =  await axios.get(`api/SupplierContacts/${contactID}`)
         contactRef.value=res.data;
        console.log("res","RES",res)
        setTemplateData(res.data.submittedJson)
      }
    });
const activeTab = ref('')

const contactRef = ref('')


function setTemplateData(templateJson){
       const formStructureData = JSON.parse(templateJson)

        const uniqueTabs = [...new Set(formStructureData.map(item => item.tab))];

        activeTab.value =uniqueTabs[0];

        formTabStore.updateTabList(uniqueTabs)


        formControlStore.updateControlList(formStructureData)
}



const contactId = computed(() => {
    return route.query.contactId||'';
});

function onTableSave(payload,econtrol){
    console.log(payload,econtrol)

    econtrol.value= payload;
    const updatedControl = formControlStore.getControlList.map(x=>{
        if(x.id==econtrol.id){
            return { ...econtrol}
        }

        return {...x}
    })
    formControlStore.updateControlList(updatedControl);
    
}

async function handleClick(name,index){
    //console.log("name,index",name,index)

    switch(name)
    {
        case 'next':{
            activeTab.value = await formTabStore.getTabList[index+1];
            break;
        }
        case 'prev':{
            activeTab.value = await formTabStore.getTabList[index-1];
            break;
        }
        case 'submit':{
          try{
            console.log(contactId.value,contactRef.value)
            const submittedJson = formControlStore.getControlList;
            await axios.patch('api/SupplierContacts',{ contactId:contactId.value ,  submittedJson:JSON.stringify(submittedJson) });
             const { email, name, formTemplate,id } = contactRef.value;

             const itemPayload = { contactId:id, email, name, templateId: formTemplate.id ,feedBackForm:true};

             const res =  await axios.post(`api/SupplierContacts/SendEmail`,itemPayload)
               alertRef.value.show('🎉 Form submitted successfully!', 'success')
          }catch(error){
            alertRef.value.show('❌ Error submitting form. Please try again.', 'error')
            console.error("Error submitting form:",error)
        }
        }

    }

}

</script>
