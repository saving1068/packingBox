<template>
  <div class="warp" v-loading='loading'>
    <div class="search center">
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
        <!-- <el-form-item label="订单流水号">
          <el-input
            clearable
            size="mini"
            placeholder="请输入内容"
            v-model="searchValue.serialNumber"
          >
          
        </el-input>
        
        </el-form-item> -->
        <el-form-item label="合同编号">
          <el-input
            clearable
            size="mini"
            placeholder="请输入内容"
            v-model="searchValue.contractNumber"
          >
          
        </el-input>
        
        </el-form-item>
        <el-form-item label="订单状态:" class="form-inline">
        <el-select v-model="searchValue.finishStatus" placeholder="请选择" clearable>
          <el-option v-for="item in orderStatus" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchValue.customerId" placeholder="请选择" clearable>
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟单员">
          <el-select v-model="searchValue.merchandiserId" placeholder="请选择" clearable>
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
        <el-form-item label="订单总成本(元)">
          <div  style="width:195px">{{this.statistics.totalCost}}</div>
        </el-form-item>
        <el-form-item label="订单总金额(元)">
          <div  style="width:195px">{{this.statistics.totalMoney}}</div>
        </el-form-item>
         <el-form-item label="合同总数量" >
          <div style="width:195px">{{total}}单</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="center">
        <el-button type="primary"  @click="initData">查询</el-button>
        <el-button type="warning"  @click="exportOrder">导出订单</el-button>
      </div>
    <div class="table">
      <el-table :data="tableData" fit  tooltip-effect="dark" v-loadmore="load" height='650' @selection-change="handleSelectionChange">
         <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="odName" align='center' label="名称" ></el-table-column>
        <el-table-column prop="contractNumber" align='center' label="合同编号"  ></el-table-column>
        <el-table-column prop="customer" align='center' label="客户"></el-table-column>
        <el-table-column prop="odCount" align='center' label="数量"></el-table-column>
        <el-table-column prop="unitPrice" align='center' label="单价(元)"></el-table-column>

        <el-table-column prop="odMoney" align='center' label="金额(元)"></el-table-column>
        <el-table-column prop="totalCost" align='center' label="订单成本(元)"></el-table-column>
        <el-table-column prop="productGuige" align='center' label="产品尺寸"></el-table-column>
        
        <el-table-column prop="odSetdate" align='center' label="订单日期"></el-table-column>
        <el-table-column prop="odFinishdate" align='center' label="交货日期"></el-table-column>
        <el-table-column prop="createTime" align='center' label="创建日期"></el-table-column>
        <el-table-column prop="merchandiser" align='center' label="跟单员"></el-table-column>
        <!-- <el-table-column prop="createAuthor" align='center' label="发起人"></el-table-column> -->

        <el-table-column prop="finishStatusStr" align='center' label="订单状态">
       
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              @click.native.prevent="excel(scope.row)"
              type="text"
              size="mini">
              导出订单
            </el-button> -->
            <el-popover
              placement="top"
              width="160"
              v-model="scope.row.visible">
              <p>确定删除该订单吗？</p>
              <div style="text-align: center; margin: 0">
                 <el-button  size="mini" @click.native.prevent="scope.row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click.native.prevent="deleteOrder(scope.row)">确定</el-button>
              </div>
              <el-button 
              type="text"
              size="mini" slot="reference">删除</el-button>
            </el-popover>
            <!-- <el-button
              @click.native.prevent="deleteOrder(scope.row)"
              type="text"
              size="mini">
              删除
            </el-button> -->
            <el-button
              @click.native.prevent="goToDetail(scope.row)"
              type="text"
              size="mini">
              详情
            </el-button>
             <el-button
              @click.native.prevent="pdscheduleOpen(scope.row)"
              type="text"
              size="mini">
              排产
            </el-button>
            <el-button
              @click.native.prevent="changeDetail(scope.row,0)"
              type="text"
              size="mini">
              修改订单
            </el-button>
            <el-button
              @click.native.prevent="changeDetail(scope.row,1)"
              type="text"
              size="mini">
              另存为订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        style=" padding:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
    </el-pagination> -->
    </div>


    <!-- 排产 -->
    <el-dialog
      title="排产"
      :visible.sync="pdschedule"
      width="80%"
      center
      :before-close="handleClose">
      <el-form inline size='mini' label-width="180px">
        <!-- <el-form-item label="已经生产数量:" >
          <div style="width:180px">{{orderInfo.alreadyCount||0}}</div>
        </el-form-item> -->
        <el-form-item label="当前使用材料数量:">
          <div style="width:180px">
            <el-input v-model="pdscheduleInfo.currentUseMater" placeholder="请输入当前使用材料数量"></el-input>
          </div>
        </el-form-item>
         <el-form-item label="机器数量:">
          <div style="width:250px">
             <el-input style="width:180px"  v-model="pdscheduleInfo.machineCount" placeholder="请输入机器数量"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="预计完成日期:">
          <div style="width:180px" >
            <el-date-picker
              v-model="pdscheduleInfo.expectTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              >
            </el-date-picker>
          </div>
        </el-form-item>
       
        <!-- <el-form-item label="完成生产日期:">
          <div style="width:180px">
             <el-date-picker
              v-model="pdscheduleInfo.pdFinishTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              >
            </el-date-picker>
          </div>
        </el-form-item> -->
        <el-form-item label="排产时间:">
          <div style="width:200px">
             <el-date-picker
              v-model="pdscheduleInfo.pdTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="工人数量:">
          <div style="width:180px">
            <el-input  v-model="pdscheduleInfo.workerCount" placeholder="请输入工人数量"></el-input>
          </div>
        </el-form-item>
        <!-- <el-form-item label="情况说明:">
          <div style="width:250px">
            <el-input v-model="pdscheduleInfo.descript" placeholder="请输入当前使用材料数量"  
              maxlength="30"
              show-word-limit
              resize="none"
            ></el-input>
          </div> 
        </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="surePdschedule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import elTableInfiniteScroll from 'el-table-infinite-scroll';
