import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { SettingsState } from './types'
import { RootState } from '@/store/types'

export const state: SettingsState = {
  isOpen: false,
}

const namespaced = true

const store: Module<SettingsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}

export default store
