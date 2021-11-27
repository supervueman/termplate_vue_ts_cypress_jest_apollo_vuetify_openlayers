<template>
  <div>
    <MapInstruments />
    <vl-map
      ref="map"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      :controls="false"
      :logo="false"
      style="height: calc(100vh - 100px)"
      @pointermove="onMouseMove"
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      />

      <vl-layer-tile id="osm">
        <vl-source-osm />
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

import MapInstruments from './MapInstruments.vue'

import { Position } from 'geojson'
import { MapBrowserEvent } from 'ol'

const mapNamespace = 'map'

@Component({
  components: {
    MapInstruments,
  },
})
export default class MapView extends Vue {
  @State('zoom', { namespace: mapNamespace })
  private declare zoomState: number

  @State('center', { namespace: mapNamespace })
  private declare centerState: Position

  @State('rotation', { namespace: mapNamespace })
  private declare rotationState: number

  @Mutation('setZoom', { namespace: mapNamespace })
  private declare setZoom: (zoom: number) => void

  @Mutation('setCenter', { namespace: mapNamespace })
  private declare setCenter: (center: Position) => void

  @Mutation('setRotation', { namespace: mapNamespace })
  private declare setRotation: (rotation: number) => void

  @Mutation('setMouseCoordinate', { namespace: mapNamespace })
  private declare setMouseCoordinate: (mouseCoordinate: Position) => void

  private get zoom(): number {
    return this.zoomState
  }

  private set zoom(zoom: number) {
    this.setZoom(zoom)
  }

  private get center(): Position {
    return this.centerState
  }

  private set center(center: Position) {
    this.setCenter(center)
  }

  private get rotation(): number {
    return this.rotationState
  }

  private set rotation(rotation: number) {
    this.setRotation(rotation)
  }

  private onMouseMove($event: MapBrowserEvent) {
    this.setMouseCoordinate($event.coordinate)
  }
}
</script>

<style scoped lang="scss">
.marker {
  cursor: pointer;
}
</style>

<style lang="scss">
.ol-overlaycontainer-stopevent {
  display: none;
}
</style>
