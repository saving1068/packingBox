import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
import echarts  from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui';
import './styles/index.scss'
import './icons'
import Loading from '@/components/Loading'


Vue.directive('loadmore', {
  bind(el, binding) {
    var p = 0;

    var t = 0;

    var down = true;

    var selectWrap = el.querySelector('.el-table__body-wrapper')

    selectWrap.addEventListener('scroll', function() {

      //判断是否向下滚动

      p = this.scrollTop;

      // if ( t < p){down=true}else{down=false}

      if(t < p){

        down = true;

      }else{

        down = false;

      }

      t = p;

      //判断是否到底

      const sign = 10;

      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight

      if (scrollDistance <= sign && down) {

        binding.value()

      }
    })
    
    // const selectWrap = el.querySelector('.el-table__body-wrapper')
    // selectWrap.addEventListener('scroll', function() {
      
    //   let sign = 0;
    //   // let wSign = Number(this.scrollWidth)-Number(this.scrollLeft)<this.scrollWidth?false:true;
    //   // console.log(wSign)
    //   const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
     
    //   if (scrollDistance <= sign) {
    //     binding.value()
    //   }
    // })
  }
})




Vue.config.productionTip = false;

Vue.use(elementUI, { size: 'mini', zIndex: 3000 });
Vue.use(echarts)
Vue.use(Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
