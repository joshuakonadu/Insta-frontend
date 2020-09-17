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

Vue.filter('elapsed', function (isotimestring ) {
    var timestamp = Date.now() - new Date(isotimestring);
    var time = timestamp / 1000;

    if (time < 60) {
      return Math.floor(time).toString() + " Sekunden";
    }
    if (time > 60 && time < 3600) {
      var Minuten = Math.floor(time / 60);
      if (Minuten == 1) {
        return Math.floor(time/60).toString() + " Minute";
      } else {
         return Math.floor(time/60).toString() + " Minuten";
      }
    }
    if (time > 3600 && time < 86400) {
      var Stunden = Math.floor(time / 3600);
      if (Stunden == 1) {
        return Math.floor(time/3600).toString() + " Stunde";
      } else {
        return Math.floor(time/3600).toString() + " Stunden";
      }
    }
    if (time > 86400) {
      var Tage = Math.floor(time / 86400);
      if (Tage == 1) {
        return Math.floor(time/86400).toString() + " Tag";
      } else {
        return Math.floor(time/86400).toString() + " Tagen";
      }
    }
});


// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App),
});
