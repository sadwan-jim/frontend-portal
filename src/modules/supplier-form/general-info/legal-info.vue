 <template>
  <v-expansion-panels flat>
    <v-expansion-panel
      style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);"
    >
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info">mdi-office-building</v-icon>
          </v-col>
           <v-col cols="11" class="d-flex align-center justify-space-between">
            <span class="font-weight-medium">{{ sectionTitle }}</span>
            <v-icon small color="primary" @click="editTitle">mdi-pencil</v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-row dense>
          <!-- Dropdowns (unchanged) -->
          <v-col cols="4" class="mb-4">
            <dropdown
              label="Legal Entity of the Company"
              placeholder="Legal Entity of the Company"
              :options="['Partnership','Sole Proprietorship','Private Limited Company','Public Limited Company']"
              v-model="legalInfo.legalEntity"
            />
          </v-col>

          <v-col cols="4" class="mb-4">
            <dropdown
              label="Country of Incorporation"
              placeholder="Country of Incorporation"
              :options="['China','Afghanistan','Iraq','Canada']"
              v-model="legalInfo.countryOfIncorporation"
            />
          </v-col>

          <v-col cols="4" class="mb-4">
            <dropdown
              label="Geographical Location (City, Country)"
              placeholder="Geographical Location (City, Country)"
              :options="['Toronto','Kabul','Baghdad','Shanghai']"
              v-model="legalInfo.geographicalLocation"
            />
          </v-col>

          <!-- All Text Fields (removable) -->
          <v-col
            v-for="(field, index) in allFields"
            :key="field.id"
            cols="4"
            class="mb-4 d-flex align-center"
          >
            <v-text-field
              :label="field.label"
              :placeholder="field.label"
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

        <!-- Add New Text Field -->
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
        <pre>{{ formData }}</pre>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, computed } from 'vue';
import { required } from '@/validators/validators';
import dropdown from '@/components/controls/dropdown.vue';

const sectionTitle = ref('Legal Info');

const legalInfo = ref({
  legalEntity: null,
  countryOfIncorporation: null,
  geographicalLocation: null
});

// Initial fields (now removable)
const initialFields = [
  { label: 'Registered Address', value: '', required: true },
  { label: 'TIN Or GSTN Number', value: '', required: true },
  { label: 'Trade License Number', value: '', required: true },
  { label: 'BIN Number', value: '', required: true }
];

// Dynamic fields added by user
const dynamicFields = ref([]);

// New field inputs
const newFieldLabel = ref('');
const newFieldRequired = ref(false);

// Merge static and dynamic fields for rendering
const allFields = computed(() => [...initialFields, ...dynamicFields.value]);

const editTitle = () => {
  const newTitle = prompt('Enter new section title', sectionTitle.value);
  if (newTitle) sectionTitle.value = newTitle;
};
// Add new text field
const addField = () => {
  if (!newFieldLabel.value) return alert('Field label is required!');
  dynamicFields.value.push({
    label: newFieldLabel.value,
    value: '',
    required: newFieldRequired.value
  });
  newFieldLabel.value = '';
  newFieldRequired.value = false;
};

// Remove a field by index
const removeField = (index) => {
  if (index < initialFields.length) {
    // Remove from initialFields
    initialFields.splice(index, 1);
  } else {
    // Remove from dynamicFields
    dynamicFields.value.splice(index - initialFields.length, 1);
  }
};

// Form data for preview
const formData = computed(() => {
  const data = {};
  allFields.value.forEach(f => (data[f.label] = f.value));
  data['Legal Entity'] = legalInfo.value.legalEntity;
  data['Country'] = legalInfo.value.countryOfIncorporation;
  data['Location'] = legalInfo.value.geographicalLocation;
  return data;
});
</script>
