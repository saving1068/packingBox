<template>
	<div class="warp"  v-loading='loading'>
     <div class="btn">
          <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
      </div>
      <div class="data space-between">
        <div class="table">
          <!-- <el-scrollbar > -->
                    <el-table
                    :data="list"
                    fit
                    @row-click='showParent'
                    align="center"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="供应商名称"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="address"
                        label="供应商地址"
                        >
                    </el-table-column>
                    
                    <el-table-column
                        prop="contact"
                        label="联系人"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="contactNumber"
                        label="联系人电话"
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
                 <!-- </el-scrollbar> -->
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
      <!-- 新增供应商 -->
        <el-dialog
           
            title="新增供应商"
            :visible.sync="supplierChange"
            width="500px"
            center
            :before-close="addClose">
              <div class="center">
                <el-form label-width="100px"  size='mini'>
               <el-form-item label="供应商名称:">
                   <el-input  v-model="addItemInfo.name"></el-input>
               </el-form-item>
                <el-form-item label="供应商地址:">
                   <el-input  v-model="addItemInfo.address"></el-input>
               </el-form-item>
               <el-form-item label="联系人:">
                   <el-input  v-model="addItemInfo.contact"></el-input>
               </el-form-item>
                <el-form-item label="联系号码:">
                   <el-input  v-model="addItemInfo.contactNumber"></el-input>
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
import {updataSupplier,supplierDetail,deleteSupplier,supplierList} from '@/api/supplier'

let addItemInfo = {
 contact:'',contactNumber:'',name:'',address:''
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
          this.supplierChange = false;
        }).catch(() => {
                
        });
      },
      addSure(){
        let tips = this.addItemInfo.id?'是否确认修改供应商?':'是否确认新增供应商?';
            let success = this.addItemInfo.id?'修改供应商成功':'新增供应商成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                     
                      //  console.log(this.addItemInfo)
                     if(this.addItemInfo.name
                     &&this.addItemInfo.contactNumber
                     &&this.addItemInfo.contact
                     ){
                       
                      
                       console.log(this.addItemInfo)
                       // if(this.addItemInfo.id){//修改
                            await updataSupplier(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo = {}
                            this.getList({})
                         this.$message.success(success);
                         this.supplierChange = false;
                       
                     }else{
                       return this.$message.warning('请为该供应商填写所有信息')
                     }
                    
                        
                    } catch (error) {
                        console.log(error)
                    }
                    
                
                }).catch(() => {
                
                });
      },
      async searchRole(value){
        try {
            let obj ={
                keyWord:value
                // sign:value
            }
            this.getList(obj)
        } catch (error) {
          
        }
       
      },
      delteItem(item){
        console.log(item)
          let tips = '是否确认删除供应商';
            let success = '删除供应商成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deleteSupplier({id:item.id})
                        
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
           let res =  await supplierDetail({id:item.id})
           let {contact,contactNumber,name,address,id} = {...res.data}
           
            this.addItemInfo = {contact,contactNumber,name,address,id}
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.supplierChange =true;
        },
        showParent(){

        },
    async getList(obj){
       this.loading = true;
      let res = await supplierList(obj);
      this.list = res.data;
       this.loading = false;
      },
    },

    data() {
      return {
        loading:false,
        searchRoleValue:'',
        supplierChange:false,
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