import {orderDetail,
    deleteOrder,
    orderList,updataOrder} from '@/api/order'
    import {customerList} from '@/api/customer'
    import {accountList} from '@/api/user'
    import{
    updataPdschedule,
    pdscheduleDetail,
    deletePdschedule,
    pdscheduleList
    } from '@/api/pdschedule'
    let pdscheduleInfo = {
        currentUseMater:0,
        descript:'',
        expectTime:'',
        fdStatus:1,
        lastCountTime:'',
        machineCount:0,
        pdFinishTime:'',
        pdTime:"",
        pdUserId:'',
        workerCount:0
      }
      import {exportExcel,dictApi,idChangeStr,downFile} from '@/utils'

export default {
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  data() {
    return {
      searchValue:{
        odName:"",serialNumber:'',
        customer:"",merchandiser:"",
        odFinishdateBegin:'',odFinishdateEnd:"",
        contractNumber:'',finishStatus:'',
        page:1,limit:10
      },
      loading:false,
      detevalue: "",
      tableData: [],
      total:1,
      merchandiserList:[],
      orderStatus:[],
      customerList:[],
      pdschedule:false,
      orderInfo:{},
      pdscheduleInfo:{
        currentUseMater:0,
        descript:'',
        expectTime:'',
        fdStatus:1,
        lastCountTime:'',
        machineCount:0,
        pdFinishTime:'',
        pdTime:"",
        pdUserId:'',
        workerCount:0,
       
      },
       statistics:{},
      select:[],
    };
  },
  async created(){
   this.dict().then(()=>{
     this.getList()
   })
    
  },
  methods:{
    initData(){
         this.searchValue.page =1;
         this.tableData = [];
         console.log(111)
         this.getList();
    },
    load(){
      this.searchValue.page++;
      console.log('滚动')
      this.getList(1);
    },
    exportOrder(){
      if(this.select.length){
        let list = [];
        this.select.forEach(item =>{
          list.push(item.id);
        })
      list = list.join(",");
      console.log(list)
      let url = `http://wearewwx.com:8080/order/exportExcel?ids=${list}`;
      downFile(url);
      }else{
        this.$message.warning('请选择导出的订单')
      }
    },
    handleSelectionChange(val){
      this.select = val;
      // console.log(val)
    },
    excel(item){
      let url = `http://wearewwx.com:8080/order/exportExcel?id=${item.id}`
       let type = `${item.odName}.xls`
      downFile(url,type);
      // console.log(url)
      
           
    },
    changeDetail(item,type){
      this.$router.push({
        name:'placeOrder',
        query:{
          id:item.id,
          type
        }
      }).catch( err =>{
        console.log(err)
      })
    },
    async finishOrder(item){
      let obj = {
        id:item.id,
        finishStatus:6
      }
      try {
       let res = await updataOrder(obj)
       this.$message.success(res.returnMsg)
       await this.getList()
      } catch (error) {
        
      }
      
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
    pdscheduleOpen(item){
      if(item.finishStatus == 3){
        this.orderInfo = {...item};
        this.pdschedule = true;
      }else{
        if(item.finishStatus == 4){
           this.$message.warning('当前订单已排产')
        }else{
           this.$message.warning('当前订单，材料不足未能排产，请尽快进料')
        }
       
      }
      
    },
    async surePdschedule(){
      try {
        this.pdscheduleInfo.odId = this.orderInfo.id;
          let res = await updataPdschedule(this.pdscheduleInfo);
          let url = `http://wearewwx.com:8080/pdschedule/export?id=${this.pdscheduleInfo.odId}`
          downFile(url);
          this.pdscheduleInfo = {...pdscheduleInfo}
          this.pdschedule = false;

          this.$message.success(res.returnMsg) 
          this.$router.push({
            name:"pdschedule"
          })
      } catch (error) {
        console.log(error)
      }
       
    },

    async dict() {
       try {
          this.loading = true;
          let customer = await customerList();
          this.orderStatus = await dictApi("orderStatus");
          this.customerList = customer.data;
          let account = await accountList();
          this.merchandiserList = account.data;
          
       this.loading =false;
      } catch (error) {
        console.log(error)
      }
    },

    async getList(type){
      try {
       console.log(this.searchValue)
        if(type == 1){
          if(this.tableData.length <this.total){
          this.loading = true;
          let res = await orderList(this.searchValue);
           
           res.data.map((item)=>{
            item.visible = false;
            item.visibleF = false;
            item.finishStatusStr= idChangeStr(this.orderStatus,item.finishStatus)
             this.tableData.push(item)
          })
          
          // this.tableData = res.data;
          this.statistics = res.statistics?res.statistics:{totalCost:0,totalMoney:0};
          console.log(this.tableData)
          this.total = res.total;
          this.loading =false;
        }else{
         
          // this.$message.warning('已经是最后一组数据了')
          this.loading =false;
        }
        }else{
           this.loading = true;
          let res = await orderList(this.searchValue);
           res.data.map((item)=>{
            item.visible = false;
            item.visibleF = false;
            item.finishStatusStr= idChangeStr(this.orderStatus,item.finishStatus)
          })
          this.tableData = res.data;
          this.statistics = res.statistics?res.statistics:{totalCost:0,totalMoney:0};
          console.log(this.tableData)
          this.total = res.total;
          this.loading =false;
        }
        
       
      } catch (error) {
        this.loading =false;
        console.log(error)
      }
      
    },
    async deleteOrder(item){
      try {
        console.log(item)
        let res = await deleteOrder({id:item.id})
        this.searchValue.page =1;
        this.$message.success(res.returnMsg)
        this.getList()
      } catch (error) {
        
      }
    },
    deteChange(value){
      console.log(value)
      if(value){
        this.searchValue.odFinishdateBegin = value[0];
      this.searchValue.odFinishdateEnd =  value[1];
      }else{
         this.searchValue.odFinishdateBegin = '';
      this.searchValue.odFinishdateEnd =  '';
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
  },

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

