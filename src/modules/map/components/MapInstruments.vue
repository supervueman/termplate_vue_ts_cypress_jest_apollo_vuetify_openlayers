<template>
  <div class="MapInstruments">
    <v-btn fab depressed small class="mb-2" @click="changeZoom(zoomType.Plus)">
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn fab depressed small class="mb-2" @click="changeZoom(zoomType.Minus)">
      <v-icon>remove</v-icon>
    </v-btn>
    <v-btn fab depressed small class="mb-2">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn fab depressed small class="mb-2">
      <v-icon>linear_scale</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

const mapNamespace = 'map'

enum ZoomType {
  Minus = 'minus',
  Plus = 'plus'
}

@Component({})
export default class MapInstruments extends Vue {
  @State('zoom', { namespace: mapNamespace })
  private declare zoom: number

  @Mutation('setZoom', { namespace: mapNamespace })
  private declare setZoom: (zoom: number) => void

  private readonly zoomType = ZoomType

  private changeZoom(zoomType: ZoomType) {
    const zoom = zoomType === ZoomType.Plus ? this.zoom + 1 : this.zoom - 1

    if (zoom >= 0 && zoom <= 28) {
      this.setZoom(zoom)
    }
  }
}
</script>

<style scoped lang="scss">
.MapInstruments {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
