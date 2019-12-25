import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
import echarts  from 'echarts';
import elementUI from 'element-ui';
import './styles/index.scss'
import './icons'
import Loading from '@/components/Loading'

Vue.config.productionTip = false;

Vue.use(elementUI);
Vue.use(echarts)
Vue.use(Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
