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
        <el-form-item label="订单流水号">
          <el-input
            clearable
            size="mini"
            placeholder="请输入内容"
            v-model="searchValue.odSerialNumber"
          >
          
        </el-input>
        
        </el-form-item>
        <!-- <el-form-item label="客户">
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
        </el-form-item> -->
      </el-form>
    </div>
    <div class="center">
        <el-button type="primary"  @click="getList">查询</el-button>
      </div>
    <div class="table">
      <el-table :data="tableData" fit >
        <el-table-column prop="odName" align='center' label="订单名称" ></el-table-column>
        <el-table-column prop="odSerialNumber" align='center' label="订单编号"  ></el-table-column>
        <el-table-column prop="alreadyCount" align='center' label="已生产数量"></el-table-column>
        <el-table-column prop="createTime" align='center' label="排期日期"></el-table-column>
        <el-table-column prop="odSetdate" align='center' label="是否完成生产">
            <template slot-scope="scope">
                {{scope.row.fdStatus == 0?'是':'否'}}
            </template>
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button
              style="margin-left:10px"
              v-if="scope.row.fdStatus !=0"
              type="text"
              size="mini"
              @click="scope.row.visible = true"
              >
              完成
            </el-button>
             <el-popover
            placement="bottom"
            width="160"
            v-model="scope.row.visible">
            <span>是否确定入库完成</span>
            <div style="text-align: right; margin: 0;padding-top:20px">
              <el-button type="info" size="mini" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" :loading="scope.row.loading" size="mini" @click="endSure(scope.row)">确定</el-button>
            </div>
          </el-popover>
             <el-button
             style="margin-left:10px"
             v-if="scope.row.fdStatus !=0"
              @click.native.prevent="addPd(scope.row)"
              type="text"
              size="mini">
              入库
            </el-button>
           
           <el-button
              type="text"
              size="mini"
              @click="scope.row.delVisible = true"
              >
              删除
            </el-button>
            <el-popover
            placement="bottom"
            width="160"
            v-model="scope.row.delVisible">
            是否确定删除该生产数据？
            <div style="text-align: right; margin: 0">
               <el-button type="info" size="mini" @click="scope.row.delVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deletePdschedule(scope.row)">确定</el-button>
            </div>
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
    <goods-history
      title="成品入库"
      :list='history'
      :dialogVisible='dialogVisible'
      v-if="dialogVisible"
      :modelName='modelName'
      :chargingType='detail'
      @updata='getList'
      @closeDialog='dialogVisible = false'
    ></goods-history> 
  </div>
</template>

<script>
import {updataPdschedule,
    pdscheduleDetail,
    deletePdschedule,
    pdscheduleList} from '@/api/pdschedule'
    import {addPdstock,addPdstockHistory,addPdstockDetail} from '@/api/pdstock'
import goodsHistory from '@/components/goodsHistory'
    // import {customerList} from '@/api/customer'
    // import {accountList} from '@/api/user'
export default {
  components:{
    goodsHistory
  },
  data() {
    return {
      searchValue:{
        pdName:"",odSerialNumber:'',
        customer:"",merchandiser:"",
        odFinishdateBegin:'',odFinishdateEnd:"",
        page:1,limit:10
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
      },
      addNum:0,
      history:[],
      dialogVisible:false,
      modelName:"",
      detail:{}
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
    async endSure(item){
      try {
        
          item.loading = true
          console.log(item.pdId)
          let obj = {
            odId:item.odId,
            id:item.id,
            fdStatus:0
          }
          let res = await  updataPdschedule(obj);
          this.$message.success(res.returnMsg)
          item.loading = false;
          item.visible= false;
          this.getList()
      } catch (error) {
        item.loading = false
      }
      
    },
    async addPd(item){
      // if(item.alreadyCount !=0){
        let res = await  addPdstockHistory({odId:item.odId});
        this.history = res.data;
        this.modelName = item.odName;
        this.detail = item;
        //   console.log(res)\
         this.dialogVisible= true;

      // }else{
      //   this.$message.warning("没有成品，请尽快生产")
      // }
    },
    async dict() {
       try {
          this.loading = true;
          // let customer = await customerList();

          // this.customerList = customer.data;
          // let account = await accountList();
          // this.merchandiserList = account.data;
           await this.getList()
       this.loading =false;
      } catch (error) {
        console.log(error)
      }
    },

    async getList(){
      try {
        
        let res = await pdscheduleList(this.searchValue);
        res.data.map((item)=>{
           item.delVisible = false;
          item.visible = false;
          item.loading = false;
        })
        console.log(res.data,2131242)
        this.tableData = res.data;
        this.total = res.total;
      } catch (error) {
        
      }
      
    },
    async deletePdschedule(item){
      try {
        console.log(item)
        let res = await deletePdschedule({id:item.id})
        this.delVisible =false;
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

