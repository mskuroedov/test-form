import Vue from 'vue'
import App from './App.vue'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '@/assets/scss/vue-multiselect.scss'
import Multiselect from 'vue-multiselect'

const VueInputMask = require('vue-inputmask').default

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueInputMask)
Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
