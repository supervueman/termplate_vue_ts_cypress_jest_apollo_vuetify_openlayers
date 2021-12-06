<template>
  <v-app>
    <AppBar />

    <v-main>
      <slot></slot>
    </v-main>

    <v-dialog v-model="isOpenSettings" width="500">
      <Settings />
    </v-dialog>

    <NavigationDrawer @openTestModule="openTestModule" />
    <BottomBar />

    <v-dialog v-model="isOpenTestModule" width="1000">
      <Users />
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

import Settings from '@/modules/settings/components/Settings.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import BottomBar from '@/components/BottomBar.vue'
import AppBar from '@/components/AppBar.vue'

/** TEST */
import Users from '@/modules/testModule/components/Users.vue'

const settingsNamespace = 'settings'

@Component({
  components: {
    Settings,
    NavigationDrawer,
    BottomBar,
    AppBar,
    /** TEST */
    Users,
  },
})
export default class App extends Vue {
  @State('isOpenSettingsWindow', { namespace: settingsNamespace })
  private declare isOpenSettingsWindow: boolean

  @Mutation('setIsOpenSettingsWindow', { namespace: settingsNamespace })
  private declare changeIsOpenSettingsWindow: (isOpenSettingsWindow: boolean) => void

  private get isOpenSettings(): boolean {
    return this.isOpenSettingsWindow
  }

  private set isOpenSettings(isOpenSettings: boolean) {
    this.changeIsOpenSettingsWindow(isOpenSettings)
  }

  /** TEST */

  private isOpenTestModule = false

  private openTestModule() {
    this.isOpenTestModule = true
  }
}
</script>
