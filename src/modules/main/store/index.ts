import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { MainState } from './types'
import { RootState } from '@/store/types'

export const state: MainState = {
  isOpen: false,
}

const namespaced = true

const store: Module<MainState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}

export default store
