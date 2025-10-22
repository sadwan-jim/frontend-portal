
<template>
  <div>
    <VRow>
        <VCol cols="12">
            <VCard title="Tool Box">
            <VCardText>
                <FormBuilderTool @add-tab="onAddTab" @add-control="onAddControl"/>
            </VCardText>
            </VCard>
        </VCol>
   
        
    </VRow>
    <v-row>
        <v-col cols="4">
            <v-text-field  
                :placeholder="'Enter Template Name'"
                :label="'Template Name'"
                v-model="templateName"
                :rules="[required(templateName, 'Template Name')]"
            />
            <!-- <dropdown
                class="mt-4"
                :label="'Application'"
                :placeholder="'Application'"
                :options="[]"
                :keyProp="'name'"
                :valProp="'id'"
                :apiUrl="'/api/Applications'"
                v-model="applicationId"
                :rules="[required(applicationId, 'Application')]"
            /> -->
        </v-col>
        <v-col cols="3">
            <!-- <VBtn
                color="primary"
                class="mt-4"
                :to="{ path: '/form-preview' }"
            >
                Go to Form Preview
            </VBtn> -->
            <VBtn
                style="color: whitesmoke !important;"
                color="primary"
                class="mt-4"
                href="/form-preview"
                target="_blank"
                rel="noopener"
            >
                Go to Form Preview
            </VBtn>
          
        </v-col>
        <v-col cols="3">
            <VBtn
              color="primary"
              class="mt-4"
              style="color: whitesmoke !important;"
              :disabled="!isValid"
              @click.prevent = "onTemplateSave"
            >
                Save Template
            </VBtn>
        </v-col> 
    </v-row> 
    {{ controlsList }}   
    <VRow>
      <VCol
        cols="12"
        md="8"
      >
       
        <VCard title="Form Preview">
          <VCardText>
            <VTabs
                v-model="activeTab"
                show-arrows
                class="v-tabs-pill"
            >
                <VTab
                    v-for="(item,index) in tabs"
                    :key="index"
                    :value="item"
                    @click.prevent="onTabClick()"
                >
                  {{ item }}
                </VTab>
            </VTabs>
             <!-- {{ controlsList.filter(x=>x.tab==activeTab && x.accordionID==selectedAccordion)  }} -->
            <v-window
                v-model="activeTab"
                class="mt-5 disable-tab-transition"
                :touch="false"
            >
                <v-window-item v-for="(item,index) in tabs" :value="item">
                    <v-row>
                        <v-col @click.prevent="onControlClick(control)" cols="12" v-for="control in controlsList.filter(x=>x.tab==item && x.accordionID=='')">
                             
                                <v-expansion-panels  v-if="control.type=='accordion'">
                                    <v-expansion-panel>
                                        <v-expansion-panel-title>
                                            {{ control.props.label || 'Title' }}
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text>
                                          <v-col  cols="12" v-for="econtrol in controlsList.filter(x=>x.tab==item && x.accordionID==control.id)">
                                                <v-text-field
                                                    @click.stop="onControlClick(econtrol)"
                                                    v-if="econtrol.type=='text'"
                                                    :placeholder="econtrol.props.placeholder"
                                                    :label="econtrol.props.label"
                                                />
                                                <v-textarea
                                                  @click.stop="onControlClick(econtrol)"
                                                  v-if="econtrol.type=='textarea'"
                                                  :placeholder="econtrol.props.placeholder"
                                                  :label="econtrol.props.label"
                                                />
                                                <dropdown 
                                                  @click.stop="onControlClick(econtrol)"
                                                  v-if="econtrol.type=='select'"
                                                  :label="econtrol.props.label"
                                                  :placeholder="econtrol.props.placeholder"
                                                  :options="econtrol.props.options"
                                                  :keyProp="econtrol.props.optionKey||'id'"
                                                  :valProp="econtrol.props.optionValue||'value'"
                                                  :apiUrl="econtrol.props.apiUrl"
                                                />
                                                <v-radio-group @click.stop="onControlClick(econtrol)" v-if="econtrol.type=='radio'" :label="control.props.label">
                                                    <v-radio
                                                        v-for="(option, idx) in econtrol.props.options"
                                                        :key="idx"
                                                        :label="option"
                                                    />
                                                </v-radio-group>
                                                <v-btn v-if="econtrol.type=='submit'">{{econtrol.props.label}}</v-btn>
                                                <template v-if="econtrol.type=='table'">
                                                    <!-- <v-data-table
                                                        @click.stop="onControlClick(econtrol)"
                                                        :headers="econtrol.props.column"
                                                        :items="[]"
                                                        >
                                                    </v-data-table> -->
                                                    <FormDataTable
                                                        @click="onControlClick(econtrol)"                                                   
                                                        :headers="econtrol.props.column||[]"
                                                    />
                                                </template>
                                          </v-col>
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
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
   
        <VCard title="Control property">
          <VCardText>
            <v-row v-if="selectedControl">
                <template v-if="selectedControl.type=='table'">
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <!-- <v-text-field  
                                    :placeholder="'Edit Column Number'"
                                    :label="'Column Number'"
                                    v-model="selectedControl.props.columnNumber"    
                                /> -->
                                <v-row>

                                    <dropdown 
                                        :label="'Column Type'"
                                        :placeholder="'Chose column Type'"
                                        :options="['dropdown','textbox']"
                                        :keyProp="'id'"
                                        :valProp="'value'"
                                        :apiUrl="''"
                                        v-model="formColumnType"
                                    />
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-btn
                                    class="me-2"
                                    style="margin-bottom: -10px;"
                                    rounded="lg"
                                    text="+"
                                    border
                                    @click.stop="onAddTableCol(selectedControl)"
                                    :disabled="!allowFormTableColumn"
                                />
                            </v-col>
                            
                       
                        </v-row>

                    </v-col>
                   {{ selectedControl.props.column }}
                    <v-col>
                        <!-- v-for="n in parseInt(selectedControl.props.columnNumber)||0" -->
                        <template v-for="(item,index) in selectedControl.props.column"> 
                        <v-row >
                            <v-col cols="12">
                                <v-text-field  
                                    :placeholder="'Edit Column name'"
                                    :label="'Column Name'" 
                                    density="compact"
                                    :model-value="item.title"
                                    @update:model-value="(val) => tempValues[index] = val" 
                                    @blur="() => onColPropChange(index, 'title', tempValues[index])"
                                />
                            </v-col>
                            <v-col  cols="12" v-if="item.type=='dropdown'">
                                <v-text-field  
                                    :placeholder="'Enter comma separated options'"
                                    :label="'Options'"
                                     density="compact"
                                    :model-value="item.option"
                                    @update:model-value="(val) => tempValues[index] = val" 
                                    @blur="() => onColPropChange(index, 'option', tempValues[index])"
                                />
                            </v-col>
                            <!-- <v-col cols="12" v-if="formColumnType=='dropdown'">
                                <v-text-field  
                                    :placeholder="'Edit Column name'"
                                    :label="'Column Name'" 
                                    density="compact"
                                    :model-value="item.title"
                                    @update:model-value="(val) => tempValues[index] = val" 
                                    @blur="() => onColPropChange(index, 'title', tempValues[index])"
                                />
                            </v-col> -->
                            <!-- <v-col cols="6">
                                <v-text-field  
                                    :placeholder="'Edit Column Key'"
                                    :label="'Column Key'" 
                                    density="compact"
                                    @update:model-value="(val) => tempValues[n] = val" 
                                    @blur="() => onColPropChange(n, 'key', tempValues[n])"
                                />
                            </v-col> -->
                        </v-row>
                            <v-divider style="margin-top: 10px;margin-bottom: 10px;"/>
                        </template>
                    </v-col>
                    
                </template>
                <template v-else>
                    
                <v-col   cols="12">
                    <v-text-field  
                        :placeholder="'Edit Label'"
                        :label="'Label'"
                        v-model="selectedControl.props.label"
                    />
                </v-col>
                <v-col cols="12" v-if="selectedControl.props.placeholder">
                    <v-text-field  
                        :placeholder="'Edit placeholder'"
                        :label="'Placeholder'"
                        v-model="selectedControl.props.placeholder"
                    />
                </v-col>
                <v-col  cols="12" v-if="selectedControl.props.optionsStr">
                    <v-text-field  
                        :placeholder="'Edit option'"
                        :label="'Options'"
                        v-model="selectedControl.props.optionsStr"
                        @input="updateOptions(selectedControl)"
                    />
                </v-col>
                <v-col  cols="12" v-if="selectedControl.props.optionKey || selectedControl.props.optionKey==''">
                    <v-text-field  
                        :placeholder="'Edit option Key'"
                        :label="'Option Key'"
                        v-model="selectedControl.props.optionKey"
                        
                    />
                </v-col>
                <v-col  cols="12" v-if="selectedControl.props.optionValue || selectedControl.props.optionValue==''">
                    <v-text-field  
                        :placeholder="'Edit option Value'"
                        :label="'Option Value'"
                        v-model="selectedControl.props.optionValue"
                        
                    />
                </v-col>
                 <v-col  cols="12" v-if="selectedControl.props.apiUrl || selectedControl.props.apiUrl==''">
                    <v-text-field  
                        :placeholder="'Edit API'"
                        :label="'API url'"
                        v-model="selectedControl.props.apiUrl"
                        
                    />
                </v-col>
                </template>
     
              
            </v-row>
          </VCardText>
        </VCard>
      </VCol>
    
    
   
    </VRow>
  </div>
