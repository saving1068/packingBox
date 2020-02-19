<template>
	  <el-container style="padding:20px 20px;">
		 
			<el-aside width='200px'>
				<nav-bar></nav-bar>
			</el-aside>
		
	    <el-main style="background:#eef1f6;padding:0 0 0 20px;min-width:1200px;">
			<el-header style="background:#fff;"> 
				<myhead></myhead>	
			</el-header>
			<transition name="el-fade-in-linear">
				<router-view  style="background:#fff;margin-top:20px;padding:20px;"/>
				
			</transition>
			
		</el-main>
	  </el-container>
<!-- <div class="warpBox">
	<div class="nav">
		<nav-bar></nav-bar>
	</div>
	<div class="content col">
		<router-view/>
	</div>
  </div> -->
</template>

<script>
// @ is an alias to /src
import navBar from '@/components/nav'
import myhead from '@/components/head'
import '@/icons/svg/tupianBG.svg'
export default {
  name: 'home',
  components: {
    navBar,myhead
  }
}
</script>
<style scoped="scoped" lang="scss">
	.warpBox{
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		background: sandybrown;
		padding: 0 20px;
		.content{
			padding-left: 20px;
		}
	}
</style>
