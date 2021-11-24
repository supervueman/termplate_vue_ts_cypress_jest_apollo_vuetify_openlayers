<template>
  <v-navigation-drawer v-model="isPanelOpen" app fixed>
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
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Map from '@/components/Map.vue'
import DefectsTable from '@/components/DefectsTable.vue'

@Component({
  components: {
    Map,
    DefectsTable,
  },
})
export default class NavigationDrawer extends Vue {
  get isPanelOpen(): boolean {
    return this.$store.state.isPanelOpen
  }

  set isPanelOpen(value: boolean) {
    this.$store.commit('setPanelOpen', value)
  }
}
</script>
