<template>
	<div class="warp">
		
			<div class="mine-info center">
				<div class="image">
					<img src="@/assets/logo.png" alt="">
				</div>
				<div class="info">
					<div>name</div>
					<div>info</div>
				</div>
			</div>
			
				<div class="nav">
					 <el-scrollbar style='max-height: 500px;'>
					<div class="nav-item " v-for="(item,index) in nav" 
					:key='index' >
						<div class='parent center' :class="{'active':item.isActive}" @click="goTo(item)">
							<span>{{item.title}}</span>
							<div class="icon" v-if="item.son">
								<i class="el-icon-arrow-up" v-if="item.ifShowSon"></i>
								<i class="el-icon-arrow-down" v-else></i>
							</div>
						</div>
						<div class="son" 
							:class="{'showSon':item.ifShowSon}"
						>
						<div class="son-item center" 
						 @click="goToSon(sonItem)"
						 v-for="(sonItem,sonIndex) in item.son" 
						:key="sonIndex"
						 :class="{'active':sonItem.isActive}">
							<span>{{sonItem.title}}</span>
						</div>
							
						</div>
					</div>
					</el-scrollbar>
				</div>
			
		
	</div>

</template>

<script>
	export default{
		data(){
			return{
				nav:[
					{
					title:'首页',
					path:'home'
					},
					{
						title:'我要订单',
						path:'placeOrder'
					},
					{
					title:'订单',
					path:'order'
					},
					{
					title:'权限',
					son:[
						{title:"角色",path:"role"},
						{title:'角色页面',path:'power'}
					]
					}
				]
			}
		},
		watch:{
			$route(value){
				this.selectNav(value.name)
				// console.log(value)
			}
		},
		created() {
			this.initNav(this.nav);
			console.log(this.nav,1111)
		},
		mounted(){
			let routeName = this.$route.name;
			this.selectNav(routeName)
		},
		methods:{
			goToSon(item){
				console.log(item)
				this.$router.push({
					name:item.path
				}).catch(err => {
					err
				})
			},
			goTo(item){
				if(item.path){
					this.$router.push({
					name:item.path
					}).catch(err => {err})
				}else{
					item.ifShowSon = true;
				}
				
			},
			selectNav(route){
				this.nav.forEach(item =>{
					item.isActive = false;
					if(item.path == route){
						item.isActive = true;
						return
					}else{
						if(item.son){
							item.ifShowSon = false;
							item.son.map(sonItem =>{
								sonItem.isActive = false;
								
								if(sonItem.path == route){
									sonItem.isActive = true;
									item.ifShowSon = true;
									console.log(item)
								}
							})
						}
					}
				})
				console.log(this.nav,2222)
			},
			initNav(arr){
				
				arr.forEach(item => {
					this.$set(item,'isActive',false)
					if(item.son){
						this.$set(item,'ifShowSon',false)
						item.son.forEach(sonItem =>{
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
			
		.nav-item{
			.parent{
				height: 50px;
			}
			.son{
				height: 0px;
				overflow: hidden;
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
