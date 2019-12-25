<template>
	<el-container>
	  <el-header> 
	  <router-link to="/">Home</router-link> |<icon-svg icon-class="tupianBG" />
      <router-link to="/about">About</router-link>
	  </el-header>
	  <el-container>
	    <el-aside width="200px">
			
			<nav-bar></nav-bar>
		</el-aside>
	    <el-main>
			content
			<router-view/>
		</el-main>
	  </el-container>
	</el-container>
<!-- <div class="warp space-between">
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
<style scoped lang="scss">
	.warp{
		
	
	}
</style>
