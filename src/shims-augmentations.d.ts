import { ComponentOptions } from 'vue'

import { Vuelidate } from 'vuelidate'

declare module 'vue/types/vue' {
  interface Vue {
    $v: Vuelidate
  }

  interface VueConstructor {
    options: ComponentOptions<Vue>
  }
}
