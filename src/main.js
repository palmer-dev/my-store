import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCartShopping, faPlus, faMinus)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit("GET_PRODUCT_IN_CART");
  }
}).$mount('#app')
