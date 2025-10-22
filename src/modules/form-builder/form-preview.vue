<template>
    <VCard title="Supplier Profile Management" style="background-color: rgb(245, 245, 245);">
          <VCardText>
            <!-- {{  formControlStore.getControlList.filter(x=>x.type!='accordion') }} -->
            <VTabs
                v-model="activeTab"
                show-arrows
                class="v-tabs-pill"
            >
           
                <!-- :style="{
                        color:'blue',
                        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1))'
                    }" -->
                <VTab
                    v-for="(item,index) in formTabStore.getTabList"
                    :key="index"
                    :value="item"
                
                >
                  {{ item }}
                </VTab>
            </VTabs>
             <!-- @click.prevent="onTabClick()"-->
            <!-- {{formControlStore.getControlList}} -->
            <v-window
                v-model="activeTab"
                class="mt-5 disable-tab-transition"
                :touch="false"
            >
                <v-window-item v-for="(item,index) in formTabStore.getTabList" :value="item">
                    <v-row>
                        <v-col  cols="12" v-for="control in formControlStore.getControlList.filter(x=>x.tab==item && x.accordionID=='')">
                             
                                <v-expansion-panels  v-if="control.type=='accordion'">
                                    <v-expansion-panel style="background-color: rgb(248, 249, 250);">
                                        <v-expansion-panel-title style="font-size: 1.25rem;">
                                            <v-row>
                                                <v-col cols="1" style="max-width: 35px;">
                                                    <v-icon
                                              
                                                :size="30"
                                                color="info"
                                                icon="mdi-office-building"/>
                                                </v-col>
                                                <v-col cols="11">
                                                    <h4>{{ control.props.label || 'Title' }}</h4>
                                                </v-col>
                                            </v-row> 
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text elevation="3">
                                          <v-row>
                                            <v-col  cols="4" v-for="econtrol in formControlStore.getControlList.filter(x=>x.tab==item && x.accordionID==control.id)">
                                                    <v-text-field
                                                        v-model="econtrol.props.value"
                                                        v-if="econtrol.type=='text'"
                                                        :placeholder="econtrol.props.placeholder"
                                                        :label="econtrol.props.label"
                                                    />
                                                    <v-textarea
                                                        v-model="econtrol.props.value"
                                                        v-if="econtrol.type=='textarea'"
                                                        :placeholder="econtrol.props.placeholder"
                                                        :label="econtrol.props.label"
                                                    />
                                                    <dropdown 
                                                        v-model="econtrol.props.value"
                                                        v-if="econtrol.type=='select'"
                                                        :label="econtrol.props.label"
                                                        :placeholder="econtrol.props.placeholder"
                                                        :options="econtrol.props.options"
                                                        :keyProp="econtrol.props.optionKey||'id'"
                                                        :valProp="econtrol.props.optionValue||'value'"
                                                        :apiUrl="econtrol.props.apiUrl"
                                                    />
                                                    <v-radio-group 
                                                        v-if="econtrol.type=='radio'" 
                                                        :label="control.props.label"
                                                         v-model="econtrol.props.value"
                                                    >
                                                        <v-radio
                                                            v-for="(option, idx) in econtrol.props.options"
                                                            :key="idx"
                                                            :label="option"
                                                            :value="option"
                                                            @click="onTableSave(option,econtrol)"
                                                        />
                                                    </v-radio-group>
                                                    <template v-if="econtrol.type=='table'">
                                                   
                                                        <FormDataTable                                             
                                                            :headers="econtrol.props.column||[]"
                                                            @save="(payload)=>onTableSave(payload,econtrol)"
                                                        />
                                                    </template>
                                                    <v-btn v-if="econtrol.type=='submit'">{{econtrol.props.label}}</v-btn>
                                            </v-col>
                                           </v-row> 
                                        </v-expansion-panel-text>

                                    </v-expansion-panel>
                                  
                                </v-expansion-panels>
                      
                        </v-col>    
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            
                            <v-btn color="primary" @click.stop="handleClick('prev',index)" flat v-if="index>0" style="margin-right: 10px;">
                                PREVIOUS
                            </v-btn>
                            
                            <v-btn color="primary" v-if="index<formTabStore.getTabList.length-1" flat @click.stop="handleClick('next',index)">
                                NEXT
                            </v-btn>

                            <v-btn color="secondary" v-if="index==formTabStore.getTabList.length-1" flat @click.stop="handleClick('submit',index)">
                                SUBMIT
                            </v-btn>

                            
                        </v-col>
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
