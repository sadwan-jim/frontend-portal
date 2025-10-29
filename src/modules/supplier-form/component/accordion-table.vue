 <template>
  <v-expansion-panels flat>
    <v-expansion-panel
      style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);"
    >
      <!-- Editable Title -->
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

            <!-- Column Title Editable -->
            <template #item.title="{ item }">
              <v-text-field
                v-model="item.tempTitle"
                variant="outlined"
                density="compact"
                hide-details
                @input="syncTitleAndKey(item)"
              />
            </template>

            <!-- Column Key Readonly -->
            <template #item.key="{ item }">
              <v-text-field
                v-model="item.key"
                variant="outlined"
                density="compact"
                hide-details
                readonly
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

// Editable table columns
const editableHeaders = ref(
  props.headers.map((h) => ({ ...h, tempTitle: h.title }))
)

// Column headers
const columnHeaders = [
  { title: 'Column Title', key: 'title' },
  { title: 'Column Key', key: 'key' },
  { title: 'Actions', key: 'actions', align: 'center', sortable: false }
]

// Add new column
const addColumn = () => {
  editableHeaders.value.push({
    title: 'New Column',
    tempTitle: 'New Column',
    key: toCamelCase('New Column')
  })
}

// Remove column
const removeColumn = (index) => editableHeaders.value.splice(index, 1)

// Sync tempTitle → title and update key
const syncTitleAndKey = (item) => {
  item.title = item.tempTitle
  item.key = toCamelCase(item.tempTitle)
}

// Convert to camelCase
const toCamelCase = (str) =>
  str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map((word, idx) => idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

// Save table data
const onTableSave = (payload) => emit('emitTableData', payload)
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style>
