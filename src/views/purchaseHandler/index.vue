<template>
	<div class="warp"  v-loading='loading'>
     
      <div class="data space-between">
        <div class="table">
          <el-scrollbar >
                    <el-table
                    :data="datalist"
                    fit
                    @row-click='showParent'
                    align="center"
                    style="width: 100%">
                    <el-table-column
                        prop="odName"
                        label="订单名称"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="spName"
                        label="供应商"
                        >
                        </el-table-column>
                         <el-table-column
                        prop="mtLength"
                        label="材料长"
                        >
                        </el-table-column>
                         <el-table-column
                        prop="mtWidth"
                        label="材料宽"
                        >
                        </el-table-column>
                    <el-table-column
                        prop="mtHeight"
                        label="材料高"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="pcCost"
                        label="材料成本"
                        >
                    </el-table-column>
                    
                    <el-table-column
                        prop="pcCount"
                        label="材料数量"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="intoTheCargo"
                        label="入货量"
                        >
                    </el-table-column>
                    <el-table-column
                        label="入货进度"
                        >
                        <template  slot-scope="scope">
                          <!-- {{scope.row}} -->
                           <el-progress :text-inside="true" :stroke-width="24" :percentage="Number(scope.row.progress)" status="success"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createAuthor"
                        label="创建人"
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
                            <el-button type="primary" @click.stop="addItem(scope.row)" size="mini">新增入料</el-button>
                            <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button>
                        </template>
                        
                    </el-table-column>
                    </el-table>
                     <el-pagination
                      style="padding-top:20px;"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-size="10"
                      layout="total, prev, pager, next"
                      :total="total">
                  </el-pagination>
                 </el-scrollbar>
        </div>   
      </div>
      <!-- 采购单 -->
      <charging-list
         v-if="feedChange" 
         :percentage='percentage'  
         :dialogVisible='feedChange' 
         :chargingType='chargingType' 
         :list='list'
            title="入料单"
            @updata='updata'
         @closeDialog='closeDialog'
      >        
      </charging-list>    
	</div>
</template>

<script>
import {purchaseList,purchaseDetail,deletePurchase,updataPurchase} from '@/api/purchase'
import chargingList from '@/components/chargingList'
  export default {
    components:{
        chargingList
    },
    created(){
     
      this.getList(this.searchValue)
    },
    methods: {
     
     async searchRole(value){
        try {
            let obj ={
                keyWord:value,
                page:1
                // sign:value
            }
            this.getList(obj)
        } catch (error) {
          
        }
       
      },
      delteItem(item){
        console.log(item)
          let tips = '是否确认删除采购单';
            let success = '删除采购单成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deletePurchase({id:item.id})
                        
                            this.getList(this.searchValue)
                         this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                
                });
      },
        async addItem(item){
          if(item){
            console.log(item)
            try {
              let res =  await purchaseDetail({id:item.id})
              this.chargingType = res.data;
              res.data.feeds.map(item =>{
                item.mtModelName = res.data.mtModelName
              })
              this.list = res.data.feeds;

              // console.log(res)
              this.percentage = item.progress;
               this.feedChange =true;
            } catch (error) {
              
            }
           
          }
         
        },
        showParent(){

        },
        closeDialog(){
          this.feedChange =false;
        },
        updata(){
           this.getList(this.searchValue)
        },
    async getList(obj){
       this.loading = true;
        let res = await purchaseList(obj);
        res.data.map(item =>{
          item.progress = isNaN(((Number(item.intoTheCargo)/Number(item.pcCount)*100).toFixed(3)/1))?0:((Number(item.intoTheCargo)/Number(item.pcCount)*100).toFixed(3)/1);
          console.log(item.mtId,"mtid")
          item.mtHeight = item.mtHeight?item.mtHeight:"--/"
          item.mtWidth = item.mtWidth?item.mtWidth:"--/"
          item.mtLength = item.mtLength?item.mtLength:"--/"
        })
        
       this.total = res.total;
      
      this.datalist = res.data;
       this.loading = false;
      },
      handleSizeChange(val) {
       
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.searchValue.page = val;
       this.getList(this.searchValue)
        console.log(`当前页: ${val}`);
      }
    },


    data() {
      return {
        loading:false,
        searchRoleValue:'',
        feedChange:false,
        addItemInfo:{
        },
        searchValue:{
        odName:"",serialNumber:'',
        customer:"",merchandiser:"",
        odFinishdateBegin:'',odFinishdateEnd:"",
        page:1,limit:10
      },
        percentage:0,
        status:'exception',
        chargingType:[],
        datalist:[],
        list:[],
        treeData:[],
        total:0
      };
    }
  };
</script>

<style lang="scss" scoped>
    .table{
        min-width: 1000px;
    }
</style>