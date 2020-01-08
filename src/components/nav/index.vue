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
					<div class="nav-item center" :class="{'active':item.isActive}"  v-for="(item,index) in nav" 
					:key='index' @click="goto(item.path)">
					<div >{{item.title}}</div>
						
					</div>
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
					title:'订单',
					path:'order'
					},
					{
					title:'权限',
					path:'power'
					}
				]
			}
		},
		watch:{
			$route(value){
				// console.log(value)
				let nav = [...this.nav];
				console.log(this)
				nav.map(item =>{
					if(item.path == value.name){
						item.isActive = true
					}else{
						item.isActive = false
					}
				})
				// console.log(this.nav,'1111')
				// this.$set(this,this.nav,nav)
				console.log(this.nav,'22')
			}
		},
		created() {
			this.nav = this.initNav(this.nav);
			console.log(this.nav)
		},
		methods:{
			goto(path){
				this.$router.push({
					name:path
				})
			},
			initNav(arr){
				let route = this.$route.name
				arr.forEach(item => {
					if(item.path == route){
						this.$set(item,'isActive',true)
					}else{
						this.$set(item,'isActive',false)
					}
					
				});
				
				return arr
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
			height: 50px;
		}
		.active{
			background: #326af5;
			color: #fff;
		}
		.nav-item:hover{
			background:#326af5;
			color: #fff;
			cursor: pointer;
		}
	}
</style>
