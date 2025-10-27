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

    </v-row>

    <!-- <v-row>
      <v-col>
        <v-btn color="primary" @click="submitForm">
          Submit
        </v-btn>
      </v-col>
    </v-row> -->

    <v-divider style="margin-top: 10px;"/>
    
    <FormPreview v-if="form.formTemplateId!=null"/>
  </div>
</template>
     
<script setup>
import { ref, onMounted,computed } from 'vue'; 
import { useRouter } from 'vue-router';
import { useFormControlStore } from '@/store/form-builder/form-control.store.js';
import { useSupplierContactStore } from '@/store/supplier-contact/supplier-contact';
import { required } from '@/validators/validators';
import dropdown from '@/components/controls/dropdown.vue';
import FormPreview from '@/modules/form-builder/form-preview.vue'
import axios from '@/plugins/axios';
const supplierContactStore = useSupplierContactStore();



const router = useRouter(); 




const form = ref({

  formTemplateId:null,

});

const formControlStore = useFormControlStore()



function handleChange(payload,name){
  console.log(payload,":::::payload")

  formControlStore.updateControlList(JSON.parse(payload.templateJson))

  form.value[name] = payload.id;
}




onMounted(() => {
});




</script>