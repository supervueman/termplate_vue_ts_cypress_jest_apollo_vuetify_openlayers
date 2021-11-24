<template>
  <v-app>
    <AppBar />

    <v-main>
      <slot></slot>
    </v-main>

    <v-dialog v-model="open" width="500">
      <Settings />
    </v-dialog>

    <NavigationDrawer />
    <BottomBar />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'

import Settings from '../components/Settings.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import BottomBar from '../components/BottomBar.vue'
import AppBar from '../components/AppBar.vue'

const themeManagerNamespace = 'themeManager'

@Component({
  components: {
    Settings,
    NavigationDrawer,
    BottomBar,
    AppBar,
  },
})
export default class App extends Vue {
  @State('preferencesDrawer', { namespace: themeManagerNamespace })
  private readonly declare preferencesDrawer: boolean

  @Mutation('setPreferencesDrawer', { namespace: themeManagerNamespace })
  private declare setPreferencesDrawer: (value: boolean) => void
}
</script>
