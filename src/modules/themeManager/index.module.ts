import store from './store'
import { AppModule } from '@/types'
import { ThemeManagerState } from './store/types'
import { RootState } from '@/store/types'

const name = 'themeManager'

const module: AppModule<ThemeManagerState, RootState, unknown, unknown> = {
  name,
  store,
}

export default module
