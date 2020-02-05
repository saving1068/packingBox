<template>
  <div class="warp" v-loading='loading'>
    <div class="search">
      <el-form inline size="mini">
        <el-form-item label="订单名称">
          <el-input
            clearable
            size="mini"
            placeholder="请输入内容"
            v-model="searchValue.odName"
          >
         
        </el-input>
        </el-form-item>
        <el-form-item label="订单流水号">
          <el-input
            clearable
            size="mini"
            placeholder="请输入内容"
            v-model="searchValue.serialNumber"
          >
          
        </el-input>
        
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchValue.customerId" placeholder="请选择">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟单员">
          <el-select v-model="searchValue.merchandiserId" placeholder="请选择">
            <el-option
              v-for="item in merchandiserList"
              :key="item.id"
              :label="item.contactName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="交货日期">
            <el-date-picker
              v-model="detevalue"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              @change="deteChange"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
      </el-form>
       <el-button type="primary" @click="getList">查询</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" fit >
        <el-table-column prop="odName" align='center' label="名称" width="180"></el-table-column>
        <el-table-column prop="serialNumber" align='center' label="流水号" width="180"></el-table-column>
        <el-table-column prop="customerId" align='center' label="客户"></el-table-column>
        <el-table-column prop="odFinishdateEnd" align='center' label="数量"></el-table-column>
        <el-table-column prop="odName" align='center' label="金额"></el-table-column>
        <el-table-column prop="odSetdate" align='center' label="订单日期"></el-table-column>
        <el-table-column prop="odFinishdate" align='center' label="交货日期"></el-table-column>
        <el-table-column prop="merchandiserId" align='center' label="跟单员"></el-table-column>
        <el-table-column prop="customerId" align='center' label="发起人"></el-table-column>
        <el-table-column prop="customerId" align='center' label="订单状态">123</el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent=""
              type="text"
              size="mini">
              完成
            </el-button>
            <el-button
              @click.native.prevent="goToDetail(scope.row)"
              type="text"
              size="mini">
              详情
            </el-button>
             <el-button
              @click.native.prevent=""
              type="text"
              size="mini">
              排产
            </el-button>
            <el-button
              @click.native.prevent=""
              type="text"
              size="mini">
              确认采购
            </el-button>
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
    
  </div>
</template>

<script>
import {orderDetail,
    deleteOrder,
    orderList} from '@/api/order'
    import {customerList} from '@/api/customer'
    import {accountList} from '@/api/user'
export default {
  data() {
    return {
      searchValue:{
        odName:"",serialNumber:'',
        customer:"",merchandiser:"",
        odFinishdateBegin:'',odFinishdateEnd:""
      },
      loading:false,
      detevalue: "",
      tableData: [],
      total:0,
      merchandiserList:[],
      customerList:[],
      requestInfo:{
        contractNumber:'',
        ctContractNumber:''
      }
    };
  },
  async created(){
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
          let customer = await customerList();

          this.customerList = customer.data;
          let account = await accountList();
          this.merchandiserList = account.data;
          this.getList()
       this.loading =false;
      } catch (error) {
        console.log(error)
      }
    },

    async getList(){
      try {
        
        let res = await orderList(this.searchValue);
        this.tableData = res.data;
        this.total = res.total;
      } catch (error) {
        
      }
      
    },
    deteChange(value){
      console.log(value)
      this.searchValue.odFinishdateBegin = value[0];
      this.searchValue.odFinishdateEnd =  value[1];
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
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

