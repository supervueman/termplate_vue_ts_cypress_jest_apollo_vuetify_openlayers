<template>
  <v-footer color="primary" app>
    <v-icon @click="openSettingsWindow(true)">settings</v-icon>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

const settingsNamespace = 'settings'

@Component({})
export default class BottomBar extends Vue {
  @Mutation('setIsOpenSettingsWindow', { namespace: settingsNamespace })
  private declare openSettingsWindow: (isOpenSettingsWindow: boolean) => void
}
</script>
