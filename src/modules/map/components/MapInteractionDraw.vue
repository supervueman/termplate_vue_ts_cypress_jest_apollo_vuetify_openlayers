<template>
  <div v-if="drawOptions.isActive">
    <vl-layer-vector :z-index="1">
      <vl-source-vector :features.sync="features" ident="the-source" />
    </vl-layer-vector>

    <vl-interaction-draw
      :type="drawOptions.type"
      source="the-source"
      :geometry-function="geometryFunction"
      @drawstart="drawStart"
      @drawend="drawEnd"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { DrawOptions } from '../types'

import { createBox, createRegularPolygon } from 'ol/interaction/Draw'
import { GeometryTypeNames } from '../enums'
import { GeometryFunction } from 'ol/style/Style'

const mapNamespace = 'map'

@Component({})
export default class MapInteractionDraw extends Vue {
  @State('drawOptions', { namespace: mapNamespace })
  private declare readonly drawOptionsState: DrawOptions

  private drawOptions: DrawOptions = {
    isActive: false,
    multiple: false,
    type: GeometryTypeNames.POINT,
  }

  private features = []

  private geometryFunction: GeometryFunction | unknown = null

  @Watch('drawOptionsState', { deep: true })
  private onChangeGeometryType(drawOptions: DrawOptions) {
    this.drawOptions = { ...drawOptions }

    if (drawOptions.type === GeometryTypeNames.SQUARE) {
      this.drawOptions.type = GeometryTypeNames.CIRCLE
      this.geometryFunction = createRegularPolygon(4) as unknown
    } else if (drawOptions.type === GeometryTypeNames.BOX) {
      this.drawOptions.type = GeometryTypeNames.CIRCLE
      this.geometryFunction = createBox() as unknown
    } else {
      this.geometryFunction = null
    }
  }

  private drawStart() {
    if (!this.drawOptions.multiple) {
      this.features = []
    }
  }

  private drawEnd() {
    // TODO: Save features to store
  }
}
</script>
