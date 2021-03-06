import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from './store/store'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;


Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDbPI2KFAbjo6_SoxUKYc8PyrzqFvUS5aI',
        libraries: 'geometry',
    },
});

new Vue({
    store: store,
    render: h => h(App)
}).$mount('#app')
