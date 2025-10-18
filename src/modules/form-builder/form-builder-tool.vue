<template>
  <v-row>
    <v-col>
        <VTextField
            v-model="tabName"
            label="Tab Name"
        />
    </v-col>
    <v-col cols="6">
        <v-btn @click="addTab" density="compact" icon="mdi-plus" style="margin-top: 5px;">+</v-btn>
    </v-col>  
  
  </v-row>
  <v-row style="gap:10px;padding: 12px;">
    <v-chip v-for="item in controls" @click="onControlClick(item)">{{item.type}}</v-chip>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['add-tab','add-control']);



const tabName = ref("");
const activeTab = ref("");



const controls = [
  { tab: '', type: 'accordion', title: 'accordion', icon: 'T', defaults: { label: 'Accordion', name: 'accordion', placeholder: 'accordion' } },
  { tab: '', type: 'text', title: 'Text Input', icon: 'T', defaults: { label: 'Text', name: 'text', placeholder: 'Enter text' } },
  { tab: '', type: 'textarea', title: 'Textarea', icon: '✎', defaults: { label: 'Description', name: 'desc', placeholder: 'Enter long text' } },
  { tab: '', type: 'select', title: 'Select', icon: '▾', defaults: { label: 'Choose', name: 'select', options: ['Option 1', 'Option 2'],optionKey:'',optionValue:'',apiUrl:'' } },
  { tab: '', type: 'radio', title: 'Radio', icon: '◉', defaults: { label: 'Pick one', name: 'radio', options: ['A', 'B'] } },
  { tab: '', type: 'checkbox', title: 'Checkbox', icon: '☑', defaults: { label: 'Check me', name: 'check' } },
  { tab: '', type: 'table', title: 'Table', icon: '☑', defaults: { label: 'Table', name: 'table' , column:[ ] , columnNumber:1 } },
  { tab: '', type: 'submit', title: 'Submit', icon: '➤', defaults: { label: 'Submit', name: 'submit' } }
];





function addTab() {
  if (tabName.value.trim() !== "") {
    emit('add-tab', tabName.value.trim())
  } else {
    alert("TAB NAME REQUIRED");
  }
}
function  uid() 
{ 
    return 'id_' + Math.random().toString(36).slice(2, 9); 
}

function onControlClick(ctrl){
    const copy = JSON.parse(JSON.stringify(ctrl.defaults));
  if (copy.options) copy.optionsStr = copy.options.join(',');

  emit('add-control',{ id: uid(), type: ctrl.type, props: copy, tab: activeTab.value })
}

function updateOptions(item) {
  item.props.options = item.props.optionsStr.split(',').map(s => s.trim());
}


</script>

