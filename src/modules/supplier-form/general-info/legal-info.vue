<template>
  <v-expansion-panels flat>
    <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
          <v-col cols="11">
            <span class="font-weight-medium">Legal Info</span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row dense>
          <v-col cols="4" class="mb-4">
            <dropdown
              :label="'Legal Entity of the Company'"
              :placeholder="'Legal Entity of the Company'"
              :options="['Partnership','Sole Proprietorship','Private Limited Company','Public Limited Company']"
              :keyProp="''"
              :valProp="''"
              :apiUrl="''"
              v-model="legalInfo.legalEntity"
              @update:modelValue="(value) => handleChange(value, 'legalEntity')"
              :rules="[required(legalInfo.legalEntity, 'Legal Entity of the Company')]"
            />
         
         
          </v-col>
          <v-col cols="4" class="mb-4">
            <dropdown
              :label="'Country of Incorporation'"
              :placeholder="'Country of Incorporation'"
              :options="['China','Afganistan','Iraq','Canada']"
              :keyProp="''"
              :valProp="''"
              :apiUrl="''"
              v-model="legalInfo.countryOfIncorporation"
              @update:modelValue="(value) => handleChange(value, 'countryOfIncorporation')"
              :rules="[required(legalInfo.countryOfIncorporation, 'Country of Incorporation')]"
            />
         
         
          </v-col>
          <v-col cols="4" class="mb-4">
            <dropdown
              :label="'Geographical Location(City,Country)'"
              :placeholder="'Geographical Location(City,Country)'"
              :options="['Torronto','Kabul','Bagdad','Shanghi']"
              :keyProp="''"
              :valProp="''"
              :apiUrl="''"
              v-model="legalInfo.geographicalLocation"
              @update:modelValue="(value) => handleChange(value, 'geographicalLocation')"
              :rules="[required(legalInfo.geographicalLocation, 'Geographical Location(City,Country)')]"
            />
         
         
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'Registered Address'"
              :label="'Registered Address'"
              outlined
              dense
              v-model="legalInfo.registeredAddress"
              :rules="[required(legalInfo.registeredAddress, 'Registered Address')]"
            />
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'TIN Or GSTN Number'"
              :label="'TIN Or GSTN Number'"
              outlined
              dense
              v-model="legalInfo.TINOrGSTNNumber"
              :rules="[required(legalInfo.TINOrGSTNNumber, 'TIN Or GSTN Number')]"
            />
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'Trade License Number'"
              :label="'Trade License Number'"
              outlined
              dense
              v-model="legalInfo.tradeLicenseNumber"
              :rules="[required(legalInfo.tradeLicenseNumber, 'Trade License Number')]"
            />
          </v-col>
          <v-col cols="4" class="mb-4">
            <v-text-field
              :placeholder="'BIN Number'"
              :label="'BIN Number'"
              outlined
              dense
              v-model="legalInfo.binNumber"
              :rules="[required(legalInfo.binNumber, 'BIN Number')]"
            />
          </v-col>
    
        
        </v-row>
       
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import axios from '@/plugins/axios';
import { ref, onMounted, computed } from 'vue'; 
import dropdown from '@/components/controls/dropdown.vue';
import { required } from '@/validators/validators';


const legalInfo = ref({
  legalEntity: null,
  countryOfIncorporation: null,
  geographicalLocation: null,
  registeredAddress: '',
  TINOrGSTNNumber: '',
  tradeLicenseNumber:'',
  binNumber:''

});
function handleChange(payload,name){
  console.log(payload,":::::payload")

  //form.value[name] = payload.id;
}

</script>
