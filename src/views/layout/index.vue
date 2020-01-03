<template>
	<el-container style="padding:0 20px;" >
	  <el-header> 
	  <router-link to="/">Home</router-link> |<icon-svg icon-class="tupianBG" />
      <router-link to="/about">About</router-link>
	  </el-header>
	  <el-container>
		  <el-scrollbar style='max-height: 500px;'>
			<el-aside width='200px'>
				
				<nav-bar></nav-bar>
			</el-aside>
		</el-scrollbar>
	    <el-main>
			<router-view/>
		</el-main>
	  </el-container>
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
import '@/icons/svg/tupianBG.svg'
export default {
  name: 'home',
  components: {
    navBar
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
