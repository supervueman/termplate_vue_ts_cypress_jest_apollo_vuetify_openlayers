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

    <v-list-item to="/about">
      About
    </v-list-item>
    <v-list-item>
      <v-list-item-action @click="openTestModule">
        Test module
      </v-list-item-action>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class NavigationDrawer extends Vue {
  private openTestModule() {
    this.$emit('openTestModule')
  }
}
</script>
