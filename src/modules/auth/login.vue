 <template>
  <v-app>
    <v-main>
      <v-container fluid class="login-container d-flex align-center justify-center">
        <v-row no-gutters class="w-100 h-100">
          <!-- Left Side - Background / Welcome + Illustration -->
          <v-col cols="12" md="6" class="left-panel d-flex flex-column justify-center align-center text-white px-8">
          <div class="text-center text-white px-6">
            <h2 class="fw-bold mb-4" style="font-size: 2.2rem; letter-spacing: 1px;">
              Welcome to the Supplier Portal
            </h2>
            <p class="mb-5" style="font-size: 1.1rem; line-height: 1.8;">
              Manage your business effortlessly with our intuitive Supplier Portal.
            </p>
            <ul class="list-unstyled text-left mb-5" style="font-size: 1rem; line-height: 1.8;">
              <li class="mb-3">
                <v-icon left small color="yellow lighten-2">mdi-truck-delivery</v-icon>
                <strong>Track Orders:</strong> Stay updated on every order from placement to delivery.
              </li>

              <li class="mb-3">
                <v-icon left small color="green lighten-2">mdi-chart-line</v-icon>
                <strong>Access Reports:</strong> View performance metrics, invoices, and payment history.
              </li>

              <li class="mb-3">
                <v-icon left small color="orange lighten-2">mdi-timer-sand</v-icon>
                <strong>Save Time:</strong> Automate routine tasks and focus on growing your business.
              </li>
                  <li class="mb-3">
                <v-icon left small color="cyan lighten-2">mdi-account-group</v-icon>
                <strong>Collaborate Seamlessly:</strong> Communicate directly with buyers and teams in real-time.
              </li>
                  <li class="mb-3">
                <v-icon left small color="purple lighten-2">mdi-clipboard-check</v-icon>
                <strong>Stay Organized:</strong> Keep all your product, pricing, and shipment information in one place.
              </li>
            </ul>
            <p style="font-size: 1rem; font-weight: 500;">
              Empowering suppliers to work smarter, faster, and more efficiently.
            </p>
          </div>


          </v-col>

          <!-- Right Side - Login Form -->
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-card class="p-10 elevation-12 login-card"  style="background: transparent; color:white;">
              <div class="text-center mb-6">
                <h3 class="fw-bold mb-2">User Login</h3>
                <p class="text-muted">Enter your credentials to continue</p>
              </div>

              <v-form v-model="formValid">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                  type="email"
                  outlined
                  dense
                  class="mb-4"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="passwordRules"
                  type="password"
                  outlined
                  dense
                  class="mb-6"
                  prepend-inner-icon="mdi-lock"
                ></v-text-field>

                <v-btn
                  :disabled="!formValid"
                  class="w-100 mb-4 gradient-btn"
                  @click="login"
                >
                  Login
                </v-btn>
              </v-form>

              <div class="text-center mt-4">
                <v-btn text class="text-purple" @click="redirectToRegister">
                  Don't have an account? Register
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>

import { useRouter ,useRoute} from 'vue-router';
import { ref } from 'vue';
import { useFormTemplateStore } from '@/store/form-builder/form-template.store';
    const templateStore = useFormTemplateStore();
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
    const login =async () => {
        const templateID = route.query.templateId;
        const contactID = route.query.contactId;
        const status = route.query.status;

        const showFeedBackForm = route.query.feedBackForm||false

        console.log(contactID,"TEMPLATE ID",showFeedBackForm,status)
        // if(templateID){
        //   if(showFeedBackForm!='False'){
        //     router.push({ name: 'FormFeedback',query: { contactId:contactID} })
        //     return;
        //   }
        //   router.push({ name: 'FormPreview',query: { templateId: templateID  ,contactId:contactID} })
        // }else{
        //   router.push({ name: 'FormBuilder' })
        // }
        debugger;
        switch(status)
        {
          case "0":{

            break;
          }
          case "1":{
            console.log("::::AAAASSS",status)
            await templateStore.setTemplateFromContact(contactID)
            router.push({ name: 'DynamicForm'})

            break;
          }
        }

        
     
    };

    // Redirect to register function
    const redirectToRegister = () => {
      alert('Redirecting to Register Page...');
    };

    // Return reactive state and methods to the template
  


</script>

<style scoped>
/* .login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.left-panel {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 2rem;
  text-align: center;
} */
.login-container {
  min-height: 100vh;
  background: url('/src/assets/bg.jpg') repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-panel {
  
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 16px;
}

.left-panel h2 {
  font-size: 2rem;
  letter-spacing: 1px;
}

.left-panel p {
  font-size: 1rem;
  line-height: 1.6;
}

.login-card {
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.gradient-btn {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  color: white;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.text-purple {
  color: #6a11cb !important;
  font-weight: 500;
}

.v-text-field .v-input__prepend-inner .v-icon {
  color: #6a11cb;
}
</style>
