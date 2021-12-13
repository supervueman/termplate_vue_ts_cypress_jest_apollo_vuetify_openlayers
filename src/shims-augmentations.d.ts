import { ComponentOptions } from 'vue'

import { Vuelidate } from 'vuelidate'
import { WindowManager } from '@/plugins/windowManager'

declare module 'vue/types/vue' {
  interface Vue {
    $v: Vuelidate
    $wm: WindowManager
  }

  interface VueConstructor {
    options: ComponentOptions<Vue>
  }
}
