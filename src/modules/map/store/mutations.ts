import { MutationTree } from 'vuex'
import { MapState } from './types'
import { DrawOptions } from './../types/index'

import { Position, Feature } from 'geojson'
import { GeometryTypeNames } from '../enums'

export const mutations: MutationTree<MapState> = {
  setZoom(state, zoom: number) {
    state.zoom = zoom
  },
  setCenter(state, center: Position) {
    state.center = center
  },
  setRotation(state, rotation: number) {
    state.rotation = rotation
  },
  setMouseCoordinate(state, mouseCoordinate: Position) {
    state.mouseCoordinate = mouseCoordinate
  },
  setDrawOptions(state, drawOptions: DrawOptions) {
    const newDrawOptions: DrawOptions = {
      isActive: drawOptions.isActive ?? false,
      type: drawOptions.type || GeometryTypeNames.POINT,
      multiple: drawOptions.multiple ?? false,
    }

    state.drawOptions = newDrawOptions
  },
  setDrawnFeatures(state, features: Feature[]) {
    state.drawnFeatures = features
  },
  clearDrawnFeatures(state) {
    state.drawnFeatures = []
  },
}
