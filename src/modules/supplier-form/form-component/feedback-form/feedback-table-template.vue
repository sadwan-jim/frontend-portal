<template>
  <v-expansion-panels flat>
    <v-expansion-panel
      style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);"
    >
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
          <v-col cols="11">
            <span class="font-weight-medium">{{ sectionTitle }}</span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-row dense>
          <!-- 🟩 Table area -->
          <v-col cols="6" class="mb-4">
            <FormDataTable
              :headers="headers"
              :tableItems="localModel.tableData || []"
              @save="onTableSave"
            />
          </v-col>

          <!-- 🟩 Checkbox -->
          <v-col cols="2" class="mb-6">
            <v-checkbox
              v-model="localModel.ok"
              label="Ok"
              @change="emitModel"
            />
          </v-col>

          <!-- 🟩 Feedback -->
          <v-col cols="4">
            <v-text-field
              v-if="!localModel.ok"
              v-model="localModel.feedback"
              label="Feedback"
              placeholder="Feedback"
              outlined
              dense
              @input="emitModel"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn @click="emitModel">NEXT</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue'
import FormDataTable from '@/components/controls/form-data-table.vue'

const props = defineProps({
  sectionTitle: String,
  headers: Array,
  modelValue: {
    type: Object,
    default: () => ({
      tableData: [],
      ok: false,
      feedback: ''
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const localModel = reactive({
  ...props.modelValue,
  tableData: props.modelValue.tableData ?? [],
  ok: props.modelValue.ok ?? false,
  feedback: props.modelValue.feedback ?? ''
})

// Watch parent for external changes (deep reactive sync)
watch(
  () => props.modelValue,
  (newVal) => Object.assign(localModel, newVal),
  { deep: true }
)

function emitModel() {
  emit('update:modelValue', { ...localModel })
}

function onTableSave(payload) {
  localModel.tableData = payload
  emitModel()
}
</script>
