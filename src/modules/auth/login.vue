 <template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="d-flex align-center justify-center"
        style="height: 100vh;"
      >
        <v-col cols="12" md="4">
          <v-card class="shadow-sm p-4">
            <!-- Header -->
            <div class="text-center mb-4">
              <h3 class="fw-bold text-primary">Login</h3>
              <p class="text-muted">Enter your credentials to continue</p>
            </div>

            <!-- Form -->
            <v-form v-model="formValid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                type="email"
                outlined
                dense
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                type="password"
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <v-btn
                :disabled="!formValid"
                color="success"
                class="btn btn-primary w-100 mb-3"
                @click="login"
              >
                Login
              </v-btn>
            </v-form>

            <div class="text-center">
              <v-btn text class="btn btn-link" @click="redirectToRegister">
                Don't have an account? Register
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
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
        const templateID = route.query.templateId;
        const contactID = route.query.contactId;

        console.log(contactID,"TEMPLATE ID",templateID)
        if(templateID){
          router.push({ name: 'FormPreview',query: { templateId: templateID  ,contactId:contactID} })
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
