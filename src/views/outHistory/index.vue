<template>
  <div class="warp" v-loading='loading'>
    <div class="search center">
      <el-form inline size="mini">
        <el-form-item label="订单名称">
          <el-input
            clearable
            size="mini"
            placeholder="请输入内容"
            v-model="searchValue.pdName"
          >
         
        </el-input>
        </el-form-item>

      </el-form>
    </div>
    <div class="center">
        <el-button type="primary"  @click="getList">查询</el-button>
      </div>
    <div class="table">
      <el-table :data="tableData" fit >
        <el-table-column prop="pdName" align='center' label="名称" ></el-table-column>
        <!-- <el-table-column prop="serialNumber" align='center' label="流水号"  ></el-table-column> -->
        <!-- <el-table-column prop="customer" align='center' label="客户"></el-table-column> -->
       
        <el-table-column  prop="osCount" align='center' label="出库数量"></el-table-column>
        <!-- <el-table-column prop="odMoney" align='center' label="金额(元)"></el-table-column> -->
        <!-- <el-table-column prop="odSetdate" align='center' label="订单日期"></el-table-column> -->
        <el-table-column prop="createTime" align='center' label="创建时间"></el-table-column>
        <!-- <el-table-column prop="merchandiser" align='center' label="跟单员"></el-table-column> -->
        <el-table-column prop="lastUpdateAuthor" align='center' label="发起人"></el-table-column>
        <!-- <el-table-column prop="finishStatusStr" align='center' label="订单状态">
       
        </el-table-column> -->
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              v-model="scope.row.visible">
              <p>确定删除该订单吗？</p>
              <div style="text-align: center; margin: 0">
                 <el-button  size="mini" @click.native.prevent="scope.row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" :loading='delLoading'  @click.native.prevent="deleteFeed(scope.row)">确定</el-button>
              </div>
              <el-button 
              type="text"
              size="mini" slot="reference">删除</el-button>
            </el-popover>
            <!-- <el-button
              @click.native.prevent=""
              type="text"
              size="mini">
              详情
            </el-button> -->
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
    </div>


    <!-- 排产 -->

  </div>
</template>

<script>
import {outPdstockHistory,addPdstockHistory,outStockHistoryDelete}from '@/api/pdstock'
  import {customerList} from '@/api/customer'
    import {accountList} from '@/api/user'
export default {
  data() {
    return {
      searchValue:{
        pdName:"",serialNumber:'',
        customer:"",merchandiser:"",
        odFinishdateBegin:'',odFinishdateEnd:"",
        page:1,limit:10
      },
      customerList:[],
      merchandiserList:[],
      detevalue:'',
      loading:false,
      tableData: [],
      total:0,
      delLoading:false,
        type:0
    };
  },
  async created(){
      this.type = this.$route.query.type
   this.dict()
    
  },
  methods:{
    goToDetail(item){
      console.log(item)
      this.$router.push({
        name:'orderDetail',
        query:{
          id:item.id
        }
      }).catch( err =>{
        console.log(err)
      })
    },

    async dict() {
       try {
          this.loading = true;
        //   let customer = await customerList();

        //   this.customerList = customer.data;
        //   let account = await accountList();
        //   this.merchandiserList = account.data;
          this.getList()
       this.loading =false;
      } catch (error) {
        console.log(error)
      }
    },

    async getList(){
      try {
        //   console.log(window.location.href)

      
        let res = await  outPdstockHistory(this.searchValue)
     
        this.tableData = res.data;
        console.log(this.tableData)
        this.total = res.total;
      } catch (error) {
        console.log(error)
      }
      
    },
    async deleteFeed(item){
      try {
        console.log(item)
        this.delLoading= true
        
        let res = await  outStockHistoryDelete({id:item.id})
        
      
        this.delLoading= false
        this.searchValue.page =1;
        this.$message.success(res.returnMsg)
        this.getList()
      } catch (error) {
        
      }
    },
    deteChange(value){
      console.log(value)
      this.searchValue.odFinishdateBegin = value[0];
      this.searchValue.odFinishdateEnd =  value[1];
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.pdschedule = false;
          })
          .catch(_ => {});
      },
     handleSizeChange(val) {
       
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.searchValue.page = val;
       this.getList()
        console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style lang="scss" scoped>
.search {
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  // height: 100px;
  // flex-direction: column;
}
.table{
	padding: 0 20px;
}
</style>

