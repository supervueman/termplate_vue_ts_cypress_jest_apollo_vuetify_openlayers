import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import apolloProvider from './plugins/vueapollo'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(VueLayers)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
