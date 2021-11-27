import { MutationTree } from 'vuex'
import { MapState } from './types'

import { Position } from 'geojson'

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
}
