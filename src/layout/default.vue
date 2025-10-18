<script setup>
// You can import any necessary Composition API code or components here
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar title="Application bar"></v-app-bar>
    
    <v-navigation-drawer expand-on-hover>
      <v-list nav dense>
        <!-- 🔹 No level (direct item) -->
        <v-list-item
          title="Build Form"
          :to="'form-builder'"
          link
        />
        <v-divider />
        
        <!-- Level 1 -->
        <v-list-group value="registration&onboarding">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Registration and Onboarding"></v-list-item>
          </template>
          <v-divider />
          
          <!-- Level 2 -->
          <v-list-group value="registration">
            <template #activator="{ props }">
              <v-list-item class="nav-item-left2" v-bind="props" title="Registration"></v-list-item>
            </template>
            <v-divider />
            
            <!-- Level 3 -->
            <v-list-item class="nav-item-left3" :to="'supplier-list'" title="Registration Path Creation & Submission" link />
            <v-divider />
            <v-list-item class="nav-item-left3" title="Review & Analysis" link />
            <v-divider />
            <v-list-item class="nav-item-left3" title="Review Endorsement" link />
            <v-divider />
          </v-list-group>

          <!-- Level 2 -->
          <v-list-group value="Onboard">
            <template #activator="{ props }">
              <v-list-item class="nav-item-left2" v-bind="props" title="Onboarding"></v-list-item>
            </template>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    
    <v-main class="d-flex align-center justify-center">
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

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
