<template>
	<div class="warp">
		
			<div class="mine-info center">
				<div class="image">
					<img src="@/assets/logo.png" alt="">
				</div>
				<div class="info">
					<div>彩雅包装</div>
					<!-- <div>info</div> -->
				</div>
			</div>
			
				<div class="nav">
					 <el-scrollbar style='max-height: 1200px;'>
					<div class="nav-item " v-for="(item,index) in nav" 
					:key='index' :class="{'showSon':item.ifShowSon}">
						<div class='parent center' :class="{'active':item.isActive}" @click="goTo(item)">
							<span>{{item.description}}</span>
							<div class="icon" v-if="item.children.length">
								<i class="el-icon-arrow-up" v-if="item.ifShowSon"></i>
								<i class="el-icon-arrow-down" v-else></i>
							</div>
						</div>
						<div class="son" 
							:class="{'showSon':item.ifShowSon}"
						>
						<div class="son-item center" 
						 @click="goToSon(sonItem)"
						 v-for="(sonItem,sonIndex) in item.children" 
						:key="sonIndex"
						 :class="{'active':sonItem.isActive}">
							<span>{{sonItem.description}}</span>
						</div>
							
						</div>
					</div>
					</el-scrollbar>
				</div>
			
		
	</div>

</template>

<script>
import {userMenu} from '@/api/menu'
	export default{
		data(){
			return{
				nav:[
					// {
					// title:'首页',
					// path:'home'
					// },
					// {
					// 	title:'我要下订单',
					// 	path:'placeOrder'
					// },
					// {
					// title:'订单列表',
					// path:'order'
					// },
					// // {
					// // title:'权限',
					// // son:[
					// 	{title:"角色管理",path:"role"},
					// 	{title:"用户管理",path:"user"},
					// 	{title:'菜单管理',path:'power'},
					// // ]
					// // },
					// {
					// title:'系统字典管理',
					// path:'dictionaries'
					// },
					// {
					// title:'客户管理',
					// path:'customer'
					// },
					// {
					// title:'供应商管理',
					// path:'supplier'
					// },
					// {
					// title:'费用管理',
					// path:'cost'
					// },
					// {
					// title:'箱型管理',
					// path:'boxHandler'
					// },
					// {
					// 	title:"采购管理",
					// 	path:'purchaseHandler'
					// },
					// {
					// 	title:"排产管理",
					// 	path:'pdschedule'
					// },
					// {
					// 	title:"成品库管理",
					// 	path:'pdstock'
					// },
					// {
					// 	title:"入料记录管理",
					// 	path:'feeds'
					// }
				]
			}
		},
		watch:{
			$route(value){
				this.selectNav(value.name)
				// console.log(value)
			}
		},
		async created() {
			await this.getUserMunu()
			await this.initNav(this.nav);
		
			let routeName = this.$route.name;
			await this.selectNav(routeName)
		},
		async mounted(){
			
		},
		methods:{
			resetList(arr){
        // console.log(arr)
        let pList = [];
        arr.forEach((item)=>{
          if(item.pid == 0){
            let o = this.sonsTree(item, arr);
            pList.push(o)
          }
        })
        return pList
        // console.log(pList,123123)
      },
      sonsTree(obj, arr) {
          var children = [];
          for (var i = 0; i < arr.length; i++) {
              if (arr[i].pid == obj.id) {  //等于加入数组
                  this.sonsTree(arr[i], arr);//递归出子元素
                  children.push(arr[i]);
              }
          }
          // if (children.length > 0) {
              obj.children = children;
          // }
          return obj;
      },
			async getUserMunu(){
				let res = await userMenu();
				this.nav = this.resetList(res.data)
				console.log(this.nav)
			},
			goToSon(item){
				console.log(item.url,'213213213')
				let url = item.url.indexOf('=');
				let query = url >0?item.url.split('=')[1]:''
				if(url >0){
					this.$router.push({
					path:item.url,
					query:{
						type:query
					}
					}).catch(err => {
						err
					})
				}else{
				this.$router.push({
					path:item.url
				}).catch(err => {
					err
				})
				}
				// let type = url >0?item.url.split('?')[1].split('=')[0]:''
				
			},
			goTo(item){
			
				if(item.url){
					
					this.$router.push({
					path:item.url
					}).catch(err => {err})
				}else{
					item.ifShowSon = !item.ifShowSon;
				}
				
			},
			selectNav(route){
				
				route = `/${route}`
				console.log(route)
				this.nav.forEach(item =>{
					item.isActive = false;
					if(item.url == route){
						item.isActive = true;
						return
					}else{
						
						if(item.children){
							
							item.ifShowSon = false;
							item.children.map(sonItem =>{
								sonItem.isActive = false;
								
								if(sonItem.url == route){
									sonItem.isActive = true;
									item.ifShowSon = true;
									
								}
							})
						}
					}
				})
				
			},
			initNav(arr){
				
				arr.forEach(item => {
					this.$set(item,'isActive',false)
					if(item.children){
						this.$set(item,'ifShowSon',false)
						item.children.forEach(sonItem =>{
							this.$set(sonItem,'isActive',false)
						})
					}
					
					// if(item.path == route){/
					// 	this.$set(item,'isActive',true)
					// }else{
					// 	this.$set(item,'isActive',false)
					// }
					
				});
				
			},
		},
	}
</script>

<style scoped lang="scss">
	.warp{
		width: 200px;
		background: #fff;
		color: #326af5;
		.mine-info{
			.image{
				width: 50px;
				height: 50px;
				border-radius: 50%;
				// overflow: hidden;
			}
			.info{
				padding: 0 5px;
			}
		}
		.nav{
			height: 100%;
			transition: all 5s;
		}
			.showSon{
				background:rgba($color: #FAEBD7, $alpha: .2) 
			}
		.nav-item{
			.parent{
				height: 50px;
			}
			.son{
				height: 0px;
				overflow: hidden;
				transition: all .5s;
			}
			.showSon{
				height: auto;
			}
			.son-item{
				height: 50px;
			}
			.center:hover{
			background:#326af5;
			color: #fff;
			cursor: pointer;
		}
		}
		.active{
			background: #326af5;
			color: #fff;
		}
		
	}
</style>