</template>

<script setup>
import dropdown from '@/components/controls/dropdown.vue';
import FormDataTable from '@/components/controls/form-data-table.vue';
import { useFormControlStore } from '@/store/form-builder/form-control.store';
import { useFormTabStore } from '@/store/form-builder/form-tab.store';
import { useFormTemplateStore } from '@/store/form-builder/form-template.store';
import { required } from '@/validators/validators';
import { computed, ref, watch } from 'vue';
import FormBuilderTool from './form-builder-tool.vue';
const formControlStore = useFormControlStore()

const formTemplateStore = useFormTemplateStore()

const formTabStore = useFormTabStore()
const activeTab = ref("");
const tempValues = ref([])
// const applicationId = ref( null );
const templateName = ref('');
const formColumnType = ref( null ); 
const controlsList = ref([]);
const tabs = ref([]);
const selectedId = ref("");

const selectedAccordion = ref("");
function onAddTableCol(){
    if(formColumnType.value && formColumnType.value!=null){
        const controlID = selectedControl.value.id;
        let control = controlsList.value.find(x=>x.id==controlID);
        control.props.column.push( { title:'' , key: '' , type:formColumnType.value })
        formColumnType.value =null;


        controlsList.value = controlsList.value.map(x=>{
            if(x.id==controlID){
                return { ...control}
            }
            return { ...x}
        })
    }

}

