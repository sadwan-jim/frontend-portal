<template>
    <VCard title="Supplier Profile Management" style="background-color: rgb(245, 245, 245);">
          <VCardText>
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
                                                    <h4 style="margin-top: 5px;">{{ control.props.label || 'Title' }}</h4>
                                                </v-col>
                                            </v-row> 
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text elevation="3">
                                          <v-row>
                                            <v-col  cols="4" v-for="econtrol in formControlStore.getControlList.filter(x=>x.tab==item && x.accordionID==control.id)">
                                                    <v-text-field
                                                        
                                                        v-if="econtrol.type=='text'"
                                                        :placeholder="econtrol.props.placeholder"
                                                        :label="econtrol.props.label"
                                                    />
                                                    <v-textarea
                                                    
                                                    v-if="econtrol.type=='textarea'"
                                                    :placeholder="econtrol.props.placeholder"
                                                    :label="econtrol.props.label"
                                                    />
                                                    <dropdown 
                                                    
                                                    v-if="econtrol.type=='select'"
                                                    :label="econtrol.props.label"
                                                    :placeholder="econtrol.props.placeholder"
                                                    :options="econtrol.props.options"
                                                    :keyProp="econtrol.props.optionKey||'id'"
                                                    :valProp="econtrol.props.optionValue||'value'"
                                                    :apiUrl="econtrol.props.apiUrl"
                                                    />
                                                    <v-radio-group v-if="econtrol.type=='radio'" :label="control.props.label">
                                                        <v-radio
                                                            v-for="(option, idx) in econtrol.props.options"
                                                            :key="idx"
                                                            :label="option"
                                                        />
                                                    </v-radio-group>
                                                    <template v-if="econtrol.type=='table'">
                                                   
                                                        <FormDataTable                                             
                                                            :headers="econtrol.props.column||[]"
                                                        />
                                                    </template>
                                                    <v-btn v-if="econtrol.type=='submit'">{{econtrol.props.label}}</v-btn>
                                            </v-col>
                                           </v-row> 
                                        </v-expansion-panel-text>

                                    </v-expansion-panel>
                                  
                                </v-expansion-panels>
                                <template v-if="control.type=='text'">
                                    <v-text-field
                                        :placeholder="control.props.placeholder"
                                        :label="control.props.label"
                                    />
                                </template>
                                <template v-if="control.type=='textarea'">
                                    <v-textarea
                                      :placeholder="control.props.placeholder"
                                      :label="control.props.label"
                                    />
                                </template>
                                <template v-if="control.type=='select'">
                                    <dropdown 
                                        :label="control.props.label"
                                        :placeholder="control.props.placeholder"
                                        :options="control.props.options"
                                        :keyProp="control.props.optionKey||'id'"
                                        :valProp="control.props.optionValue||'value'"
                                        :apiUrl="control.props.apiUrl"

                                    />
                                    <!-- <v-select
                                      
                                        :items="control.props.options"
                                        :label="control.props.label"
                                        :placeholder="control.props.placeholder"
                                    /> -->
                                </template>
                                <template v-if="control.type=='radio'">
                                    <v-radio-group  :label="control.props.label">
                                        <v-radio
                                            v-for="(option, idx) in control.props.options"
                                            :key="idx"
                                            :label="option"
                                        />
                                    </v-radio-group>
                                    
                                </template>
                                <template v-if="control.type=='checkbox'">
                                    <v-checkbox   :label="control.props.label"/>
                                </template>
                                 <template v-if="control.type=='submit'">
                                    <v-btn>{{control.props.label}}</v-btn>
                                </template>
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
        console.log("RES",res)

        const formStructureData = JSON.parse(res.data.templateJson)

        const uniqueTabs = [...new Set(formStructureData.map(item => item.tab))];

        formTabStore.updateTabList(uniqueTabs)


        formControlStore.updateControlList(formStructureData)
      }
    });
const activeTab = ref('')
//const selectedAccordion = ref('')
</script>
