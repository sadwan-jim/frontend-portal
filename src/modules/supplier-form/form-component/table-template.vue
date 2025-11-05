<template>
  <v-expansion-panels flat>
    <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
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
          <v-col cols="12" class="mb-4">
            <FormDataTable :headers="headers" :tableItems="tableData || []"  @save="onTableSave"/>
          </v-col>
        </v-row>
          <v-row>
            <v-col>
                <v-btn>
                    NEXT
                </v-btn>
            </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { defineProps } from 'vue';
import FormDataTable from '@/components/controls/form-data-table.vue';


const props = defineProps({
  sectionTitle: {
    type: String,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
    tableData: {
    type: Array,
    required: true
  },
    modelValue: {
    type: [Array, Object, []],
    default: []
  }
});

const emit = defineEmits(['emitTableData'])

function onTableSave(payload)
{   emit('update:modelValue', payload) 
    // emit('emitTableData', payload);
}

</script>

<style scoped>

</style>