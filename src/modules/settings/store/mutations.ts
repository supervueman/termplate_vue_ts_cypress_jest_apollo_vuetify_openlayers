import { MutationTree } from 'vuex'
import { SettingsState } from './types'

export const mutations: MutationTree<SettingsState> = {
  setIsOpenSettingsWindow(state, isOpenSettingsWindow: boolean) {
    state.isOpenSettingsWindow = isOpenSettingsWindow
  },
}
