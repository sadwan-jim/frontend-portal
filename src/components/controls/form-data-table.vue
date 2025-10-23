<template>
  <v-sheet border rounded @click.stop="emit('click')">
    <v-data-table
      :headers="[...headers,  { title: 'Actions', key: 'actions', align: 'end', sortable: false }]"
      :hide-default-footer="localItems.length < 11"
      :items="localItems"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
             <v-btn
                class="me-2"
               
                rounded="lg"
                text="+"
                border
                @click="add"
            />
          </v-toolbar-title>

       
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item)"></v-icon>
        </div>
      </template>

      <!-- <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template> -->
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'}`"
      :title="`${isEditing ? 'Edit' : 'Add'}`"
    >
      <template v-slot:text>
      
        <v-row>

          <v-col v-for="item in Object.keys(formModel)" cols="12" md="6">
            <!-- {{getHeaderItem(item)}} -->
            <v-text-field v-if="getHeaderItem(item).type=='textbox'" v-model="formModel[item]" :label="getHeaderItem(item).title"/>
            <dropdown 
                v-if="getHeaderItem(item).type=='dropdown'"
                :label="item"
                :placeholder="`Select ${item}`"
                :options="getHeaderItem(item).option"
                :keyProp="''"
                :valProp="''"
                :apiUrl="''"
                v-model="formModel[item]"
            />
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onMounted, ref, shallowRef, toRef } from 'vue';
import dropdown from '@/components/controls/dropdown.vue';

import { watch } from 'vue';

const localItems = ref([]);




  const props = defineProps({

  headers: {
    type: Array,
    default: () => []
  },
   tableItems: {
    type: Array,
    default: () => []
  },

})
const emit = defineEmits(['click','save'])


watch(() => props.tableItems, (newVal) => {
  localItems.value = [...newVal];
}, { immediate: true });

function getHeaderItem(key){
    if(key!='id'){
        const headerItem = props.headers.find(x => x.key === key);
        if (!headerItem) {
            console.error(`Header with key "${key}" not found!`);
            return { type:'' };
        }
        return headerItem;
    }
    return { type:'' };
    // console.log("HEADER",props.headers.find(x=>x.type == 'dropdown'))
    // return props.headers.find(x=>x.key == key)
}

  function createNewRecord () {
    const record = props.headers.reduce((acc, item) => {
        acc[item.key] = '';
        return acc;
    }, {});

    return record;
  }


  const formModel = ref(createNewRecord())
  const dialog = shallowRef(false)
  const isEditing = toRef(() => !!formModel.value.id)



  onMounted(() => {
    reset()
  })

  function add () {
    formModel.value = createNewRecord()
    dialog.value = true
  }

  function edit (item) {
    const found = localItems.value.find(i => i.id === item.id)
    formModel.value = { ...found}

    // formModel.value = {
    //   id: found.id,
    //   title: found.title,
    //   author: found.author,
    //   genre: found.genre,
    //   year: found.year,
    //   pages: found.pages,
    // }

    dialog.value = true
  }

  function remove (item) {
      const index = localItems.value.findIndex(x => x.id === item.id)
      localItems.value.splice(index, 1)
  }

  function save () {
    if (isEditing.value) {
      const index = localItems.value.findIndex(i => i.id === formModel.value.id)
      localItems.value[index] = formModel.value
    } else {
      formModel.value.id = localItems.value.length + 1
      localItems.value.push(formModel.value)
    }
     emit('save', localItems.value);
    dialog.value = false
  }

  function reset () {
  
 
  }
</script>
