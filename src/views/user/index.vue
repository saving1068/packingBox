<template>
  <div class="warp">
      <div class="btn">
          <el-button type="primary" @click="addItem" icon="el-icon-edit">{{ifAdd?'完成':'新增'}}</el-button>
      </div>
      
      <div class="data space-between">
        
            <ul class="data-list">
                <el-scrollbar >
               <li class="item space-between">
                   <div>name</div>
                   <div>info</div>
                   <div>key</div>
                    <el-button type="primary" size="mini">修改</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </li> 
                 </el-scrollbar>
            </ul>
       
        <div class="item-info" v-show="ifAdd">
           <el-form label-width="80px">
               <el-form-item label="名字:">
                   <el-input></el-input>
               </el-form-item>
                <el-form-item label="内容:">
                   <el-input></el-input>
               </el-form-item>
                <el-form-item label="key:">
                   <el-input></el-input>
               </el-form-item>
           </el-form>
        </div>
      </div>
  </div>
</template>

<script>
import {listDic,updateDic,deleteDic,detailDic,deleteItemDic,updateItemDic} from '@/api/admin'
export default {
    data(){
        return{
            ifAdd:false,
            item:{
                name:'',
                info:"",
                key:'',
                }
        }
    },
    created(){
        this.getList()
    },
    methods:{
        async getList(){
            let res = await listDic()
        },
        addItem(){
            if(this.ifAdd){
                console.log(this.item)
            }else{
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
            
        }
       
    }
   
</style>