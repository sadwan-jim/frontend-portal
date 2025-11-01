 <template>
  <v-card
    class="mx-auto my-5"
    style="max-width: 1200px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1);"
  >
    <v-card-title
      class="d-flex align-center justify-space-between"
      style="background: linear-gradient(135deg, #FF6B6B, #4ECDCC); color: white; padding: 16px 24px;"
    >
      
      <div class="d-flex align-center">
        <span class="font-weight-medium">{{ sectionTitle }}</span>
      </div>
    </v-card-title>

    
    <v-card-text class="pa-4" style="background-color: #f9f9f9;">
      <v-tabs
        v-model="tab"
        show-arrows
        class="v-tabs-pill"
      >
        <v-tab
          v-for="(item, index) in tabs"
          :key="index"
          :value="item.name"
          class="d-flex align-center"
        >
          <span>{{ item.name }}</span>
        </v-tab>
      </v-tabs>
      
      <v-window v-model="tab">
        <v-window-item :value="tabs[0].name" eager>

        </v-window-item>
        <v-window-item :value="tabs[1].name" eager>

        </v-window-item>
        <v-window-item :value="tabs[2].name" eager>

        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'; 
import ControlTemplate from './control-template.vue';
import TableTemplate from './table-template.vue';

import { useFormTemplateStore } from '@/store/form-builder/form-template.store';
const tabs = ref([
  { name: 'General Information' },
  { name: 'Manufacturing Info' },
  { name: 'Commercial & Finance' }
]);

templateStore = useFormTemplateStore();

const tab = ref(tabs.value[0].name);

const sectionTitle = ref('Supplier Profile Management');


</script>
