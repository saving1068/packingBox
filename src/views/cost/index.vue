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
                        prop="name"
                        label="类型"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="gram"
                        label="克数"
                        >
                    </el-table-column>
                    
                    <el-table-column
                        prop="unitPrice"
                        label="单价/费用"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="名称"
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
      <!-- 新增费用 -->
        <el-dialog
           
            title="新增费用"
            :visible.sync="costChange"
            width="500px"
            center
            :before-close="addClose">
              <div class="center">
                <el-form label-width="100px"  size='mini'>
               <el-form-item label="类型:">
                   <el-radio-group v-model="addItemInfo.type">
                        <el-radio :label="1">面纸类型费用</el-radio>
                        <el-radio :label="2">坑纸类型费用</el-radio>
                        <el-radio :label="3">表面处理费用</el-radio>
                    </el-radio-group>
               </el-form-item>
                <el-form-item label="克数:" >
                   <el-input  v-model="addItemInfo.gram"></el-input>
               </el-form-item>
               <el-form-item label="单价/费用:">
                   <el-input  v-model="addItemInfo.unitPrice"></el-input>
               </el-form-item>
                <el-form-item label="名称:">
                   <el-input  v-model="addItemInfo.name"></el-input>
               </el-form-item>
                 
           </el-form> 
           </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>
		<!-- <el-tree
  :data="data"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

<div class="buttons">
  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
  <el-button @click="resetChecked">清空</el-button>
</div> -->
	</div>
</template>

<script>
import {updataCost,costDetail,deleteCost,costList} from '@/api/cost'

let addItemInfo = {
 name:'',gram:'',unitPrice:'',type:''
}
  export default {
    created(){
      this.loading = true;
      this.getList()
      this.loading = false;
    },
    methods: {
      addClose(){
        this.$confirm('取消新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.costChange = false;
        }).catch(() => {
                
        });
      },
      addSure(){
        let tips = this.addItemInfo.id?'是否确认修改费用?':'是否确认新增费用?';
            let success = this.addItemInfo.id?'修改费用成功':'新增费用成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                     
                      //  console.log(this.addItemInfo)
                     if(this.addItemInfo.name
                     &&this.addItemInfo.type
                     &&this.addItemInfo.unitPrice
                     ){
                       if(this.addItemInfo.type !=3){
                           if(!this.addItemInfo.gram){
                                return this.$message.warning('请填写克数')
                           }
                           
                       }    
                      
                       console.log(this.addItemInfo)
                       // if(this.addItemInfo.id){//修改
                            await updataCost(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo = {}
                            this.getList({})
                         this.$message.success(success);
                         this.costChange = false;
                       
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
          let tips = '是否确认删除费用';
            let success = '删除费用成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deleteCost({id:item.id})
                        
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
           let res =  await costDetail({id:item.id})
           let {name,gram,unitPrice,type,id} = {...res.data}
           
            this.addItemInfo = {name,gram,unitPrice,type,id}
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.costChange =true;
        },
        showParent(){

        },
    async getList(){
      let res = await costList();
      this.list = res.data;
      },
    },

    data() {
      return {
        loading:false,
        searchRoleValue:'',
        costChange:false,
        addItemInfo:{
        },
        list:[],
        treeData:[],
      };
    }
  };
</script>

<style lang="scss" scoped>
    .table{
        min-width: 800px;
    }
</style>