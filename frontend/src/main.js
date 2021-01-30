import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies';
import GoogleAuth from '@/config/google.js'


const gauthOption = {
  clientId:'869616648759-8jebhmmce7i6m2dtcdcp9nug8bs266a7.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.mixin({
  data: function() {
    return {
      baseUrl:'https://rifat.pythonanywhere.com'
    }
  }
})


Vue.use(GoogleAuth, gauthOption)

Vue.use(VueCookies);
// filtering names
Vue.filter('cut-name',function(value){
  return value.slice(0,10) + '...'
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
