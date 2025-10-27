 <template>
  <div class="mt-4">
    <v-row>
      <v-col cols="6">
        <dropdown
          :label="'Form Template'"
          :placeholder="'Form Template'"
          :options="[]"
          :keyProp="'name'"
          :valProp="'id'"
          :apiUrl="'/api/FormTemplates'"
          v-model="form.formTemplateId"
          @update:modelValue="(value) => handleChange(value, 'formTemplateId')"
          :rules="[required(form.formTemplateId, 'Template')]"
        />
      </v-col>
      <v-col>
        <v-btn
            color="primary"
            class="mt-2 text-white"
            @click.stop="onDeleteTemplate"
        >
            Delete Template
        </v-btn>

      </v-col>

    </v-row>

    <!-- <v-row>
      <v-col>
        <v-btn color="primary" @click="submitForm">
          Submit
        </v-btn>
      </v-col>
    </v-row> -->

    <v-divider style="margin-top: 10px;"/>
    
    <FormPreview v-if="form.formTemplateId!=null" :key="form.formTemplateId"/>

     <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item? This action cannot be undone.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </div>
</template>
     
<script setup>
import { ref, onMounted,computed ,nextTick } from 'vue'; 
import { useRouter } from 'vue-router';
import { useFormControlStore } from '@/store/form-builder/form-control.store.js';
import { useFormTabStore } from '@/store/form-builder/form-tab.store.js';
import { useSupplierContactStore } from '@/store/supplier-contact/supplier-contact';
import { required } from '@/validators/validators';
import dropdown from '@/components/controls/dropdown.vue';
import FormPreview from '@/modules/form-builder/form-preview.vue'
import axios from '@/plugins/axios';
const supplierContactStore = useSupplierContactStore();



const router = useRouter(); 


const dialog = ref(false)

const form = ref({

  formTemplateId:null,

});

const formControlStore = useFormControlStore()

const formTabStore =  useFormTabStore()

function handleChange(payload,name){
  console.log(payload,":::::payload")

   const formStructureData = JSON.parse(payload.templateJson)
   const uniqueTabs = [...new Set(formStructureData.map(item => item.tab))];
   formTabStore.updateTabList(uniqueTabs)
   formControlStore.updateControlList(formStructureData)

  form.value[name] = payload.id;

  
}

function onDeleteTemplate(){

    if(form.value.formTemplateId!=null){
        dialog.value=true
    }

}

function confirmDelete() {
 
  console.log('Item deleted')
  dialog.value = false
}




onMounted(() => {
});




</script>