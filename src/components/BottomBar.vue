<template>
  <v-footer color="primary" app>
    <v-icon @click="openSettingsWindow(true)">mdi-cog</v-icon>
    <v-spacer />
    <div class="mr-4">Zoom: {{ zoom }}</div>
    <div class="mr-4">Center: {{ center[0] }} {{ center[1] }}</div>
    <div class="mr-4">Rotation: {{ rotation }}</div>
    <div class="mr-4">Mouse coordinate: {{ mouseCoordinate[0] }} {{mouseCoordinate[1]}}</div>
    <div>{{ nowDate }} {{ nowTime }}</div>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

import { DateTime } from 'luxon'

import { Position } from 'geojson'

const settingsNamespace = 'settings'
const mapNamespace = 'map'

@Component({})
export default class BottomBar extends Vue {
  @State('zoom', { namespace: mapNamespace })
  private declare zoom: number

  @State('center', { namespace: mapNamespace })
  private declare center: Position

  @State('rotation', { namespace: mapNamespace })
  private declare rotation: number

  @State('mouseCoordinate', { namespace: mapNamespace })
  private declare mouseCoordinate: Position

  @Mutation('setIsOpenSettingsWindow', { namespace: settingsNamespace })
  private declare openSettingsWindow: (isOpenSettingsWindow: boolean) => void

  private get nowDate(): string {
    return DateTime.now().toFormat('dd LLLL yyyy')
  }

  private get nowTime(): string {
    return DateTime.now().toFormat('HH:mm')
  }
}
</script>
