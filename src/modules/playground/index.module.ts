import { NormalizedCacheObject } from '@apollo/client'
import { VueComponents } from '@/plugins/windowManager'
import { DialogObject } from 'vuetify-dialog'
import { AppModule } from '@/types'

import apolloClient from './apollo'
import routes from './routes'

import TestModal from '@/modules/playground/modals/TestModal.vue'

interface Windows {
  testModal(options): Promise<DialogObject>
}

declare module '@/plugins/windowManager' {
  export interface WindowManager extends Windows {}
}

const modals: VueComponents<Windows> = {
  testModal: TestModal,
}

/** Module name */
const name = 'playground'

/** Module */
const module: AppModule<unknown, unknown, NormalizedCacheObject, Windows> = {
  name,
  apolloClient,
  modals,
  routes,
}

export default module
