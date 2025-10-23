<template>
  <v-snackbar
    v-model="visible"
    :color="colorMap[type]"
    timeout="1000"
    location="bottom right"
    rounded="pill"
    elevation="4"
  >
    <div class="d-flex align-center">
      <v-icon class="mr-2" color="white">{{ iconMap[type] }}</v-icon>
      <span class="font-weight-medium">{{ message }}</span>
    </div>

    <template #actions>
      <v-btn variant="text" class="text-white" @click="visible = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

// State
const visible = ref(false)
const message = ref('')
const type = ref('success') // success, error, warning, info

// Icon & color mappings
const iconMap = {
  success: 'mdi-check-circle',
  error: 'mdi-alert-circle',
  warning: 'mdi-alert',
  info: 'mdi-information'
}

const colorMap = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info'
}

// Expose public method
function show(msg = 'Operation completed!', msgType = 'success') {
  message.value = msg
  type.value = msgType
  visible.value = true
}

defineExpose({ show })
</script>

<style scoped>
.v-snackbar {
  min-width: 280px;
  font-size: 0.95rem;
}

.v-btn {
  font-weight: 500;
  text-transform: uppercase;
}
</style>
