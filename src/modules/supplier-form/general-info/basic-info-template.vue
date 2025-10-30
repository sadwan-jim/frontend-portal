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
            <v-icon small color="primary" @click="editTitle">mdi-pencil</v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <!-- Dynamic Fields -->
        <v-row dense>
          <v-col
            v-for="(field, index) in dynamicFields"
            :key="index"
            cols="4"
            class="mb-4"
          >
            <v-text-field
              :placeholder="field.label"
              :label="field.label"
              outlined
              dense
              v-model="field.value"
              :rules="field.required ? [required(field.value, field.label)] : []"
               class="flex-grow-1"
            />
                        <v-btn small color="red" class="ml-2 mt-1" @click="removeField(index)">
              <v-icon size="16">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
       

        <!-- Add New Field -->
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="newFieldLabel"
              placeholder="New Field Label"
              label="New Field Label"
              outlined
              dense
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              v-model="newFieldRequired"
              label="Required"
            />
          </v-col>
          <v-col cols="4" class="d-flex align-center">
            <v-btn color="primary" @click="addField">Add Field</v-btn>
          </v-col>
        </v-row>

        <hr>
        <h4>Form Data:</h4>
        <pre>{{ dynamicFieldsData }}</pre>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, computed } from 'vue';
import { required } from '@/validators/validators';
import { useStringCase } from '../../../composable/useStringCase.js';
const sectionTitle = ref('Basic Info');

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

const newFieldLabel = ref('');
const newFieldRequired = ref(false);

// Computed object to extract current form data
const dynamicFieldsData = computed(() => {
  const data = {};
  dynamicFields.value.forEach(f => {
    data[f.label] = f.value;
  });
  return data;
});
const editTitle = () => {
  const newTitle = prompt('Enter new section title', sectionTitle.value);
  if (newTitle) sectionTitle.value = newTitle;
};
// Add a new field dynamically
const addField = () => {
  if (!newFieldLabel.value) {
    alert('Field label is required!');
    return;
  }
  dynamicFields.value.push({
    label: newFieldLabel.value,
    value: '',
    required: newFieldRequired.value,
  
  });
  newFieldLabel.value = '';
  newFieldRequired.value = false;
};

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

// Remove a field dynamically
const removeField = (index) => {
  dynamicFields.value.splice(index, 1);
};
</script>
