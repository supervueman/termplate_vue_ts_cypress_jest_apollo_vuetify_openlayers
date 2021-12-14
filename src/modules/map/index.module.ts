import store from './store'
import { AppModule } from '@/types'
import { MapState } from './store/types'
import { RootState } from '@/store/types'

const name = 'map'

const module: AppModule<MapState, RootState, unknown, unknown> = {
  name,
  store,
}

export default module
