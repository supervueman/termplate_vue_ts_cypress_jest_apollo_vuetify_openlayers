import { GetterTree } from 'vuex'
import { ThemeManagerState } from './types'
import { RootState } from '@/store/types'

export const getters: GetterTree<ThemeManagerState, RootState> = {
  preferencesDrawer(state): boolean {
    return state.preferencesDrawer
  },
}
