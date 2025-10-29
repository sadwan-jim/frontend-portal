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

          <v-col cols="11" class="d-flex align-center justify-space-between">
            <div v-if="!editingTitle" class="d-flex align-center justify-space-between" style="width: 100%;">
              <span class="font-weight-medium">{{ localTitle }}</span>
              <v-icon small color="primary" @click="editingTitle = true">mdi-pencil</v-icon>
            </div>
            <div v-else style="width: 100%;">
              <v-text-field
                v-model="localTitle"
                dense
                outlined
                hide-details
                @blur="editingTitle = false"
                @keyup.enter="editingTitle = false"
              />
            </div>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-row dense>
          <v-col cols="12" class="mb-4">
            <FormDataTable :headers="headers" @save="onTableSave" />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, watch } from 'vue';
import FormDataTable from '@/components/controls/form-data-table.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  headers: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['emitTableData']);

// Local reactive copy of the title for inline editing
const localTitle = ref(props.title);
const editingTitle = ref(false);

// Watch props.title in case parent updates it
watch(() => props.title, (newTitle) => {
  localTitle.value = newTitle;
});

function onTableSave(payload) {
  emit('emitTableData', payload);
}
</script>

<style scoped>
/* Optional: style adjustments */
</style>
