import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import apolloProvider from './plugins/vueapollo'
import Vuelidate from 'vuelidate'
import 'vuetify-dialog/dist/vuetify-dialog.css'

import { Settings } from 'luxon'
import WindowManager from './plugins/windowManager'

import { modals } from '@/connector'

import DialogWrapper from '@/components/DialogWrapper.vue'

Settings.defaultLocale = process.env.VUE_APP_DATE_TIME_DEFAULT_LOCAL || 'ru'

Vue.config.productionTip = false

Vue.use(VueLayers)
Vue.use(Vuelidate)

Vue.use(WindowManager, {
  container: '#app-dialog-container',
  context: {
    vuetify,
  },
  components: {
    ...modals,
  },
  layouts: {
    dialog: DialogWrapper,
  },
})

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
