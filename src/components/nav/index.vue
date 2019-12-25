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
			<div class="nav-item center" v-for="(item,index) in nav" :key='index' @click="goto(item.path)">
				<span >{{item.title}}</span>
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
		methods:{
			goto(path){
				this.$router.push({
					name:path
				})
			}
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
			background: rgb(250, 236, 216);
		}
			
		.nav-item{
			height: 50px;
		}
		.nav-item:hover{
			background:#E6A23C;
			color: #fff;
			cursor: pointer;
		}
	}
</style>
