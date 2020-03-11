<template>
  <div class="warp" v-loading='loading'>
    <div class="search center">
      <el-form inline size="mini">
        <el-form-item label="送货人">
          <el-select v-model="searchValue.dgMan" placeholder="请选择">
            <el-option
              v-for="item in merchandiserList"
              :key="item.id"
              :label="item.contactName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-select v-model="searchValue.customerId" placeholder="请选择">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.contact"
              :value="item.id"
            ></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="送货时间">
           <el-date-picker
            @change="dgTime"
            v-model="dgTimeValue"
            type="daterange"
            range-separator="至"
             value-format='yyyy-MM-dd'
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <!-- <el-date-picker
            v-model="searchValue.dgTime"
            type="date"
            value-format='yyyy-mm-dd'
            placeholder="选择日期">
          </el-date-picker> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="center">
        <el-button type="primary" :loading="dialogVisible" @click="search">查询</el-button>
      </div>
    <div class="table">
      <el-table :data="tableData" fit >
         <el-table-column prop="dgMan" align='center' label="送货人" ></el-table-column>
        <!-- <el-table-column prop="serialNumber" align='center' label="流水号" ''></el-table-column> -->
        <!-- <el-table-column prop="customer" align='center' label="客户"></el-table-column> -->
        <el-table-column prop="dgTime" align='center' label="送货时间"></el-table-column>
         <el-table-column prop="customerName" align='center' label="客户名称"></el-table-column>
        <!-- <el-table-column prop="odMoney" align='center' label="金额(元)"></el-table-column> -->
        <!-- <el-table-column prop="odSetdate" align='center' label="订单日期"></el-table-column> -->
        <el-table-column prop="serialNumber" align='center' label="流水号"></el-table-column>
        <el-table-column prop="money" align='center' label="金额"></el-table-column>
        <el-table-column prop="createTime" align='center' label="创建时间"></el-table-column>
        
        <!-- <el-table-column prop="finishStatusStr" align='center' label="订单状态">
       
        </el-table-column> -->
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              @click.native.prevent=""
              type="text"
              size="mini">
              修改
            </el-button> -->
             <el-button
              @click.native.prevent="getDetail(scope.row)"
              type="text"
              size="mini">
              详情
            </el-button>
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
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style=" padding:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
    </el-pagination>
    </div>


    <!-- 送货单 -->
    <el-dialog
      title="送货单"
      center
      :visible.sync="dialogVisible"
      width="80%"
      >
        
      <el-table :data="searchData.data" fit >
        <el-table-column prop="dgMan" align='center' label="送货人" ></el-table-column>
        <el-table-column prop="dgTime" align='center' label="送货时间"></el-table-column>
        <el-table-column prop="customerName" align='center' label="客户名称"></el-table-column>
        <el-table-column prop="serialNumber" align='center' label="流水号"></el-table-column>
        <el-table-column prop="money" align='center' label="金额"></el-table-column>
        <el-table-column prop="createTime" align='center' label="创建时间"></el-table-column>
      </el-table>
      <div class="totalMoney">
        总价:{{searchData.totalMoney?searchData.totalMoney:0}}元
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,searchData={}">关闭</el-button>
      </span>
    </el-dialog>


    <!-- 送货单详情 -->
    <el-dialog
      title="送货单"
      center
      :visible.sync="detailShow"
      width="80%"
      >
        <el-form inline label-width="180px">
          <el-form-item label="送货人">
            <span>{{detail.dgMan}}</span>
          </el-form-item>
          <el-form-item label="送货时间">
            <span>{{detail.dgTime}}</span>
          </el-form-item>
          <el-form-item label="客户名称">
            <span>{{detail.customerName}}</span>
          </el-form-item>
          <el-form-item label="流水号">
            <span>{{detail.serialNumber}}</span>
          </el-form-item>
          <el-form-item label="金额(元)" >
            <span>{{detail.money}}</span>
          </el-form-item>
        </el-form>
        <div class="center" style="padding:10px 0;line-height: 24px;
    font-size: 18px;
    color: #303133;">送货单信息</div>
        <div class="center" style="padding:0 90px;">
           <el-table :data="detail.list" fit>
              <el-table-column prop="pdName" align='center'  label="订单名称"></el-table-column>
              <el-table-column prop="ctContractNumber" align='center' label="客户合同编号"></el-table-column>
              <el-table-column prop="contractNumber" align='center' label="合同编号"></el-table-column>
              <el-table-column prop="model" align='center' label="规格"></el-table-column>
              <el-table-column prop="unitPrice" align='center' label="单价(元)" ></el-table-column>
              <el-table-column prop="count" align='center' label="数量" ></el-table-column>
              <el-table-column prop="money" align='center' label="金额(元)"></el-table-column>
              <el-table-column prop="unit" align='center' label="单位"></el-table-column>
            </el-table>
        </div>
         
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false,detail={}">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {updataDelier,delierDetail,deleteDelier,delierList}from '@/api/deliver'
  import {customerList} from '@/api/customer'
    import {accountList} from '@/api/user'
export default {
  data() {
    return {
      searchValue:{
          dgMan:'',
          customerId:'',
          dgTimeStart:"",
          dgTimeEnd:"",
      },
      dialogVisible:false,
      customerList:[],
      dgTimeValue:'',
      merchandiserList:[],
      loading:false,
      tableData: [],
      searchData:{
        data:[],
        totalMoney:0
      },
      detail:{

      },
      detailShow:false,
      total:0,
      delLoading:false

    };
  },
  async created(){
   this.dict()
    
  },
  methods:{
    async getDetail(item){
      
      let res = await delierDetail({id:item.id})
      this.detailShow = true;
      res.data.list.map((sitem)=>{
        sitem.ctContractNumber=sitem.ctContractNumber?sitem.ctContractNumber:'--/'
        sitem.contractNumber=sitem.contractNumber?sitem.contractNumber:'--/'
      })
      this.detail = res.data; 

      console.log(res)
    },
    async search(){
     
       this.dialogVisible = true;
      let res = await delierList(this.searchValue);
     
      this.searchData = res;
      console.log(this.searchData,'111111111111')
    },
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
        let obj = {
          limit:10,
          page:1,
        }
        let res = await delierList(obj);
        this.tableData = res.data;
        console.log(this.tableData)
        this.total = res.total;
      } catch (error) {
        
      }
      
    },
    async deleteFeed(item){
      try {
        console.log(item)
        this.delLoading= true
        let res = await deleteDelier({id:item.id})
        this.delLoading= false
        this.searchValue.page =1;
        this.$message.success(res.returnMsg)
        this.getList()
      } catch (error) {
        
      }
    },
    dgTime(value){
      console.log(value)
      if(value){
        this.searchValue.dgTimeStart = value[0];
      this.searchValue.dgTimeEnd =  value[1];
      }else{
        this.searchValue.dgTimeStart = '';
      this.searchValue.dgTimeEnd =  '';
      }
      
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
.totalMoney{
  display: flex;
  justify-content: flex-end;
  font-size: 28px;
  line-height: 28px;
  padding-top:10px;
}
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

