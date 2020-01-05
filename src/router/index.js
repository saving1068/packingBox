import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
	redirect:{
		name:'layout'
	}
	},
	{
		path: '/layout',
		name: 'layout',
		component:() => import('@/views/layout'),
		redirect:{
			name:'home'
		},
		children:[
			{
				path: '/home',
				name: 'home',
				component:() => import('@/views/Home'),
			},
			{
				path: '/order',
				name: 'order',
				component:() => import('@/views/order'),
			},
			{
				path: '/power',
				name: 'power',
				component:() => import('@/views/power'),
			}
		]
	}
  
]

const router = new VueRouter({
  
  routes
})

export default router
