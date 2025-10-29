<template>
          <v-col cols="12"  >
            <v-card class="pa-6" elevation="3">
              <v-card-title class="text-h5 font-weight-bold mb-4">
                Profile Information
              </v-card-title>

              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="supplier.name"
                    label="Company Name"
                    variant="outlined"
                    prepend-icon="mdi-domain"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="supplier.contactPerson"
                    label="Contact Person"
                    variant="outlined"
                    prepend-icon="mdi-account"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="supplier.email"
                    label="Email"
                    variant="outlined"
                    prepend-icon="mdi-email"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="supplier.phone"
                    label="Phone Number"
                    variant="outlined"
                    prepend-icon="mdi-phone"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="supplier.address"
                    label="Address"
                    variant="outlined"
                    prepend-icon="mdi-map-marker"
                  />
                </v-col>
              </v-row>

              <v-divider class="my-4"></v-divider>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="supplier.registrationNo"
                    label="Registration Number"
                    variant="outlined"
                    prepend-icon="mdi-file-document"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="supplier.category"
                    :items="categories"
                    label="Category"
                    variant="outlined"
                    prepend-icon="mdi-shape"
                  />
                </v-col>
              </v-row>

              <v-card-actions class="justify-end mt-4">
                <v-btn color="grey" variant="outlined" @click="resetForm">
                  Reset
                </v-btn>
                <v-btn color="indigo" class="ml-3" @click="saveProfile">
                  <v-icon start>mdi-content-save</v-icon>
                  Save Changes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
     
 
 
</template>

<script setup>
import { ref } from 'vue'

const supplier = ref({
  name: '',
  contactPerson: '',
  email: '',
  phone: '',
  address: '',
  registrationNo: '',
  category: '',
})

const categories = ['Raw Materials', 'Packaging', 'Logistics', 'Consulting']

function resetForm() {
  supplier.value = {
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    registrationNo: '',
    category: '',
  }
}

function saveProfile() {
  console.log('Supplier Saved:', supplier.value)
  alert('Supplier profile saved successfully!')
}
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
