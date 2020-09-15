import Vue from 'vue'
import { store } from './store'
import { router } from './router'



import { 
  DropdownPlugin, 
  ModalPlugin, 
  NavPlugin, 
  NavbarPlugin,  
  ToastPlugin, 
  CarouselPlugin, 
} from 'bootstrap-vue'

// Own Party Plugins
import FontAwesomeConfig from "./plugins/FontAwesomeConfig";

// App
import './styles.scss'
import App from './App.vue'
import Vuelidate from 'vuelidate'


// Bootstrap Vue
Vue.use(DropdownPlugin)
Vue.use(NavPlugin)
Vue.use(NavbarPlugin)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(CarouselPlugin)


Vue.use(FontAwesomeConfig);

Vue.use(Vuelidate)

Vue.filter('truncate', function (text, length, suffix) {
  if (!text) {
    return ''
  }
  return text.substring(0, length) + suffix;
});


// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App),
});
