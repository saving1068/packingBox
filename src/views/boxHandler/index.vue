<template>
	<div class="warp"  v-loading='loading'>
     <div class="btn">
          <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
      </div>
      <div class="data space-between">
        <div class="table">
          <el-scrollbar >
                    <el-table
                    :data="list"
                    fit
                    @row-click='showParent'
                    align="center"
                    style="width: 100%">
                    <el-table-column
                        prop="caseName"
                        label="箱型名称"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="lengthMath"
                        label="面纸长算法"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="widthMath"
                        label="面纸宽算法"
                        >
                    </el-table-column>
                    <el-table-column
                        align="right"
                        width="300px"
                        >
                        <template slot="header" slot-scope="scope">
                            <el-input
                                size="mini"
                                v-model="searchRoleValue"
                                @input="searchRole"
                                placeholder="输入关键字搜索">
                            </el-input>
                        </template>
                        <template slot-scope="scope">
                            <el-button type="primary" @click.stop="addItem(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button>
                        </template>
                        
                    </el-table-column>
                    </el-table>
                 </el-scrollbar>
        </div>
        <!-- <div class="tree" v-show="sonShow">
          <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
        </div> -->
        
      </div>
      <!-- 新增箱型 -->
        <el-dialog
           
            title="新增箱型"
            :visible.sync="boxChange"
            width="500px"
            center
            :before-close="addClose">
              <div class="center">
                <el-form label-width="100px"  size='mini'>
                <el-form-item label="箱型名称:" >
                   <el-input  v-model="addItemInfo.caseName"></el-input>
               </el-form-item>
               <el-form-item label="面纸长算法:">
                   <el-input  v-model="addItemInfo.lengthMath"></el-input>
               </el-form-item>
                <el-form-item label="面纸宽算法:">
                   <el-input  v-model="addItemInfo.widthMath"></el-input>
               </el-form-item>
                 
           </el-form> 
           </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>

	</div>
</template>

<script>
import {updataBox,boxDetail,deleteBox,boxList} from '@/api/box'

let addItemInfo = {
 caseName:'',lengthMath:'',widthMath:''
}
  export default {
    created(){
     
      this.getList()
    },
    methods: {
      addClose(){
        this.$confirm('取消新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.boxChange = false;
        }).catch(() => {
                
        });
      },
      addSure(){
        let tips = this.addItemInfo.id?'是否确认修改箱型?':'是否确认新增箱型?';
            let success = this.addItemInfo.id?'修改箱型成功':'新增箱型成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                     
                      //  console.log(this.addItemInfo)
                     if(this.addItemInfo.caseName
                     &&this.addItemInfo.lengthMath
                     &&this.addItemInfo.widthMath
                     ){
                       
                      
                       console.log(this.addItemInfo)
                       // if(this.addItemInfo.id){//修改
                            await updataBox(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo = {}
                            this.getList({})
                         this.$message.success(success);
                         this.boxChange = false;
                       
                     }else{
                       return this.$message.warning('请填写所有信息')
                     }
                    
                        
                    } catch (error) {
                        console.log(error)
                    }
                    
                
                }).catch(() => {
                
                });
      },
      async searchRole(row, column, event){
        try {
             let res = await accountDetail({id:row.roleId})
            //   this.sonShow = true;
              
            //   this.treeData  = res.data;
        } catch (error) {
          
        }
       
      },
      delteItem(item){
        console.log(item)
          let tips = '是否确认删除箱型';
            let success = '删除箱型成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deleteBox({id:item.id})
                        
                            this.getList({})
                         this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                
                });
      },
        async addItem(item){
          if(item){
            // console.log(item)
           let res =  await boxDetail({id:item.id})
           let {caseName,lengthMath,widthMath,id} = {...res.data}
           
            this.addItemInfo = {caseName,lengthMath,widthMath,id}
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.boxChange =true;
        },
        showParent(){

        },
    async getList(){
       this.loading = true;
      let res = await boxList();
      this.list = res.data;
       this.loading = false;
      },
    },

    data() {
      return {
        loading:false,
        searchRoleValue:'',
        boxChange:false,
        addItemInfo:{
        },
        list:[],
      };
    }
  };
</script>

<style lang="scss" scoped>
    .table{
        min-width: 800px;
    }
</style>