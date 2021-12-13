import TestModal from '@/modules/testModule/modals/TestModal.vue'
import { VueComponents } from '@/plugins/windowManager'
import { DialogObject } from 'vuetify-dialog'
import apolloClient from './apollo'

interface Windows {
  testModal(options): Promise<DialogObject>
}

declare module '@/plugins/windowManager' {
  export interface WindowManager extends Windows {}
}

const modals: VueComponents<Windows> = {
  testModal: TestModal,
}

export {
  apolloClient,
  modals,
}
