 <template>
  <v-expansion-panels flat>
    <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
         
          <v-col cols="11" class="d-flex align-center justify-space-between">
            <span class="font-weight-medium">{{ sectionTitle }}</span>
          
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
      
        <v-row dense>
          <v-col
            v-for="(field, index) in controls"
            :key="index"
            cols="4"
            class="mb-4"
          >
            <v-text-field
              v-if="field.type=='textbox'"
              :placeholder="field.label"
              :label="field.label"
              outlined
              dense
              v-model="field.value"
              :rules="field.required ? [required(field.value, field.label)] : []"
               class="flex-grow-1"
            />
            <dropdown
               v-if="field.type=='dropdown'"
              :placeholder="field.label"
              :label="field.label"
              :options="field.option"
              v-model="field.value"
              :rules="field.required ? [required(field.value, field.label)] : []"
               class="flex-grow-1"
            />
                    
             
          </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn>
                    Save
                </v-btn>
            </v-col>
        </v-row>

    
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, computed } from 'vue';
import { required } from '@/validators/validators';
import { useStringCase } from '../../../composable/useStringCase.js';

const props = defineProps({
  sectionTitle: { type: String, required: true },
  controls: { type: Array, required: true }
})

const { toCamelCase } = useStringCase();

const emit = defineEmits(['emitConfig'])

const basicInfo = ref({
  groupName: '',
  exportBusinessUnitName: '',
  exportBusinessUnitAddress: '',
  corporateOfficeAddress:'',
  website:''
});

// Convert your existing fields into dynamic fields
const dynamicFields = ref([
  { label: 'Group Name', value: basicInfo.value.groupName, required: false },
  { label: 'Export Business Unit Name', value: basicInfo.value.exportBusinessUnitName, required: true },
  { label: 'Export Business Unit Address', value: basicInfo.value.exportBusinessUnitAddress, required: true },
  { label: 'Corporate Office Address', value: basicInfo.value.corporateOfficeAddress, required: true },
  { label: 'Website', value: basicInfo.value.website, required: false }
]);



const dynamicFieldsData = computed(() => {
  const data = {};
  dynamicFields.value.forEach(f => {
    data[f.label] = f.value;
  });
  return data;
});



const dynamicFieldsConfig = computed(() => {
  return  dynamicFields.value.map(x=>{
    return { ...x, type:'textbox',key:toCamelCase(x.label)}
  });
});




const sendConfig = () => {
  emit('emitConfig', dynamicFieldsConfig.value);
};

defineExpose({
  sendConfig
});

</script>
