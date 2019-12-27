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
			<el-scrollbar style='max-height: 500px;'>
				<div class="nav">
					<div class="nav-item center"  :class="item.isActive:'active':''" v-for="(item,index) in nav":key='index' @click="goto(item.path)">
						<span >{{item.title}}</span>
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
					path:'power'
					}
				]
			}
		},
		watch:{
			$route(value){
				this.nav.map(item =>{
					if(item.path == value.name){
						item.isActive = true
					}else{
						item.isActive = false
					}
				})
				console.log(value)
			}
		},
		created() {
			this.nav = this.initNav(this.nav)
		},
		methods:{
			goto(path){
				this.$router.push({
					name:path
				})
			},
			initNav(arr){
				arr.map(item =>{
					item.isActive = false;
				})
				console.log(arr)
				return arr
			},
		},
	}
</script>

<style scoped lang="scss">
	.warp{
		width: 200px;
		.mine-info{
			background: rgb(179, 216, 255);
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
			background: rgb(250, 236, 216);
		}
			
		.nav-item{
			height: 50px;
		}
		.active{
			background: #E6A23C;
			color: #ff;
		}
		.nav-item:hover{
			background:#E6A23C;
			color: #fff;
			cursor: pointer;
		}
	}
</style>
