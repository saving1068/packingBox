<template>
  <div class="warp">
      <div class="btn">
          <el-button type="primary" @click="addItem" icon="el-icon-edit">{{ifAdd?'完成':'新增'}}</el-button>
      </div>
      
      <div class="data space-between">
        
            <!-- <ul class="data-list"> -->
                <el-scrollbar >
                    <el-table
                    :data="list"
                    fit
                    
                    align="center"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="名字"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sign"
                        label="字典"
                        >
                    </el-table-column>
                    <el-table-column
                        align="right"
                        width="150px"
                        >
                        <template slot="header">
                            <el-input
                            size="mini"
                            placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button type="primary" @click="ifChnageItem(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" size="mini">删除</el-button>
                        </template>
                        
                    </el-table-column>
                    </el-table>
               <!-- <li class="item space-between" v-for="(item,index) in list" :key="index">
                   <div>{{item.name}}</div>
                   <div>{{item.sign}}</div>
                    <el-button type="primary" @click="ifChnageItem" size="mini">修改</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </li>  -->
                 </el-scrollbar>
            <!-- </ul> -->
       
        <div class="item-info" v-show="ifChnage">
            <div class="btn">
                <el-button type="primary" @click="ifItemAddValue()" icon="el-icon-edit">新增</el-button>
            </div>
                <el-scrollbar >
                     <el-table
                    :data="itemList"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="名字"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="info"
                        label="内容"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="key"
                        label="key">
                    </el-table-column>
                     <el-table-column
                        align="center"
                         label="操作"
                        >
                            <el-button type="primary" @click="ifItemAddValue(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" size="mini">删除</el-button>                   
                    </el-table-column>
                    </el-table>
                </el-scrollbar>
        </div>
      </div>
        <!-- 修改字典中的内容 -->
        <el-dialog
             width="50%"
            center
            :visible.sync="ifItemAdd"
            :before-close="itemAddClose"
        >
             <el-form label-width="100px">
               <el-form-item label="key:">
                   <el-input  v-model="itemChangeInfo.key"></el-input>
               </el-form-item>
               <el-form-item label="值:">
                   <el-input  v-model="itemChangeInfo.value"></el-input>
               </el-form-item>
                 
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="itemAddClose">取 消</el-button>
                <el-button type="primary" @click="itemAddSure">确 定</el-button>
            </span>

        </el-dialog>


      <!-- 新增字典 -->
        <el-dialog
            title="新增字典"
            :visible.sync="ifItemChange"
            width="30%"
            center
            :before-close="addClose">
               <el-form label-width="100px">
               <el-form-item label="名字:">
                   <el-input  v-model="addItemInfo.name"></el-input>
               </el-form-item>
               <el-form-item label="字典标识:">
                   <el-input  v-model="addItemInfo.sign"></el-input>
               </el-form-item>
                 
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import {listDic,updateDic,deleteDic,detailDic,deleteItemDic,updateItemDic} from '@/api/admin'
let initItemChangeInfo = {
                key:"",
                value:''
    }
let initAddItemInfo = {
            name:'',
            sign:''
        }
export default {
    
    data(){
        return{
            ifAdd:false,
            ifChnage:false,
            ifItemChange:false,
            ifItemAdd:false,
            item:{
                name:'',
                info:"",
                key:'',
                },
            itemChangeInfo:{
                key:"",
                value:''
            },
            addItemInfo:{
                name:'',
                sign:''
            },
            itemList:[],
            list:[
                
            ],
            choiseItem:{

            }
        }
    },
    created(){
        this.getList({})
    },
    methods:{
        ifItemAddValue(item){
            if(item){
                this.itemChangeInfo = {...initItemChangeInfo,pId:item.id}    
            }else{
                this.itemChangeInfo = {...initItemChangeInfo}    
            }
           
            this.ifItemAdd = true;
        },
        itemAddSure(){
            let tips = this.itemChangeInfo.id?'是否确认修改字典?':'是否确认新增字典?';
            let success = this.itemChangeInfo.id?'修改字典成功?':'新增字典成功?';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        if(this.addItemInfo.id){//修改
                            let obj = {
                                ...this.addItemInfo,
                              
                            }
                            await updateItemDic(this.addItemInfo);
                        }else{//新增
                            console.log(this.addItemInfo)
                            await updateDic(this.addItemInfo);
                           
                        }

                         this.$message.success(success);
                         this.ifAdd = false;
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
        },
        itemAddClose(){
            this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.ifItemAdd = false;
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        addItemList(){

        },
        async getList(obj){
            
            let res = await listDic(obj)
            this.list = res.data;
            console.log(res)
        },
        addSure(){
            let tips = this.addItemInfo.id?'是否确认修改字典?':'是否确认新增字典?';
            let success = this.addItemInfo.id?'修改字典成功?':'新增字典成功?';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        if(this.addItemInfo.id){//修改
                            await updateDic(this.addItemInfo);
                        }else{//新增
                            console.log(this.addItemInfo)
                            await updateDic(this.addItemInfo);
                           
                        }

                         this.$message.success(success);
                         this.ifAdd = false;
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });

        },
        addClose(){
         this.$confirm('取消新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.ifAdd = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
         ifChnageItem(item){
            if(this.ifChnage){
                console.log(item)
            }else{
                this.ifChnage = true;
            }
        },
        addItem(){
            if(this.ifAdd){
                console.log(this.item)
            }else{
                this.addItemInfo = {...initAddItemInfo}
                this.ifAdd = true;
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .btn{
        text-align: left;
       
    }
    .data{
        padding-top:20px; 
        .data-list{
           
                width: 250px;
            .item{
                padding: 5px 0;
            }
        }
       
    }
   
</style>