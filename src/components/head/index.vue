<template>
    <div class="warp">
        <div>
             <el-input
             clearable
            size="mini"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="searchValue">
        </el-input>
        </div>
       
       
        <div class="login">
             <i class="el-icon-bell"></i>
            <div class="avatar">
                <el-avatar  size="small" src="../../assets/logo.png"></el-avatar>
            </div>
            <el-dropdown szie="mini">
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
     export default{
        data(){
            return{
                searchValue:""
            }
        }
    }
</script>
<style lang="scss" scoped>

    .warp{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        .avatar{
            padding: 0 20px;
        }
        .login{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-dropdown-link {
                cursor: pointer;
                color: #409EFF;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
        }
    }
</style>