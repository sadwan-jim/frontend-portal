<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          
          <v-card-subtitle>Please enter your credentials to continue</v-card-subtitle>

          <v-form v-model="formValid">
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              :rules="passwordRules"
              type="password"
              required
            ></v-text-field>

            <v-btn
              :disabled="!formValid"
              color="primary"
              @click="login"
            >
              Login
            </v-btn>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn text @click="redirectToRegister">Don't have an account? Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

import { useRouter ,useRoute} from 'vue-router';
import { ref } from 'vue';

    const router = useRouter(); 
    const route = useRoute(); 
    // Reactive variables
    const email = ref('');
    const password = ref('');
    const formValid = ref(false);

    // Validation rules
    const emailRules = [
      (v) => !!v || 'Email is required',
      (v) => /.+@.+\..+/.test(v) || 'Enter a valid email',
    ];

    const passwordRules = [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 6) || 'Password must be at least 6 characters long',
    ];

    // Login function
    const login = () => {
        const templateID = route.params.id;

        console.log("TEMPLATE ID",templateID)
        if(templateID){
          router.push({ name: 'FormPreview',params: { id: templateID } })
        }else{
          router.push({ name: 'FormBuilder' })
        }


        
     
    };

    // Redirect to register function
    const redirectToRegister = () => {
      alert('Redirecting to Register Page...');
    };

    // Return reactive state and methods to the template
  


</script>

<style scoped>
.v-card {
  padding: 20px;
}
</style>
