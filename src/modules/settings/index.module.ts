import store from './store'
import { SettingsState } from './store/types'
import { RootState } from '@/store/types'
import { AppModule } from '@/types'

const name = 'settings'

const module: AppModule<SettingsState, RootState, unknown, unknown> = {
  name,
  store,
}

export default module
