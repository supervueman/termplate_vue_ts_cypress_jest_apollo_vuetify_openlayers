import Vue from 'vue'
import Vuex from 'vuex'

import { store as themeManager } from '@/modules/main'

import { RootState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  mutations: {},
  actions: {},
  modules: {
    themeManager,
  },
})
