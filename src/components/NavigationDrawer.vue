<template>
  <v-navigation-drawer app fixed>
    <v-toolbar color="primary" flat>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-toolbar>

    <v-divider />

    <v-list-item to="/playground">
      Playground
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class NavigationDrawer extends Vue {}
</script>
