<template>
  <v-select
    v-model="internalValue"
    :items="items"
    :item-title="keyProp"
    :item-value="valProp"
    :label="label"
    :loading="loading"
    :return-object="returnObject"
    @update:model-value="$emit('update:modelValue', internalValue)"
  />
</template>

<script setup>
import axios from '../../plugins/axios';
import { onMounted, ref, watch } from 'vue'


const props = defineProps({
  modelValue: [String, Number, Object, Array, null],

  options: {
    type: Array,
    default: () => []
  },
  apiUrl: {
    type: String,
    default: ''
  },

  keyProp: {
    type: String,
    default: 'name'
  },
  valProp: {
    type: String,
    default: 'id'
  },
  label: {
    type: String,
    default: 'Select an option'
  },
  returnObject: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:modelValue'])

const internalValue = ref(null)
const items = ref([])
const loading = ref(false)

const fetchItemsFromApi = async () => {
  if (!props.apiUrl) return
  loading.value = true
  try {
    const response = await axios.get(props.apiUrl)
    items.value = response.data
  } catch (error) {
    console.error('API fetch failed:', error)
  } finally {
    loading.value = false
  }
}

const initializeItems = () => {
  if (props.apiUrl && props.apiUrl!='') {
    fetchItemsFromApi()
  }
  else if (props.options.length) {
    items.value = props.options
  }
   else {
    items.value = []
  }
}

// Watch for changes
onMounted(initializeItems)
watch(
  () => props,
  () => {
    initializeItems()
  },
  { immediate: true, deep: true }
)
watch(() => props.options, initializeItems)
watch(() => props.modelValue, (val) => {
  internalValue.value = val
}, { immediate: true })
</script>
