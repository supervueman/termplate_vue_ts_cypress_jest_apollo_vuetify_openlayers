import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import apolloProvider from './plugins/vueapollo'
import Vuelidate from 'vuelidate'
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.config.productionTip = false

Vue.use(VueLayers)
Vue.use(Vuelidate)
Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
})

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
