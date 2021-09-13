import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import loadingImg from '../src/assets/images/loading.gif'
import router from './router'
import store from './store'
import './filters'

Vue.config.productionTip = false
//register label
Vue.component(Button.name, Button)

Vue.use(VueLazyload, {
  //loading.gif
  loading: loadingImg
})

new Vue({
  render: h => h(App),
  router,
  store, 
}).$mount('#app')
