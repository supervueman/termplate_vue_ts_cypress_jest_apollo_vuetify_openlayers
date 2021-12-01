<template>
  <div class="MapInstruments">
    <v-btn fab depressed small class="mb-2" @click="changeZoom(zoomType.Plus)">
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn fab depressed small class="mb-2" @click="changeZoom(zoomType.Minus)">
      <v-icon>remove</v-icon>
    </v-btn>

    <v-speed-dial
      v-model="isOpen"
      direction="left"
      transition="slide-x-reverse-transition"
      class="mb-2"
    >
      <template v-slot:activator>
        <v-btn v-model="isOpen" fab depressed small>
          <v-icon v-if="isOpen">mdi-close</v-icon>
          <v-icon v-else>edit</v-icon>
        </v-btn>
      </template>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.POINT)">
        <v-icon>mdi-vector-point</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.POLYGON)">
        <v-icon>mdi-vector-polygon</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.LINE_STRING)">
        <v-icon>mdi-vector-line</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.MULTI_LINE_STRING)">
        <v-icon>mdi-vector-polyline</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.CIRCLE)">
        <v-icon>mdi-vector-circle-variant</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.CIRCLE)">
        <v-icon>mdi-ray-start</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.CIRCLE)">
        <v-icon>mdi-ray-vertex</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.SQUARE)">
        <v-icon>mdi-vector-square</v-icon>
      </v-btn>
      <v-btn fab depressed small @click="drawOnMap(geometryTypeNames.BOX)">
        <v-icon>mdi-vector-rectangle</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-btn fab depressed small class="mb-2">
      <v-icon>mdi-math-compass</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { DrawOptions, GeometryType } from '../types'
import { GeometryTypeNames } from '../enums'

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

  @Mutation('setDrawOptions', { namespace: mapNamespace })
  private declare setDrawOptions: (drawOptions: DrawOptions) => void

  private readonly zoomType = ZoomType

  private readonly geometryTypeNames = GeometryTypeNames

  private isOpen = false

  private changeZoom(zoomType: ZoomType) {
    const zoom = zoomType === ZoomType.Plus ? this.zoom + 1 : this.zoom - 1

    if (zoom >= 0 && zoom <= 28) {
      this.setZoom(zoom)
    }
  }

  private drawOnMap(type: GeometryType) {
    this.setDrawOptions({
      isActive: true,
      type,
      multiple: false,
    })
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
