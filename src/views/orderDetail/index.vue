<template>
  <div class="warp " v-loading='loading'>
        <!-- <el-progress :text-inside="true" :stroke-width="24" :percentage="percentage" :status='status' ></el-progress> -->
       <el-form inline :model="orderInfo"  label-width="150px">
        <el-form-item label="订单名称:"><span class="form-item-width">{{orderInfo.odName}}</span></el-form-item>
        <el-form-item label="产品规格:"><span class="form-item-width">{{orderInfo.productGuige}}</span></el-form-item>
        <el-form-item label="合同编号:"><span class="form-item-width">{{orderInfo.contractNumber}}</span></el-form-item>
        <el-form-item label="客户合同编号:"><span class="form-item-width">{{orderInfo.ctContractNumber}}</span></el-form-item>
        <el-form-item label="业务员:"><span class="form-item-width">{{orderInfo.salesman}}</span></el-form-item>
        <el-form-item label="跟单员:"><span class="form-item-width">{{orderInfo.merchandiser}}</span></el-form-item>
        <el-form-item label="客户:"><span class="form-item-width">{{orderInfo.customer}}</span></el-form-item>
        <el-form-item label="订单日期:"><span class="form-item-width">{{orderInfo.odSetdate}}</span></el-form-item>
        <el-form-item label="交货日期:"><span class="form-item-width">{{orderInfo.odFinishdate}}</span></el-form-item>
      </el-form>
      <el-form inline :model="orderInfo"  label-width="150px">
        <el-form-item label="箱型:"><span class="form-item-width">{{orderInfo.caseName}}</span></el-form-item>
        <el-form-item label="订单数量:"><span class="form-item-width">{{orderInfo.odCount}}</span></el-form-item>
        <el-form-item label="单价（元）:"><span class="form-item-width">{{orderInfo.unitPrice}}</span></el-form-item>
        <el-form-item label="订单金额（元）:"><span class="form-item-width">{{orderInfo.odMoney}}</span></el-form-item>
        <el-form-item label="加工工序:"><span class="form-item-width">{{orderInfo.workProsedureStr}}</span></el-form-item>
        <el-form-item label="啤板名称:"><span class="form-item-width">{{orderInfo.beerPlate}}</span></el-form-item>
        <el-form-item label="啤板拼数:"><span class="form-item-width">{{orderInfo.beerCountStr}}</span></el-form-item>
        <el-form-item label="纸层数:"><span class="form-item-width">{{orderInfo.paperCountStr}}</span></el-form-item>
        <el-form-item label="印刷颜色:"><span class="form-item-width">{{orderInfo.printColorStr}}</span></el-form-item>
        <el-form-item label="印后处理:"><span class="form-item-width">{{orderInfo.printDealTypeStr}}</span></el-form-item>
        <el-form-item label="包装要求:"><span class="form-item-width">{{orderInfo.packageRequireStr}}</span></el-form-item>
        <el-form-item label="成品长:"><span class="form-item-width">{{orderInfo.pdLength}}</span></el-form-item>
        <el-form-item label="成品宽:"><span class="form-item-width">{{orderInfo.pdWidth}}</span></el-form-item>
        <el-form-item label="成品高:"><span class="form-item-width">{{orderInfo.pdHigth}}</span></el-form-item>
      </el-form>
      <div class="maters center">
          <div class="item center" v-for="(item,index) in orderInfo.maters" :key='index' >
              <div v-if='item.mtType == 1'>
                <div>类型:{{item.mtType == 1?'面纸':'坑纸'}}</div>
                <div>面纸长:{{item.mtLength}}</div>
                <div>面纸宽:{{item.mtWidth}}</div>
                <div>面纸单价:{{item.mtUnitPrice}}</div>
                <div>面纸数量:{{item.mtCount}}</div>
                <div>面纸供应商:{{item.spName}}</div>
                <div>面纸型号:{{item.mtModelName}}</div>
                <div>面纸费用:{{item.mtCost}}</div>
              </div>
              <div v-else>
                <div>类型:{{item.mtType == 1?'面纸':'坑纸'}}</div>
                <div>坑纸长:{{item.mtLength}}</div>
                <div>坑纸高:{{item.mtHeight}}</div>
                <div>坑纸单价:{{item.mtUnitPrice}}</div>
                <div>坑纸数量:{{item.mtCount}}</div>
                <div>坑纸供应商:{{item.spName}}</div>
                <div>坑纸型号:{{item.mtModelName}}</div>
                <div>坑纸费用:{{item.mtCost}}</div>
              </div> 
          </div>
          <div class="item center" v-for="(item,index) in orderInfo.processcosts" :key="'info2-'+index" >
              <div v-if="item.psType == 3">
                  <div>类型:其他费用</div>
                  <div>费用备注:{{item.costRemake}}</div>
                  <div>费用:{{item.psCost}}</div>
              </div>
              <div v-else-if="item.psType == 0">
                  <div>类型:加工费</div>
                  <div>加工面积:{{item.psArea}}</div>
                  <div>加工数量:{{item.psCount}}</div>
                  <div>加工费计费基准:{{item.psCostBase}}</div>
                  <div>加工单价:{{item.psUnitPrice}}</div>
                  <div>人工费用:{{item.psCost}}</div>
              </div>
              <div v-else-if="item.psType == 1">
                  <div>类型:印刷</div>
                  <div>印刷机类型:{{item.printTypeStr}}</div>
                  <div>印刷费用:{{item.psCost}}</div>
                  <div>印刷厂家:{{item.spName}}</div>
              </div>
              <div v-else-if="item.psType == 2">
                  <div>类型:表面处理</div>
                  <div>表面处理供应商:{{item.spName}}</div>
                  <div>表面处理要求:{{item.surfaceRequired}}</div>
                  <div>表面处理面积:{{item.area}}</div>
                  <div>表面处理平方价:{{item.psArea}}</div>
                  <div>表面处理单价:{{item.psUnitPrice}}</div>
                  <div>表面处理单价:{{item.psCount}}</div>
                  <div>表面处理成本:{{item.psCost}}</div>
              </div>
          </div>
      </div>
      <div style="padding-top:20px;">
          <div class="center">图纸信息</div>
          <div class="center">
              <div>
                  <div v-for="(item,index) in orderInfo.attachments" :key='index' class="center cursor">
                    <div @click="downFile(item)">
                        {{item.oldName}}
                    </div>
                    <i class="el-icon-download"></i>
                </div>
              </div>
              
          </div>
      </div>
      <div class="center" style="padding:20px 0;">
          <div>总成本：{{orderInfo.totalCost}}</div>
      </div>
      <div class="center" >
              <el-button type="primary" @click="showDialog">采购</el-button>
              <el-button type='warning' @click="excel">导出订单</el-button>
               <el-button type='info' @click="print">导出印刷单</el-button>
               <el-button @click="goBack">返回</el-button>
        </div>   
      
    <!-- 采购单 -->
      <purchase-order
         v-if="dialogVisible" 
         :percentage='percentage'  
         :dialogVisible='dialogVisible' 
         :chargingType='chargingType' 
         :orgId='orderInfo.id'
            :status='status'
            title="采购单"
         @closeDialog='closeDialog'
      >        
      </purchase-order>    
  </div>
