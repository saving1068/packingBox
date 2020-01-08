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
	},
	{
        path: '/admin',
        name: 'admin',
        meta: {title: '账户管理'},
        hidden: true,
        component: () => import('@/views/admin'),
        redirect: '/admin/login',
        children: [
            {
                path: 'login',
                name: 'login',
                meta: {title: '账户登录'},
                component: () => import('@/views/admin/login')
            },
            {
                path: 'register',
                name: 'register',
                meta: {title: '账户注册'},
                component: () => import('@/views/admin/register'),
            },
			{
			    path: 'findPasswords',
			    name: 'findPasswords',
			    meta: {title: '忘记密码'},
			    component: () => import('@/views/admin/findPasswords'),
			}
        ]
    }
]



const router = new VueRouter({
  
  routes
})
router.beforeEachh((to, from, next) => {
	console.log(to,from,next)
	// ...
  })
export default router