function onColPropChange(n,type,val){
    debugger;
    const controlID = selectedControl.value.id;
    let control = controlsList.value.find(x=>x.id==controlID);
    
    console.log(n,type,val,"::::n,type,val",selectedControl)

    const snakecaseVal = val.trim().toLowerCase().replace(/\s+/g, '_');
    
    //val.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase();
    debugger;
     if(n in control.props.column){
        if(type=='title'){
            control.props.column[n].title = val
            control.props.column[n].key = snakecaseVal;  
        }
        if(type=='option'){
            const opt = val.split(",");
            control.props.column[n].option = opt;  
        }
        // if(type=='key'){
        //     control.props.column[n-1].key = val
        // }
     }else{
        if(type=='title'){
            control.props.column.push( { title: val, key: snakecaseVal })
        }
        if(type=='option'){
            
        }
        // if(type=='key'){
        //     control.props.column.push( { title:'' , key: val })
        // }
     }

    controlsList.value = controlsList.value.map(x=>{
        if(x.id==controlID){
            return { ...control}
        }
        return { ...x}
    })
     

}   



// Watch for changes in the `tabs` array and update the store
watch(tabs, (newTabs) => {
  formTabStore.updateTabList(newTabs);
}, { deep: true });

// Watch for changes in the `controlsList` array and update the store
watch(controlsList, (newControls) => {
  formControlStore.updateControlList(newControls);
}, { deep: true });

const allowFormTableColumn = computed(()=>{
    return formColumnType.value !=null;
})

const isValid = computed(()=>{
    // applicationId.value!=null && 
    return  templateName.value!='' && controlsList.value.length>0 && tabs.value.length>0
})

async function onTemplateSave(){
    // console.log(applicationId.value.id,"applicationId.value")
    await formTemplateStore.addTemplateList( { name:templateName.value ,templateJson:JSON.stringify(controlsList.value) })
    
}

//const selectedControl = ref(null);
const selectedControl = computed(() => {
  return controlsList.value.find(i => i.id === selectedId.value) || null;
});
function onAddTab(name) {
    tabs.value.push(name)
    
    if(tabs.value.length==1){
        activeTab.value =name
    } 

    formTabStore.updateTabList(tabs.value);
    
}

function onTabClick(){
    selectedAccordion.value="";
}

function updateOptions(item) { 
    item.props.options = item.props.optionsStr.split(',').map(s => s.trim());
}

function onControlClick(control){
 selectedId.value = control.id
 if(control.type=='accordion'){
    selectedAccordion.value=control.id
 }
}

function onAddControl(item) {
    if(tabs.value.length>0){
        controlsList.value.push({...item,tab:activeTab.value,accordionID:selectedAccordion.value});
        formControlStore.updateControlList(controlsList.value)
        console.log("controlsList",controlsList.value)
    }
    else{
        alert("MUST Add A Tab")
    }
    
}
</script>

