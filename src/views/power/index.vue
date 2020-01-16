<template>
	<div class="warp" v-loading='loading'>
    <div class="btn">
        <el-button type="primary" @click="addItem" icon="el-icon-edit">新增</el-button>
    </div>
    <div class="data">
      <el-table
        :data="list"
        fit
        @row-click='showParent'
        align="center"
        style="width: 100%"
      >
        <el-table-column
                        prop="description"
                        label="内容"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="url"
                        label="地址"
                        >
                        
                    </el-table-column>
                    <el-table-column
                        prop="sort"
                        label="排序"
                        >
                    </el-table-column>                        
                    <el-table-column
                        align="right"
                        width="150px"
                        >
                        <template slot="header" slot-scope="scope">
                            <el-input
                                size="mini"
                                v-model="searchDicValue"
                                @input="searchDic"
                                placeholder="输入关键字搜索">
                            </el-input>
                        </template>
                        <template slot-scope="scope">
                            <el-button type="primary" @click.stop="addItem(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button>
                        </template>
                        
                    </el-table-column>
      </el-table>
    </div>
    <el-dialog
       width="50%"
        center
      :visible.sync="addMune"
      :before-close="closeEdit"
    >
      <el-form label-width="100px">
               <el-form-item label="内容:">
                   <el-input  v-model="addMuneInfo.description"></el-input>
               </el-form-item>
               <el-form-item label="地址:">
                   <el-input  v-model="addMuneInfo.url"></el-input>
               </el-form-item>
                <el-form-item label="编号:">
                   <el-input  v-model="addMuneInfo.type"></el-input>
               </el-form-item>
               <el-form-item label="菜单排序:">
                   <el-input  v-model="addMuneInfo.sort"></el-input>
               </el-form-item>
                 
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>

    </el-dialog>
	</div>
</template>

<script>
  import {
    byUserMenu,
    userMenu,
    updataMenu,
    deleteMenu,
    menuList
} from '@/api/menu'
let initMuneValue = {
  description:'',
  url:'',
  type:'',
  sort:''
}
  export default {
    created(){
      this.getList({})
    },
    methods: {
      async getList(obj){
        try {
          this.loading = true;
          let res = await menuList(obj);
          this.list = res.data;
       
        } catch (error) {
          
        }
        this.loading = false;
      },
      closeEdit(){
        this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.addMune = false;
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      },
      addSure(){
        this.$confirm('是否确认添加页面?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                   let res=  await updataMenu(this.addMuneInfo)
                  this.$message.success(res.returnMsg)
                  this.getList({})
                  this.addMune = false;
                  
                }).catch((e) => {
                
                       
            });
      },
      addItem(item){
        if(item){//修改
          this.addMuneInfo = {...item};
        }else{//新增
          this.addMuneInfo = {...initMuneValue};
        };
        this.addMune = true;

      },
      searchDic(value){

      },
      showParent(item){

      },
      delteItem(item){
        this.$confirm('是否确认删除页面?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                   let res=  await deleteMenu({id:item.id})
                  this.$message.success(res.returnMsg)
                  this.getList({})
                  
                }).catch((e) => {
                
                       
            });
        deleteMenu
      }
    },
    data() {
      return {
        list:[],
        addMune:false,
        searchDicValue:'',
        addMuneInfo:{},
        loading:false
      };
    }
  };
</script>

<style lang="scss" scoped>
    .btn{
        text-align: left;
       
    }
    .data{
       padding-top:20px; 
    }
</style>
