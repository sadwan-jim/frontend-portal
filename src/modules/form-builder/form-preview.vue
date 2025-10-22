 <template>
  <VCard
    class="mx-auto my-5"
    style="max-width: 1200px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1);"
  >
    <!-- Header with gradient and logo -->
    <VCardTitle
      class="d-flex align-center justify-space-between"
      style="background: linear-gradient(135deg, #FF6B6B, #4ECDCC); color: white; padding: 16px 24px;">
      <div class="d-flex align-center">
        <v-img
          src="/logo.png"
          alt="Logo"
          width="50"
          height="50"
          class="mr-3 rounded"
        ></v-img>
        <span class="text-h6 font-weight-bold">Supplier Profile Management</span>
      </div>
    </VCardTitle>


    
    <VCardText class="pa-4" style="background-color: #f9f9f9;">
      <!-- Tabs -->
      <VTabs
        v-model="activeTab"
        show-arrows
        class="v-tabs-pill"
        style="margin-bottom: 24px;"
      >
        <VTab
          v-for="(item, index) in formTabStore.getTabList"
          :key="index"
          :value="item"
          class="text-subtitle-2 font-weight-medium"
        >
          {{ item }}
        </VTab>
      </VTabs>

      <!-- Tab Content -->
      <v-window
        v-model="activeTab"
        class="disable-tab-transition"
        :touch="false"
      >
        <v-window-item
          v-for="(item, index) in formTabStore.getTabList"
          :key="index"
          :value="item"
        >
          <v-row dense>
            <v-col
              cols="12"
              v-for="control in formControlStore.getControlList.filter(x => x.tab === item && x.accordionID === '')"
              :key="control.id"
            >
              <v-expansion-panels v-if="control.type === 'accordion'" flat>
                <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
                  <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
                    <v-row class="align-center" no-gutters>
                      <v-col cols="1" class="d-flex justify-center">
                        <v-icon size="30" color="info" icon="mdi-office-building" />
                      </v-col>
                      <v-col cols="11">
                        <span class="font-weight-medium">{{ control.props.label || 'Title' }}</span>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-row dense>
                      <v-col
                        cols="4"
                        v-for="econtrol in formControlStore.getControlList.filter(x => x.tab === item && x.accordionID === control.id)"
                        :key="econtrol.id"
                        class="mb-4"
                      >
                        <!-- Text Input -->
                        <v-text-field
                          v-if="econtrol.type === 'text'"
                          v-model="econtrol.props.value"
                          :placeholder="econtrol.props.placeholder"
                          :label="econtrol.props.label"
                          outlined
                          dense
                        />

                        <!-- Textarea -->
                        <v-textarea
                          v-if="econtrol.type === 'textarea'"
                          v-model="econtrol.props.value"
                          :placeholder="econtrol.props.placeholder"
                          :label="econtrol.props.label"
                          outlined
                          dense
                          rows="3"
                        />

                        <!-- Dropdown -->
                        <dropdown
                          v-if="econtrol.type === 'select'"
                          v-model="econtrol.props.value"
                          :label="econtrol.props.label"
                          :placeholder="econtrol.props.placeholder"
                          :options="econtrol.props.options"
                          :keyProp="econtrol.props.optionKey || 'id'"
                          :valProp="econtrol.props.optionValue || 'value'"
                          :apiUrl="econtrol.props.apiUrl"
                        />

                        <!-- Radio Group -->
                        <v-radio-group
                          v-if="econtrol.type === 'radio'"
                          :label="control.props.label"
                          v-model="econtrol.props.value"
                        >
                          <v-radio
                            v-for="(option, idx) in econtrol.props.options"
                            :key="idx"
                            :label="option"
                            :value="option"
                          />
                        </v-radio-group>

                        <!-- Table -->
                        <template v-if="econtrol.type === 'table'">
                          <FormDataTable
                            :headers="econtrol.props.column || []"
                            @save="payload => onTableSave(payload, econtrol)"
                          />
                        </template>

                        <!-- Submit Button -->
                        <v-btn
                          v-if="econtrol.type === 'submit'"
                          color="success"
                          rounded
                          block
                        >
                          {{ econtrol.props.label }}
                        </v-btn>
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
              v-if="index < formTabStore.getTabList.length - 1"
              class="mr-3"
              @click.stop="handleClick('next', index)"
            >
              NEXT <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>

            <v-btn
              color="success"
              rounded
              v-if="index === formTabStore.getTabList.length - 1"
              @click.stop="handleClick('submit', index)"
            >
              SUBMIT <v-icon right>mdi-check</v-icon>
            </v-btn>
          </v-row>
        </v-window-item>
      </v-window>
    </VCardText>
  </VCard>
</template>

 
<script setup>
import { useFormControlStore } from '@/store/form-builder/form-control.store.js';
import { useFormTabStore } from '@/store/form-builder/form-tab.store.js';
import axios from '@/plugins/axios';
import { ref, onMounted,computed } from 'vue'; 
import { useRoute } from 'vue-router';
import dropdown from '@/components/controls/dropdown.vue';
import FormDataTable from '@/components/controls/form-data-table.vue';
 const route = useRoute(); 
 
const formControlStore = useFormControlStore()
const formTabStore =  useFormTabStore()

onMounted(async () => {
   
      console.log('Mounted - Form ID:', route.query.templateId);
      if(route.query.templateId){
        console.log(":AA Mounted Template ID",route.query.templateId)
        const templateID = route.query.templateId;
        const res =  await axios.get(`api/FormTemplates/${templateID}`)
        
        setTemplateData(res.data.templateJson)
        console.log("RES",res)
      }
      if(route.query.contactId){
         const contactID = route.query.contactId;
         const res =  await axios.get(`api/SupplierContacts/${contactID}`)
        console.log("res","RES",res)
        setTemplateData(res.data.submittedJson)
      }
    });
const activeTab = ref('')


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

    econtrol.props.value= payload;
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
            activeTab.value = formTabStore.getTabList[index+1];
            break;
        }
        case 'prev':{
            activeTab.value = formTabStore.getTabList[index-1];
            break;
        }
        case 'submit':{
            console.log(contactId.value)
            const submittedJson = formControlStore.getControlList;
            await axios.patch('api/SupplierContacts',{ contactId:contactId.value ,  submittedJson:JSON.stringify(submittedJson) });
            alert("FORM SUBMITTED")
        }

    }

}

</script>
