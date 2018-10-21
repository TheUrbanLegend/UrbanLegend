import Vue from 'vue'
// import Buefy from 'buefy'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './router'
import { i18n } from "./lang";
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import brands from '@fortawesome/fontawesome-free-brands';
Vue.component('font-awesome-icon', FontAwesomeIcon)
// import 'buefy/dist/buefy.css'

// Vue.use(Buefy)
Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
