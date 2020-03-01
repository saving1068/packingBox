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
			name:'order'
		},
		children:[
			{
				path: '/home',//首页
				name: 'home',
				meta:{
					title:'首页'
				},
				component:() => import('@/views/Home'),
			},
			{//下单
				path:"/placeOrder",
				name: 'placeOrder',
				meta:{
					title:'我要下单'
				},
				component:() => import('@/views/placeOrder'),
			},
			{//订单
				path: '/order',
				name: 'order',
				meta:{
					title:'订单列表'
				},
				component:() => import('@/views/order'),
			},
			{//订单
				path: '/orderDetail',
				name: 'orderDetail',
				meta:{
					title:'订单详情'
				},
				component:() => import('@/views/orderDetail'),
			},
			{//权限页面
				path: '/power',
				name: 'power',
				meta:{
					title:'菜单管理'
				},
				component:() => import('@/views/power'),
			},
			{//角色
				path: '/role',
				name: 'role',
				meta:{
					title:'角色管理'
				},
				component:() => import('@/views/role'),
			},
			{//用户
				path: '/user',
				name: 'user',
				meta:{
					title:'用户管理'
				},
				component:() => import('@/views/user'),
			},
			{//字典
				path: '/dictionaries',
				name: 'dictionaries',
				meta:{
					title:'字段管理'
				},
				component:() => import('@/views/dictionaries'),
			},
			{//供应商
				path: '/supplier',
				name: 'supplier',
				meta:{
					title:'供应商管理'
				},
				component:() => import('@/views/supplier'),
			},
			{//客户
				path: '/customer',
				name: 'customer',
				meta:{
					title:'客户管理'
				},
				component:() => import('@/views/customer'),
			},
			{//费用
				path: '/cost',
				name: 'cost',
				meta:{
					title:'费用管理'
				},
				component:() => import('@/views/cost'),
			},
			{//
				path:'/boxHandler',
				name:'boxHandler',
				meta:{
					title:'箱型管理'
				},
				component:() => import('@/views/boxHandler')
			},
			{//
				path:'/purchaseHandler',
				name:'purchaseHandler',
				meta:{
					title:'采购管理'
				},
				component:() => import('@/views/purchaseHandler')
			},
			{//
				path:'/pdschedule',
				name:'pdschedule',
				meta:{
					title:'排产管理'
				},
				component:() => import('@/views/pdschedule')
			},
			{//
				path:'/feeds',
				name:'feeds',
				meta:{
					title:'入料管理'
				},
				component:() => import('@/views/feed')
			},
			{//
				path:'/pdstock',
				name:'pdstock',
				meta:{
					title:'成品库管理'
				},
				component:() => import('@/views/pdstock')
			},
			{//
				path:'/inHistory',
				name:'inHistory',
				meta:{
					title:'入库历史'
				},
				component:() => import('@/views/inHistory')
			},
			{//deliverer
				path:'/outHistory',
				name:'outHistory',
				meta:{
					title:'出库历史'
				},
				component:() => import('@/views/outHistory')
			},
			{//
				path:'/deliverer',
				name:'deliverer',
				meta:{
					title:'送货单'
				},
				component:() => import('@/views/deliverer')
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
// console.log(router)
// router.beforeEachh((to, from, next) => {
// 	console.log(to,from,next)
// 	// ...
//   })
export default router
