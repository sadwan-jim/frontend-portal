 <template>
  <v-expansion-panels flat>
    <v-expansion-panel
      style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);"
    >
      <!-- Editable Section Title -->
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
          <v-col cols="11" class="d-flex align-center justify-space-between">
            <div v-if="!editingTitle" class="d-flex align-center justify-space-between" style="width:100%;">
              <span class="font-weight-medium">{{ localTitle }}</span>
              <v-icon small color="primary" @click="editingTitle = true">mdi-pencil</v-icon>
            </div>
            <div v-else style="width:100%;">
              <v-text-field
                v-model="localTitle"
                dense
                variant="outlined"
                hide-details
                @blur="editingTitle = false"
                @keyup.enter="editingTitle = false"
              />
            </div>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <!-- Panel Body -->
      <v-expansion-panel-text>
        <v-card flat class="pa-3">
          <!-- Editable Columns Table -->
          <v-data-table
            :headers="columnHeaders"
            :items="editableHeaders"
            class="elevation-1"
          >
            <template #top>
              <v-toolbar flat>
                <v-toolbar-title class="font-weight-medium">Editable Table Columns</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="flat" @click="addColumn">
                  <v-icon start>mdi-plus</v-icon>Add Column
                </v-btn>
              </v-toolbar>
            </template>

            <!-- Column Title -->
            <template #item.title="{ item }">
              <v-text-field
                v-model="item.tempTitle"
                variant="outlined"
                density="compact"
                hide-details
                @input="syncTitleAndKey(item)"
              />
            </template>

            <!-- Column Key -->
            <template #item.key="{ item }">
              <v-text-field
                v-model="item.key"
                variant="outlined"
                density="compact"
                hide-details
                readonly
              />
            </template>

            <!-- Column Type -->
            <template #item.type="{ item }">
              <v-select
                v-model="item.type"
                :items="['text', 'dropdown']"
                dense
                hide-details
                variant="outlined"
              />
            </template>

            <!-- Column Options -->
 <template #item.options="{ item }">
  <v-text-field
    v-model="item.optionsText"
    :disabled="item.type !== 'dropdown'"
    dense
    hide-details
    variant="outlined"
    placeholder="A,B,C"
    @input="onOptionsInput(item)"
  />
</template>


            <!-- Required Checkbox -->
            <template #item.required="{ item }">
              <v-checkbox
                v-model="item.required"
                hide-details
                dense
              />
            </template>

            <!-- Actions -->
            <template #item.actions="{ index }">
              <v-btn icon color="red" size="x-small" @click="removeColumn(index)">
                <v-icon size="16">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>

          <v-divider class="my-4" />

          <!-- Form Table -->
          <FormDataTable :headers="editableHeaders" @save="onTableSave" />
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, watch } from 'vue'
import FormDataTable from '@/components/controls/form-data-table.vue'

// Props
const props = defineProps({
  title: { type: String, required: true },
  headers: { type: Array, required: true }
})

const emit = defineEmits(['emitTableData'])

// Editable Section Title
const localTitle = ref(props.title)
const editingTitle = ref(false)
watch(() => props.title, (newTitle) => { localTitle.value = newTitle })

// Editable Table Columns
const editableHeaders = ref(
  props.headers.map(h => ({ ...h, tempTitle: h.title, type: h.type || 'text', options: h.options || '', required: !!h.required }))
)

// Column headers
const columnHeaders = [
  { title: 'Column Title', key: 'title' },
  { title: 'Column Key', key: 'key' },
  { title: 'Type', key: 'type' },
  { title: 'Options', key: 'options' },
  { title: 'Required', key: 'required', align: 'center' },
  { title: 'Actions', key: 'actions', align: 'center', sortable: false }
]

// Add Column
const addColumn = () => {
  editableHeaders.value.push({
    title: 'New Column',
    tempTitle: 'New Column',
    key: toCamelCase('New Column'),
    type: 'text',
    options: '',
    required: false
  })
}

// Remove Column
const removeColumn = (index) => editableHeaders.value.splice(index, 1)

// Sync Title → Key
const syncTitleAndKey = (item) => {
  item.title = item.tempTitle
  item.key = toCamelCase(item.tempTitle)
}

// Initialize a string version of options
 
editableHeaders.value.forEach(item => {
  if (item.type === 'dropdown' && Array.isArray(item.options)) {
    item.optionsText = item.options.join(', ')
  }
})

 
// Update array when text changes
const onOptionsInput = (item) => {
  if (item.type === 'dropdown') {
    item.options = item.optionsText.split(',').map(s => s.trim())
  }
}

// CamelCase helper
const toCamelCase = str =>
  str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1))
    .join('')

// Save Table
const onTableSave = payload => emit('emitTableData', payload)
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style>
