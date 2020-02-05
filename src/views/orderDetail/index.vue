<template>
  <div class="warp " v-loading='loading'>
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
        <el-form-item label="箱型:"><span class="form-item-width">箱型</span></el-form-item>
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
                <div>面纸供应商:{{item.sp}}</div>
                <div>面纸类型:{{item.mtModelStr}}</div>
              </div>
              <div v-else>
                <div>类型:{{item.mtType == 1?'面纸':'坑纸'}}</div>
                <div>坑纸长:{{item.mtLength}}</div>
                <div>坑纸高:{{item.mtHeight}}</div>
                <div>坑纸单价:{{item.mtUnitPrice}}</div>
                <div>坑纸数量:{{item.mtCount}}</div>
                <div>坑纸供应商:{{item.sp}}</div>
                <div>坑纸类型:{{item.mtModelStr}}</div>
              </div> 
          </div>
          <div class="item center" v-for="(item,index) in orderInfo.processcosts" :key="'info2-'+index" >
              <div v-if="item.psType == 3">
                  <div>类型:其他费用</div>
                  <div>费用备注:{{item.psName}}</div>
                  <div>费用:{{item.psCost}}</div>
              </div>
              <div v-else-if="item.psType == 0">
                  <div>类型:加工费</div>
                  <div>加工面积:{{item.psArea}}</div>
                  <div>加工数量{{item.psCount}}</div>
                  <div>加工费计费基准:{{item.psCostBase}}</div>
                  <div>加工单价:{{item.psUnitPrice}}</div>
                  <div>人工费用:{{item.psCost}}</div>
              </div>
              <div v-else-if="item.psType == 1">
                  <div>类型:印刷</div>
                  <div>印刷机类型:{{item.printType}}</div>
                  <div>印刷费用:{{item.psCost}}</div>
                  <div>印刷厂家:{{item.spId}}</div>
              </div>
              <div v-else-if="item.psType == 2">
                  <div>类型:表面处理</div>
                  <div>表面处理供应商:{{item.spId}}</div>
                  <div>表面处理要求:{{item.surfaceRequired}}</div>
                  <div>表面处理面积:{{item.area}}</div>
                  <div>表面处理平方价:{{item.psArea}}</div>
                  <div>表面处理单价:{{item.psUnitPrice}}</div>
                  <div>表面处理单价:{{item.psCount}}</div>
                  <div>表面处理成本:{{item.psCost}}</div>
              </div>
          </div>
      </div>
      <div class="center" style="padding:20px 0;">
          <div>总成本：{{orderInfo.totalCost}}</div>
      </div>
      <div class="center" >
              <el-button type="primary">采购</el-button>
        </div>
  </div>
</template>

<script>
import {idChangeStr,dictApi} from '@/utils'
import {orderDetail} from '@/api/order'
export default {
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
        }
    },
    async created(){
        
        await this.getDetail(this.$route.query.id)
       
    },
    methods:{
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

                res.data.workProsedureStr = idChangeStr(this.tappingList,res.data.workProsedure);
                res.data.beerCountStr = idChangeStr(this.beerNum,res.data.beerCount);
                res.data.paperCountStr = idChangeStr(this.paperNum,res.data.paperCount);
                res.data.printColorStr = idChangeStr(this.printingColor,res.data.printColor);
                res.data.printDealTypeStr = idChangeStr(this.printingHandle,res.data.printDealType);
                res.data.packageRequireStr = idChangeStr(this.packAsk,res.data.packageRequire);
                this.orderInfo = res.data;
                console.log(this.orderInfo)
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
    .maters{
        .item{
            padding: 10px;
            border: 1px solid #000;
            border-radius: 5px;
            margin: 5px;
        }
    }
</style>