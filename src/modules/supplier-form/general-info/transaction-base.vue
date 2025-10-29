<template>
  <v-expansion-panels flat>
    <v-expansion-panel style="background-color: #ffffff; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <v-expansion-panel-title class="d-flex align-center" style="font-size: 1.25rem;">
        <v-row class="align-center" no-gutters>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon size="30" color="info" icon="mdi-office-building" />
          </v-col>
             <v-col cols="11" class="d-flex align-center justify-space-between">
            <span class="font-weight-medium">{{ sectionTitle }}</span>
            <v-icon small color="primary" @click="editTitle">mdi-pencil</v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row dense>
          <v-col cols="4" class="mb-4">
            <v-radio-group  :label="'Transaction Type'" v-model="transactionType" inline>
                <v-radio
                   :label="'Self'"
                   :value="'self'"
                />
                <v-radio
                   :label="'Agent'"
                   :value="'agent'"
                />
            </v-radio-group>
         
         
          </v-col>

        </v-row>
        <v-row dense v-if="transactionType=='agent'" >
            <v-col >
              <v-btn-toggle v-model="searchState" group style="border: 1px solid #ccc;">
                <v-btn value="manually_add" color="primary">Manually Add</v-btn>
                <v-btn value="show_search" color="primary">Show Search</v-btn>  
              </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row dense v-if="transactionType=='agent'" >
            <template v-if="searchState=='manually_add'">
                <v-col cols="4">
                    <v-text-field
                        :placeholder="'Agent Name'"
                        :label="'Agent Name'"
                        outlined
                        dense
                        v-model="agentInfo.agentName"
                        :rules="[required(agentInfo.agentName, 'Agent Name')]"
                    />
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        :placeholder="'Agent Address'"
                        :label="'Agent Address'"
                        outlined
                        dense
                        v-model="agentInfo.agentAddress"
                        :rules="[required(agentInfo.agentAddress, 'Agent Address')]"
                    />
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        :placeholder="'Agent Email'"
                        :label="'Agent Email'"
                        outlined
                        dense
                        v-model="agentInfo.agentEmail"
                        :rules="[required(agentInfo.agentEmail, 'Agent Email')]"
                    />
                </v-col>
            </template>
            <template v-else>
                <v-col cols="4">
                    <dropdown
                        :label="'Search Agent Name'"
                        :placeholder="'Search Agent Name'"
                        :options="['ABC','DEF','GHI','JKL']"
                        :keyProp="''"
                        :valProp="''"
                        :apiUrl="''"
                       
                    />
                </v-col>
            </template>

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

const transactionType =  ref('self'); 

const sectionTitle = ref('Transaction Base');
const searchState =  ref('manually_add'); 
const editTitle = () => {
  const newTitle = prompt('Enter new section title', sectionTitle.value);
  if (newTitle) sectionTitle.value = newTitle;
};

const agentInfo = ref({
  agentName: '',
  agentAddress: '',
  agentEmail:''

});




</script>