</template>

<script>
import {idChangeStr,dictApi,downFile,exportExcel} from '@/utils'
import {orderDetail} from '@/api/order'
// import {purchaseDetail,purchaseList} from '@/api/purchase'
// import chargingList from '@/components/chargingList'
import purchaseOrder from '@/components/purchaseOrder'

export default {
    components:{
        // chargingList
        purchaseOrder
    },
    data(){
        return{
            orderInfo:{},
            tappingList: [],//加工工序
            beerNum: [],//啤板拼数
            printingColor: [],//印刷颜色
            printingHandle: [],//印后处理
            printingList:[],//印刷机类型
            packAsk: [],//包装要求
            paperNum:[],//纸层数
            // charging:[],//入货历史
            chargingType:[],//入货类型
            dialogVisible:false,
            percentage:0,
            status:'',
            costRemake:[]
        }
    },
    async created(){
        
        await this.getDetail(this.$route.query.id)
        // await this.purchaseList(this.orderInfo.id)
        // await this.getPurchaseDetail(this.orderInfo.id)
       
    },
    methods:{
        print(){
             let url = `http://wearewwx.com:8080/order/exportPrint?id=${this.orderInfo.id}`
             let type = `${this.orderInfo.odName}.doc`
            downFile(url,type);
        },
         excel(){
            let url = `http://wearewwx.com:8080/order/exportExcel?id=${this.orderInfo.id}`
            let type = `${this.orderInfo.odName}.xls`
            downFile(url,type);
            console.log(url)
        },
        downFile(item){
            let url = `http://wearewwx.com:8080/order/download?id=${item.id}`
                let type = item.oldName;
                console.log(type)
                downFile(url,type);
        },
        goBack(){
            this.$router.replace({name:"order"})
        },
        showDialog(){
            if(this.orderInfo.finishStatus ==  1){
                this.dialogVisible = true;
            }else{
                this.$message.warning('订单已采购')
            }
            

        },
        closeDialog(value){
            console.log(value)
            if(value){
                this.dialogVisible = false;
             this.$router.push({
                 name:"purchaseHandler"
             })       
            }else{
                this.dialogVisible = false;
            }
                  //  this.charging.length
        },
        // async purchaseList(id){
        //     try {
        //         let res = await purchaseList({odId:id});
        //         this.charging = res.data;
        //         this.status= this.charging.length == 0?'exception':'success';
        //         this.percentage = this.charging.length == 0?0:this.percentage;
                   
        //     } catch (error) {
                
        //     }
        // },
        async getPurchaseDetail(id){
            try {
                let res = await purchaseDetail({id})
                console.log(res,21321)
            } catch (error) {
                
            }
        },

       async getDetail(id){
            try {
                this.loading = true;
                let res = await orderDetail({id});
                this.tappingList = await dictApi("tapping");
                this.beerNum = await dictApi("beerNum");
                this.paperNum = await dictApi("paperNum");
                this.printingColor = await dictApi("printingColor");
                this.printingHandle = await dictApi("printingHandle");
                this.printingList =  await dictApi("printing");
                this.packAsk = await dictApi("packAsk");
                this.costRemake = await dictApi("costRemake");

                res.data.workProsedureStr = idChangeStr(this.tappingList,res.data.workProsedure);
                res.data.beerCountStr = idChangeStr(this.beerNum,res.data.beerCount);
                res.data.paperCountStr = idChangeStr(this.paperNum,res.data.paperCount);
                res.data.printColorStr = idChangeStr(this.printingColor,res.data.printColor);
                res.data.printDealTypeStr = idChangeStr(this.printingHandle,res.data.printDealType);
                res.data.packageRequireStr = idChangeStr(this.packAsk,res.data.packageRequire);

                res.data.processcosts.map(item =>{
                    let res =item.printType != undefined? this.printingList.find(itemS => itemS.key == item.printType):{value:''};
                    // console.log(this.printingList,21321,res)
                    item.printTypeStr = res.value;
                    item.costRemake =item.psType == 3?idChangeStr(this.costRemake,item.remarkKey):'';
                })
                
                this.chargingType = res.data.maters;
                this.orderInfo = res.data;
                console.log(this.chargingType,123213)
            } catch (error) {
                console.log(error)
            }
            this.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .warp{
        min-width: 800px;
        .form-item-width{
            width: 150px;
        }
    }
    .cursor{
        margin:5px 0; 
        cursor: pointer;
    }
    .maters{
        .item{
            height: 180px;
            padding: 10px;
            border: 1px solid #000;
            border-radius: 5px;
            margin: 5px;
            box-sizing: border-box;
        }
    }
</style>