import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { MapState } from './types'
import { RootState } from '@/store/types'
import { GeometryTypeNames } from '../enums'

export const state: MapState = {
  zoom: 3,
  center: [0, 0],
  rotation: 0,
  mouseCoordinate: [0, 0],
  drawOptions: {
    isActive: false,
    type: GeometryTypeNames.POINT,
    multiple: false,
  },
  drawnFeatures: [],
}

const namespaced = true

const store: Module<MapState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}

export default store
