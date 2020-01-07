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
			<el-scrollbar style='max-height: 800px;'>
				<div class="nav">
					<div class="nav-item"  v-for="(item,index) in nav" 
					:key='index' >
					<div class="parent center" :class="{'active':item.isActive}"  @click="goto(item)">
						<span>
						{{item.title}}
						</span>
						<div class="icon" v-if="item.son">
							<i v-if="item.ifShowSon" class="el-icon-arrow-up"></i>
							<i v-else class="el-icon-arrow-down"></i>
						</div>
						
					</div>
					<div class="son" :class="{'showSon':item.ifShowSon}"  >
						<div class="sonItem center" :class="{'active':sonItem.isActive}" v-for="(sonItem,sonIndex) in item.son" :key="sonIndex" @click="gotoSon(sonItem,index)">
							<span>
								{{sonItem.title}}
							</span>
						</div>
						
					</div>
					</div>
				</div>
				</el-scrollbar>
		
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
					title:'订单',
					path:'order'
					},
					{
					title:'权限',
					son:[
						{title:'角色',path:'role'},
						{title:"权限页面",path:'power'}
					]
					}
				]
			}
		},
		watch:{
			$route(value){
				this.selectNav(value.name)
			}
		},
		created() {
			this.initNav(this.nav);
			
		},
		mounted(){
			this.selectNav(this.$route.name)
			// console.log(this.nav)
		},
		methods:{
			gotoSon(item,parentIndex){
				this.$router.push({
						name:item.path
					})
				this.nav.map(item =>{
						
						item.ifShowSon = false;
						
					})
				this.nav[parentIndex].ifShowSon = true;

			},
			goto(item){
				
				if(item.path){	
					this.$router.push({
						name:item.path
					})
				}else{
					this.nav.map(item =>{
						
						item.ifShowSon = false;
						
					})
					item.ifShowSon = true;
				}
				
			},
			selectNav(routeName){
				this.nav.forEach(item =>{
					item.isActive = false;
					if(item.path == routeName){
						item.isActive = true;
						return
					}else{
						if(item.son){
							
							item.son.forEach((sonItem)=>{
								console.log(sonItem)
								sonItem.isActive = false;
								item.ifShowSon = false;
								if(sonItem.path == routeName){
									
									sonItem.isActive = true;
									item.ifShowSon = true;
									console.log(item.ifShowSon,sonItem.path,routeName)
									return
								}
							})
						}
						
					}
				})
				
				console.log(this.nav)
			},
			initNav(arr){
				arr.forEach(item => {
					this.$set(item,'ifShowSon',false)
					if(item.son){	
						this.$set(item,'isActive',false);
						this.initNav(item.son)
					}else{
						this.$set(item,'isActive',false);
					}
					
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
			
		}
			
		.nav-item{
			
			.parent{
				width: 100%;
				height: 50px;
			}
			.son{
				width: 100%;
				height: 0px;
				overflow: hidden;
			}
			.sonItem{
				width: 100%;
				height: 50px;
			}
			.sonItem:hover{
				background:#326af5;
				color: #fff;
				cursor: pointer;
			}
			.showSon{
				height:auto;
			}
			.icon{
				padding-left: 20px;
			}
		}
		.active{
			background: #326af5;
			color: #fff;
		}
		.parent:hover{
			background:#326af5;
			color: #fff;
			cursor: pointer;
		}
	}
</style>
