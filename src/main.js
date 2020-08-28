import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'



import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import './style/global.styl'

import './style/theme.styl'
import './style/characters.styl'



Vue.prototype.$axios = axios;


Vue.use(ViewUI,{
  transfer:true,
  size:'large',
  capture:false,
  select:{
    arrow:'md-arrow-dropdown',
    arrowSize:20
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
