<template>
  <div class="warp" v-loading='loading'>
    <div class="search center">
      <el-form inline size="mini">
        <el-form-item label="是否有出库">
          <el-select v-model="searchValue.outstockStatus" placeholder="请选择">
          <el-option
            key="1"
            label="否"
            value="0">
          </el-option>
          <el-option
            key="2"
            label="是"
            value="1">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchValue.customerId" placeholder="请选择">
          <el-option 
          v-for="item in customerList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
         >
          </el-option>
          
        </el-select>
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
      </el-form>
    </div>
    <div class="center">
        <el-button type="primary"  @click="getList">查询</el-button>
        <el-button type="primary"  @click="out">生成送货单</el-button>
      </div>
    <div class="table">
      <el-table :data="tableData" fit tooltip-effect="dark" @selection-change='selectionChange'>
        <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column prop="pdName" align='center' label="成品名称" ></el-table-column>
        <el-table-column prop="odSerialNumber" align='center' label="成品编号"  ></el-table-column>
        <el-table-column prop="customerName" align='center' label="客户名称"  ></el-table-column>
        <el-table-column prop="stCount" align='center' label="库存数量"></el-table-column>
        <el-table-column prop="alreadyOutCount" align='center' label="已出库数量"></el-table-column>
        <el-table-column prop="pdUnitPrice" align='center' label="成品单价"></el-table-column>
        <el-table-column prop="pdMoney" align='center' label="成品总价"></el-table-column>
        <el-table-column prop="odSetdate" align='center' label="是否有出库">
          <template slot-scope="scope">
            {{scope.row.outstockStatus?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              v-if='scope.row.outstockStatus == 1'
              v-model="scope.row.visibleF">
              <p>确定完成该订单的所有出库吗？</p>
              <div style="text-align: center; margin: 0">
                 <el-button  size="mini" @click.native.prevent="scope.row.visibleF = false">取消</el-button>
                <el-button type="primary" size="mini" @click.native.prevent="finishOrder(scope.row)">确定</el-button>
              </div>
              <el-button 
              type="text"
              size="mini" slot="reference">完成</el-button>
            </el-popover>
            <!-- <el-button
              @click.native.prevent="out(scope.row)"
              type="text"
              size="mini">
              成品出库
            </el-button> -->
            <el-popover
            placement="top"
            width="160"
            v-model="scope.row.visible">
            <el-input v-model.number="scope.row.delNumber"></el-input>
            <div style="text-align: right; margin: 0">
              <el-button type="info" size="mini" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="outPdstock(scope.row)">确定</el-button>
            </div>
          </el-popover>
           <el-button
              type="text"
              size="mini"
              @click="scope.row.delVisible = true"
              >
              删除
            </el-button>
            <el-popover
            placement="top"
            width="160"
            v-model="scope.row.delVisible">
            是否确定删除该存库数据？
            <div style="text-align: right; margin: 0">
               <el-button type="info" size="mini" @click="scope.row.delVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deletePdstock(scope.row)">确定</el-button>
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
      type='1'
      :list='history'
      :dialogVisible='dialogVisible'
      v-if="dialogVisible"
      :modelName='modelName'
      :chargingType='detail'
      @updata='getList'
      @closeDialog='dialogVisible = false'
    ></goods-history> 
    <el-dialog
      title="送货单"
      :visible.sync="selecDia"
      width="80%"
      fit
      :before-close="handleClose">
      <el-form inline label-width="100px" >
         <el-form-item >
         <el-button type="warning" @click="addPd">新增</el-button>
        </el-form-item>
        <el-form-item label="送货人">
          <el-select v-model="select.dgMan" placeholder="请选择">
            <el-option
              v-for="item in deliverer"
              :key="item.id"
              :label="item.contactName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="送货时间">
          <el-date-picker
           v-model="select.dgTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
       
        <el-form-item label="总价(元)">
          {{select.money}}
        </el-form-item>
      </el-form>
      
     
       <el-table
      :data="selection"
      @row-click='selectionClick'
      style="width: 100%">
      <el-table-column
        prop="pdName"
        label="产品名称"
        >
      </el-table-column>
      <el-table-column
        prop="pdGuige"
        label="型号规格"
       >
      </el-table-column>
      <el-table-column
        prop="pdUnitPrice"
        label="成品单价">
      </el-table-column>
      <el-table-column
        prop="stCount"
        label="送货数量">
        <template slot-scope="scope">
           <el-input  placeholder="请输入数量" @input='selectInput' v-model.number="scope.row.stCount"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="pdMoney"
        label="总价(元)">
        <template slot-scope="scope">
          <!-- {{scope.row.allPlace}} -->
           <el-input placeholder="请输入总价" v-model.number="scope.row.pdMoney"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位">
        <template slot-scope="scope">
          <!-- {{scope.row.allPlace}} -->
           <el-input placeholder="请输入单位" v-model.number="scope.row.unit"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <span v-if="scope.row.odId">--/</span>
            <el-button  @click="delectAdd(scope.$index)" v-else type="text">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sureSelect">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="ifAdd">
        <el-form label-width="100px" >
         <el-form-item label="产品名称">
           <el-input v-model="addPdInfo.pdName" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="型号规格">
           <el-input v-model="addPdInfo.pdGuige" placeholder="请输入型号规格"></el-input>
        </el-form-item>
        <el-form-item label="数量" >
           <el-input v-model.number="addPdInfo.stCount"  @input="addInputCount" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="单价(元)" >
           <el-input v-model.number="addPdInfo.pdUnitPrice" @input="addInputPrice" placeholder="请输入单价"></el-input>
        </el-form-item>
        <el-form-item label="金额(元)">
           <el-input v-model.number="addPdInfo.pdMoney" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="单位">
           <el-input v-model="addPdInfo.unit" placeholder="请输入单位"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="suerAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {updataPdstock,
    pdstockDetail,
    deletePdstock,
    pdstockList,
    addPdstock,
    outPdstock,outPdstockHistory} from '@/api/pdstock'
    import {accountList} from '@/api/user'
    import {updataDelier} from '@/api/deliver'
   import goodsHistory from '@/components/goodsHistory'
   import {downFile} from '@/utils'
    import {customerList} from '@/api/customer'
    let addPdInfo = {
      stCount:0,
      pdMoney:0,
      pdUnitPrice:0,
      pdGuige:'',
      pdName:'',
      unit:'个',
    }
export default {
   components:{
    goodsHistory
  },
 
  watch:{
    selection:{
      handler(value){
        console.log(value)
         let money = 0;
        value.forEach(item =>{
          money+= Number(item.pdMoney)
        })
        money = money.toFixed(3)/1;
       this.select.money = money
      },
      deep:true
    }
  },
  data() {
    return {
      searchValue:{
        customerId:'',
        
        odFinishdateBegin:'',odFinishdateEnd:"",
        outstockStatus:'',
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
      history:[],
      dialogVisible:false,
      modelName:"",
      detail:{},
      select:{
        dgMan:'',
        dgTime:'',
        list:[],
        money:'',
        customerId:''
      },
      selection:[],
      selecDia:false,
      selecIndex:0,
      deliverer:[],
      ifAdd:false,
      addPdInfo:{}
    };
  },
  async created(){
   this.dict()
    
  },
  methods:{
    delectAdd(index){
       this.$confirm('是否确定删除该条数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.selection.splice(index,1)
            }).catch(() => {
                    
            });
      
    },
    addInputCount(value){
      let money = (Number(this.addPdInfo.pdUnitPrice)*Number(value)).toFixed(3)
      this.addPdInfo.pdMoney = isNaN(money)?0:money

    },
    addInputPrice(value){
       let money = (Number(value)*Number(this.addPdInfo.stCount)).toFixed(3);
      this.addPdInfo.pdMoney = isNaN(money)?0:money

    },
    suerAdd(){
      console.log(this.addPdInfo)
      this.$confirm('是否确定新增', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
             
              this.selection.push(this.addPdInfo);
               this.ifAdd = false;
            }).catch(() => {
                    
            });
    },
    cancelAdd(){
      this.$confirm('是否确定取消新增', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.ifAdd = false;
            }).catch(() => {
                    
            });
      
    },
    addPd(){
      this.addPdInfo = {...addPdInfo};
      this.ifAdd = true;
    },
    async sureSelect(){
      for(let i=0;i<this.selection.length;i++){
        if(this.selection[i].stCount == 0){
          return this.$message.warning('出库数量不能为0')
        }
      }
      if(!this.select.dgTime&&!this.select.dgMan){
              return this.$message.warning('请填写送货时间和送货人')
            }
      try {
            this.$confirm('是否确定生成送货单', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then( async() => {
             let list = [];
            this.selection.map((item)=>{
              let obj = {
                odId:item.odId,
                count:item.stCount,
                money:item.pdMoney,
                unitPrice:item.pdUnitPrice,
                model:item.pdGuige,
                pdName:item.pdName,
                unit:item.unit,
              }
              list.push(obj)
            })
            
            this.select.list = list;
            this.select.customerId = this.selection[0].customerId;
           
            let res = await updataDelier(this.select);
             let url = `http://wearewwx.com:8080/dg/export?id=${res.data}`
            downFile(url);
            this.selection.forEach((item,index)=>{
               if(!item.odId){
                 this.selection.splice(index,1);
               }
            })
            this.getList()
            this.selecDia = false;
            }).catch(() => {
                    
            });
        
      } catch (error) {
        
      }
      
      console.log(this.select)
    },
    async finishOrder(item){
      try {
        let obj = {
          id:item.id,
          odId:item.odId,
          outstockStatus:1
        }
        let res = await updataPdstock(obj)
        this.$message.success(res.returnMsg)
        this.getList()
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
    selectInput(value){
      this.selection[this.selecIndex].pdMoney = (Number(this.selection[this.selecIndex].pdUnitPrice)*Number(value)).toFixed(3)
    },
    selectionClick(row, column, event){
      let index = this.selection.findIndex(item => item.odId == row.odId);
      console.log(index)
      this.selecIndex = index;

    },
    selectionChange(selection){
      selection.map(item =>{
        item.pdMoney = (Number(item.pdUnitPrice)*Number(item.stCount)).toFixed(3);
        item.unit = '个';
      })
      this.selection = selection;
      console.log(selection)
    },
    async outPdstock(item){
      let obj = {
        delCount:item.delNumber,
        odId:item.odId
      }
       let res = await outPdstock(obj)
       this.$message.success(res.returnMsg)
    },
    handleClose(){
      this.$confirm('确认关闭？')
          .then(_ => {
            this.selecDia = false;
          })
          .catch(_ => {});
    },
    async out(){
      if(this.selection.length){
        let arr = [];
        if(this.selection.length>1){
           this.selection.forEach((item)=>{
          arr.push(item.customerId)
        })
          let nary=arr.slice().sort();
          console.log(nary)
          for(let i=0;i<arr.length;i++){
            console.log(nary[i],nary[i+1])
            if(nary[i+1]){
              if (nary[i]!=nary[i+1]){
                
                return  this.$message.warning("请选择相同客户的成品生成送货单")
              }
            }
              
          }  
        }

        this.selecDia = true;
      }else{
        this.$message.warning("请选择成品列表")
      }
      // if(item.stCount){
      //    let res = await  outPdstockHistory({odId:item.odId});
      //   this.history = res.data;
      //   this.modelName = item.odName;
      //   this.detail = item;
      //   //   console.log(res)\
      //    this.dialogVisible= true;
      // }else{
      //   this.$message.warning('该订单并没有存货')
      // }
    },
    async dict() {
       try {
          this.loading = true;
          let deliverer = await accountList()
          this.deliverer = deliverer.data;
          let customer = await customerList();

          this.customerList = customer.data;
          // let account = await accountList();
          // this.merchandiserList = account.data;
          this.getList()
       this.loading =false;
      } catch (error) {
        console.log(error)
      }
    },

    async getList(){
      try {
        
        let res = await pdstockList(this.searchValue);
        res.data.map(item =>{
           item.delVisible = false;
          item.visible = false;
          item.visibleF = false;
          item.delNumber = 0;
        })
        this.tableData = res.data;
        this.total = res.total;
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      
    },

    async deletePdstock(item){
      try {
        console.log(item)
        let res = await deletePdstock({id:item.id})
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

