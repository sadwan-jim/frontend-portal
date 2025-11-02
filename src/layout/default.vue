 <template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar app color="indigo" dark>
      <!-- Toggle Button for Drawer -->
      <v-btn icon @click="drawer = !drawer">
        <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
      </v-btn>

      <v-toolbar-title>Supplier Portal</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Profile & Logout -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="32">
              <v-icon color="white">mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="goToProfile">
            <v-icon start>mdi-account-circle</v-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-icon start>mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      app
      expand-on-hover
      clipped
      class="elevation-2"
      color="indigo"
      dark
      v-model="drawer"
    >
      <v-list nav dense>
        <!-- <v-list-item
          title="Build Form"
          :to="'/form-builder'"
          link
          class="d-flex align-center"
        >
          <v-icon class="mr-2">mdi-pencil</v-icon>
          <span>Build Form</span>
        </v-list-item> -->
        <v-divider />
        
        <v-list-item
          title="View Form"
          :to="'/form-viewer'"
          link
          class="d-flex align-center"
        >
          <v-icon class="mr-2">mdi-pencil</v-icon>
          <span>View Form</span>
        </v-list-item>
        <v-divider />
        <v-list-item
          title="Supplier Form"
          :to="'/supplier-form'"
          link
          class="d-flex align-center"
        >
        
          <v-icon class="mr-2">mdi-kanban</v-icon>
          <span>Default Form</span>
        </v-list-item>
        <v-divider />

        <v-list-group v-model="registrationOpen">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="d-flex align-center">
              <v-icon class="mr-2">mdi-account-circle</v-icon>
              <span>Registration and Onboarding</span>
            </v-list-item>
          </template>
          <v-divider />

          <v-list-group v-model="registrationSubGroupOpen">
            <template #activator="{ props }">
              <v-list-item class="d-flex align-center" v-bind="props">
                <v-icon class="mr-2">mdi-pencil-box-multiple</v-icon>
                <span>Registration</span>
              </v-list-item>
            </template>
            <v-divider />
            
            <v-list-item class="pl-4" :to="'/supplier-add'" link>
              <v-icon class="mr-2">mdi-arrow-right</v-icon>
              Registration Path  Creation
            </v-list-item>
            <v-divider />

            <v-list-item class="pl-4" :to="'/supplier-list'" link>
              <v-icon class="mr-2">mdi-arrow-right</v-icon>
              Registration Path Submission 
            </v-list-item>
            <v-divider />
           
            <v-list-item class="pl-4" link>
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              Review & Analysis
            </v-list-item>
            <v-divider />
            <v-list-item class="pl-4" link>
              <v-icon class="mr-2">mdi-check-circle-outline</v-icon>
              Review Endorsement
            </v-list-item>
            <v-divider />
          </v-list-group>

          <v-list-group v-model="onboardingSubGroupOpen">
            <template #activator="{ props }">
              <v-list-item class="d-flex align-center" v-bind="props">
                <v-icon class="mr-2">mdi-clipboard-text</v-icon>
                <span>Onboarding</span>
              </v-list-item>
            </template>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      drawer: true,
      registrationOpen: false,
      registrationSubGroupOpen: false,
      onboardingSubGroupOpen: false,
    }
  },
  setup() {
    const router = useRouter()

    function goToProfile() {
      router.push('/profile')
    }

    function logout() {
      localStorage.removeItem('token')
      router.push('/login')
    }

    return { goToProfile, logout }
  },
}
</script>

<style scoped>
.nav-item-left {
  padding-left: 5px !important;
  margin-left: 0 !important;
}
.nav-item-left2 {
  padding-left: 10px !important;
  margin-left: 0 !important;
}
.nav-item-left3 {
  padding-left: 15px !important;
  margin-left: 0 !important;
}
</style>
