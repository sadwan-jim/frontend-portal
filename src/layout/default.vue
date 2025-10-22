 <template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar app color="indigo" dark>
      <!-- Toggle Button for Drawer -->
      <v-btn @click="drawer = !drawer">
        <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
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
        <!-- Build Form Item -->
        <v-list-item
          title="Build Form"
          :to="'/form-builder'"
          link
          class="d-flex align-center"
        >
          <v-icon class="mr-2">mdi-pencil</v-icon>
          <span>Build Form</span>
        </v-list-item>
        <v-divider />

        <!-- Level 1 - Registration and Onboarding -->
        <v-list-group v-model="registrationOpen">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="d-flex align-center">
              <v-icon class="mr-2">mdi-account-circle</v-icon>
              <span>Registration and Onboarding</span>
            </v-list-item>
          </template>
          <v-divider />

          <!-- Level 2 - Registration -->
          <v-list-group v-model="registrationSubGroupOpen">
            <template #activator="{ props }">
              <v-list-item class="d-flex align-center" v-bind="props">
                <v-icon class="mr-2">mdi-pencil-box-multiple</v-icon>
                <span>Registration</span>
              </v-list-item>
            </template>
            <v-divider />

            <!-- Level 3 - Registration Path Creation & Submission -->
            <v-list-item class="pl-4" :to="'/supplier-list'" link>
              <v-icon class="mr-2">mdi-arrow-right</v-icon>
              Registration Path Creation & Submission
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

          <!-- Level 2 - Onboarding -->
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

    <!-- Main Content -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      // Controls the visibility of the entire navigation drawer
      drawer: true,

      // Controls the expansion of the Registration and Onboarding groups
      registrationOpen: false,
      registrationSubGroupOpen: false,
      onboardingSubGroupOpen: false,
    };
  },
};
</script>


 

<style scoped>
.nav-item-left {
  padding-left: 5px !important; /* Removes left padding */
  margin-left: 0 !important; /* Removes left margin */
}

.nav-item-left2 {
  padding-left: 10px !important; /* Adds more left padding */
  margin-left: 0 !important; /* Removes left margin */
}

.nav-item-left3 {
  padding-left: 15px !important; /* Adds even more left padding */
  margin-left: 0 !important; /* Removes left margin */
}
</style>
