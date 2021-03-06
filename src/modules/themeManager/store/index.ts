import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ThemeManagerState } from './types'
import { RootState } from '@/store/types'

export const state: ThemeManagerState = {
  preferencesDrawer: false,
  preferences: {
    contrast: 'light',
    theme: 'blue',
  },
}

const namespaced = true

const store: Module<ThemeManagerState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}

export default store
