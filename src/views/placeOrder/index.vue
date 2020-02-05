<template>
  <div class="warp" v-loading='loading'>
    <div class="from">
      <el-form size="mini" inline label-width="100px" >
      <el-form-item label="箱形:" class="form-inline">
        <el-select v-model="basicData.caseType" placeholder="请选择" @change="caseChange">
          <el-option
            v-for="item in boxTypeList"
            :key="item.id"
            :label="item.caseName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单数量:" class="form-inline">
        <el-input v-model.number="basicData.odCount"  placeholder="请输入订单数量"></el-input>
      </el-form-item>
      <el-form-item label="包装要求:" class="form-inline">
        <el-select v-model="basicData.packageRequire" placeholder="请选择">
          <el-option v-for="item in packAsk" :key="item.key" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="加工工序:" class="form-inline">
        <el-select v-model="basicData.workProsedure" placeholder="请选择">
          <el-option
            v-for="item in tappingList"
            :key="item.key"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价(元):" class="form-inline">
        <el-input v-model="basicData.unitPrice" placeholder="请输入单价（元）"></el-input>
      </el-form-item>

      <el-form-item label="啤板名称:" class="form-inline">
        <el-input v-model="basicData.beerPlate" placeholder="请输入啤板名称"></el-input>
      </el-form-item>
      <el-form-item label="纸层数:" class="form-inline">
        <el-select v-model="basicData.paperCount" placeholder="请选择">
          <el-option v-for="item in paperNum" :key="item.key" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单金额(元):" class="form-inline">
        <el-input v-model="basicData.odMoney" placeholder="请输入订单金额（元）"></el-input>
      </el-form-item>

      <el-form-item label="啤板拼数:" class="form-inline">
        <el-select v-model="basicData.beerCount" placeholder="请选择">
          <el-option v-for="item in beerNum" :key="item.key" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="印刷颜色:" class="form-inline">
        <el-select v-model="basicData.printColor" placeholder="请选择">
          <el-option
            v-for="item in printingColor"
            :key="item.key"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="印后处理:" class="form-inline">
        <el-select v-model="basicData.printDealType" placeholder="请选择">
          <el-option
            v-for="item in printingHandle"
            :key="item.key"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-inline">
        <!-- <el-select v-model="basicData.printingHandle" placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
        </el-select>-->
      </el-form-item>
    </el-form>
    <el-form size="mini" inline label-width="100px">
      <el-form-item label="成品长:" class="form-inline">
        <el-input  v-model.number="finishedInfo.pdLength" placeholder="请输入成品长"></el-input>
      </el-form-item>
      <el-form-item label="成品宽:" class="form-inline">
        <el-input v-model.number="finishedInfo.pdWidth" placeholder="请输入成品宽"></el-input>
      </el-form-item>
      <el-form-item label="成品高:" class="form-inline">
        <el-input v-model.number="finishedInfo.pdHigth" placeholder="请输入成品高"></el-input>
      </el-form-item>
    </el-form>

    <div class="facialTissue">
      <div class="space-between">
        <div class="h1">面纸</div> 
        <el-button type="primary" @click="addItem(0)" icon="el-icon-edit">新增</el-button>
      </div>

      <el-form size="mini" inline label-width="100px" style="padding:20px">
        <el-form-item v-for="(item,index) in facialTissue" :key='index' >
            <!-- {{item}} -->
            <div @click="choiseItem(item,index)">
                 <el-form-item label="面纸供应商:" class="form-inline">
            <el-select placeholder="请选择" v-model="item.spId">
              <el-option
                v-for="item in spId"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面纸型号:" class="form-inline">
            <el-select placeholder="请选择" v-model="item.mtModel" @change="mtTypeChange">
              <el-option
                v-for="item in mT"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面纸长:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtLength}}</span>
          </el-form-item>
          <el-form-item label="面纸宽:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtWidth}}</span>
          </el-form-item>
          <el-form-item label="面纸单价:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtUnitPrice}}</span>
          </el-form-item>
          <el-form-item label="面纸数量:" class="form-inline">
            <el-input  @input="mtCountInput"  v-model.number="item.mtCount" placeholder="请输入成品高"></el-input>
          </el-form-item>
          <el-form-item label="面纸成本:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtCost}}</span>
          </el-form-item>
          <el-form-item label="面纸类型:" class="form-inline">
             <el-select placeholder="请选择" v-model="item.mtModel" disabled>
              <el-option
                v-for="item in mT"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面纸克数:" class="form-inline">
           <span>{{item.gram}}</span>
          </el-form-item>
            
       <!-- <template slot="footer"> -->
         <div style='text-align: right;'>
           <el-button  type="danger"  size="medium" @click="deleteItem(0,index)">删除</el-button>
         </div>
          
        <!-- </template> -->
        </div>
         
        </el-form-item>
      </el-form>
    </div>
    <div class="facialTissue">
      <div class="space-between">
        <div class="h1">坑纸</div> 
        <el-button type="primary" @click="addItem(1)" icon="el-icon-edit">新增</el-button>
      </div>

      <el-form size="mini" inline label-width="100px" style="padding:20px">
        
        <el-form-item  v-for="(item,index) in tunnelTissue" :key='index'>
          <div @click="ChoiseTunnelIndex(item,index)"> 
            <el-form-item label="坑纸供应商:" class="form-inline" >
            <el-select placeholder="请选择" v-model="item.spId">
              <el-option
                v-for="item in spId"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="坑纸型号:" class="form-inline">
            <el-select placeholder="请选择"  v-model="item.mtModel" @change="ktTypeChange">
              <el-option
                v-for="item in kT"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="坑纸长:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtLength}}</span>
          </el-form-item>
          <el-form-item label="坑纸高:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtHeight}}</span>
          </el-form-item>
          <el-form-item label="坑纸单价:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtUnitPrice}}</span>
          </el-form-item>
          <el-form-item label="坑纸数量:" class="form-inline">
            <el-input v-model.number="item.mtCount" @input="tMtCountInput" placeholder="请输入成品高"></el-input>
            <!-- <span>123</span> -->
          </el-form-item>
          <el-form-item label="坑纸成本:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>{{item.mtCost}}</span>
          </el-form-item>
          <el-form-item label="坑纸类型:" class="form-inline">
            <el-select placeholder="请选择"  v-model="item.mtModel" disabled>
              <el-option
                v-for="item in kT"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="坑纸克数:" class="form-inline">
            <span>{{item.gram}}</span>
          </el-form-item>
             <div style='text-align: right;'>
           <el-button  type="danger"  size="medium" @click="deleteItem(1,index)">删除</el-button>
         </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="facialTissue" >
      <div class="space-between">
        <div class="h1">表面处理</div> 
      </div>
      <el-form size="mini" inline label-width="120px" style="padding:20px">
        <el-form-item label="表面处理供应商:" class="form-inline-big">
         <el-select v-model="surface.spId" placeholder="请选择">
            <el-option
                v-for="item in spId"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="表面处理要求:" class="form-inline-big">
          <el-select v-model="surface.surfaceRequired" placeholder="请选择" @change="surfaceChange">
            <el-option
            v-for="item in surfaceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表面处理面积:" class="form-inline-big">
          <span>{{surface.area}}</span>
          <!-- <el-input v-model.number="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
        </el-form-item>
        <el-form-item label="表面处理平方价:" class="form-inline-big">
           <span>{{surface.psArea}}</span>
          <!-- <el-input v-model.number="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
        </el-form-item>
        <el-form-item label="表面处理单价:" class="form-inline-big"> 
          <span>{{surface.psUnitPrice}}</span>

          <!-- <el-input v-model.number="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
        </el-form-item>
        <el-form-item label="表面处理数量:" class="form-inline-big">
          <el-input v-model.number="surface.psCount" @input="surfaceInput" placeholder="请输入成品高"></el-input>
        </el-form-item>
        <el-form-item label="表面处理成本:" class="form-inline-big">
           <span>{{surface.psCost}}</span>
          <!-- <el-input v-model.number="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="facialTissue" >
      <div class="space-between">
        <div class="h1">印刷</div> 
      </div>
      <el-form size="mini" inline label-width="120px" style="padding:20px">
        <el-form-item label="印刷厂家:" >
         <el-select v-model="printing.spId" placeholder="请选择">
            <el-option
            v-for="item in spId"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="印刷机类型:" >
          <el-select v-model="printing.printType" placeholder="请选择">
            <el-option
            v-for="item in printingList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>   
        <el-form-item label="印刷费用:">
          <el-input v-model.number="printing.psCost" placeholder="印刷费用"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="facialTissue" >
      <div class="space-between">
        <div class="h1">加工费</div>
      </div>
      <el-form size="mini" inline label-width="120px" style="padding:20px"> 
          <el-form-item label="加工面积:" class="form-inline">
            <span>{{processingCost.area}}</span>
          </el-form-item>
          <el-form-item label="加工数量:" class="form-inline">
           <span>{{processingCost.psCount}}</span>
          </el-form-item>
          <el-form-item label="加工费计费基准:" class="form-inline">
           <span>{{processingCost.psCostBase}}</span>
          </el-form-item>
          <el-form-item label="加工单价:" class="form-inline">
            <span>{{processingCost.psUnitPrice}}</span>
          </el-form-item>
          <el-form-item label="人工费用:" class="form-inline">
           <span>{{processingCost.psCost}}</span>
          </el-form-item>
      </el-form>
    </div>
    <div class="facialTissue" >
      <div class="space-between">
        <div class="h1">其他费用</div>
        <el-button type="primary" @click="addItem(2)" icon="el-icon-edit">新增</el-button>
      </div>
      <el-form size="mini" inline label-width="120px" style="padding:20px">
        <el-form-item v-for="(item,index) in other" :key='index'>
          <el-form-item label="费用备注:" class="form-inline">
            <el-input v-model.trim="item.psName" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item label="费用:" class="form-inline">
            <el-input v-model.number="item.psCost" placeholder="费用"></el-input>
          </el-form-item>
          <div style='text-align: right;'>
           <el-button  type="danger"  size="medium" @click="deleteItem(2,index)">删除</el-button>
         </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="center">
      <el-button type="primary" @click="takeOrder">我要下单({{totalCost}})</el-button>
    </div>

    </div>
    
    <el-dialog
      title="我要下单"
      :visible.sync="orderInfo"
      width="80%"
      :before-close="handleClose">
        <el-form inline size="mini" label-width="120px" >
           <el-form-item label="产品名字:" >
             <el-input v-model="basicData.odName" placeholder="请输入产品名字"></el-input>
           </el-form-item>
           <el-form-item label="业务员:" >
             <el-select placeholder="请选择" v-model="basicData.salesmanId"  >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.contactName"
                :value="item.id"
              ></el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="产品规格:" >
             <el-input v-model="basicData.productGuige" placeholder="请输入产品规格"></el-input>
           </el-form-item>
           <!-- <el-form-item label="合同编号:">
             <el-input v-model="basicData.contractNumber" placeholder="请输入合同编号"></el-input>
           </el-form-item> -->
            <el-form-item label="客户合同编号:">
             <el-input v-model="basicData.ctContractNumber" placeholder="请输入客户合同编号"></el-input>
           </el-form-item>
           <el-form-item label="跟单员:" >
             <el-select placeholder="请选择" v-model="basicData.merchandiserId"  >
               <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.contactName"
                :value="item.id"
              ></el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="客户:" >
             <el-select placeholder="请选择" v-model="basicData.customerId">
              <el-option
                v-for="item in customer"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="订单日期:" >
            <el-date-picker
              v-model="basicData.odSetdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="订单日期">
            </el-date-picker>
           </el-form-item>
           <el-form-item label="交货日期:">
             <el-date-picker
              v-model="basicData.odFinishdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="交货日期">
              </el-date-picker>
           </el-form-item>

        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading="sureLoding"  @click="sureOrder">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
  </div>
</template>

<script>
import { dictApi ,finishedInfoFormula} from "@/utils";
import {updataOrder} from '@/api/order'
import { costList} from '@/api/cost'
import {supplierList} from '@/api/supplier'
import {accountList} from '@/api/user'
import {customerList} from '@/api/customer'
import {boxList} from '@/api/box'
export default {
  data() {
    return {
      basicData: {
        caseType: "", //箱型
        odCount: "", //订单数量
        unitPrice: "", //单价
        odMoney: "", //订单金额
        workProsedure: "", //加工工序
        beerPlate: "", //啤板
        beerCount: "", //啤板拼数
        paperCount: "", //纸层数
        printColor: "", //印刷颜色,
        printDealType: "", //印后处理
        packageRequire: "", //包装要求
        // contractNumber:'',//合同编号
        ctContractNumber:'',//客户合同编号
        customerId:'',//客户ID
        merchandiserId:"",//跟单员ID,
        odFinishdate:'',//交货日期
        odName:'',//订单名称
        odSetdate:'',//订单日期
        productGuige:'',//产品规格
        salesmanId:'',//业务员ID
        maters:[],//订单材料 坑子and 面子
        processcosts:[],//订单费用,
        totalCost:0,
      },
      boxTypeList: [],
      tappingList: [],//加工工序
      beerNum: [],//啤板拼数
      paperCount: [],
      printingColor: [],//印刷颜色
      printingHandle: [],//印后处理
      printingList:[],
      packAsk: [],
      paperNum:[],
      spId:[],
      mT:[],
      kT:[],
      surfaceList:[],
      finishedInfo: {
        pdLength: "",
        pdWidth: "",
        pdHigth: ""
      },
     
      dataList: [],
      facialTissue:[],//面纸
      tunnelTissue:[],//坑纸
      facialChoiseIndex:0,
      tunnelChoiseIndex:0,
      surface:{
        spId:'',
        surfaceRequired:'',//要求
        area:0,//面积
        psArea:0,//平方价
        psUnitPrice:0,//单价
        psCount:0,//数量
        psCost:0,//成本
        psType:2
      },
      printing:{//印刷
        psType:1
      },
      processingCost:{//加工
        psUnitPrice:0,
        psCount:0,
        psCostBase:0,
        psCost:0,
        psType:0,
        area:0
      },
      other:[//其他费用
        
      ],//其他费用
      orderInfo:false,
      loading:false,
      userList:[],//用户
      customer:[],//客户
      sureLoding:false
    };
  },
  created() {

    this.dict().then(() => {});
  },
    watch:{
        finishedInfo:{
            handler(value,oldValue){
               
                
                if(this.facialTissue.length !=0){
                    let mtWidth,mtLength;
                      mtLength = ((Number(value.pdLength)*2 + Number(value.pdWidth)*2)+5);
                      mtWidth = (Number(value.pdHigth)+Number(value.pdWidth)+5);

                
                      let obj = {
                          mtWidth,
                          mtLength,
                          mtUnitPrice,
                          // ...this.facialTissue[this.facialChoiseIndex]
                      }
                    this.facialTissue[this.facialChoiseIndex].mtWidth = mtWidth;
                    this.facialTissue[this.facialChoiseIndex].mtLength = mtLength;
                     //单价
                      let mT  = this.mT.find(item => item.id == this.facialTissue[this.facialChoiseIndex].mtModel);
                      let mtUnitPrice = 0;
                      let width = this.facialTissue[this.facialChoiseIndex].mtWidth;
                      let length = this.facialTissue[this.facialChoiseIndex].mtLength;
                      mtUnitPrice = ((Number(length*width)/1000000)*(Number(mT.unitPrice)/1000)*(Number(mT.gram)/1000)).toFixed(3)/1;
                      this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;
                      this.facialTissue[this.facialChoiseIndex].gram = mT.gram;
                      this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;

                    //总价
                    this.facialTissue[this.facialChoiseIndex].mtCost = (this.facialTissue[this.facialChoiseIndex].mtCount*mtUnitPrice).toFixed(3)/1;

                    // 表面 加工费
                    this.processing()
                    // let facialLength =0; let facialWidth = 0;
                    //   this.facialTissue.forEach(item =>{
                    //     facialLength += item.mtLength;
                    //     facialWidth += item.mtWidth;
                    //   })
                    //   this.surface.area = ((Number(facialLength)*Number(facialWidth))*0.000001).toFixed(3)/1;
                    //   let psUnitPrice,psCount,psCostBase,psCost,psType,area;
                    //   area = ((Number(facialWidth)*Number(facialLength))/1000000);//面积
                    //   psCount = this.basicData.odCount;//数量
                    
                    //   let paperNum = this.paperNum.find(item => item.id==this.basicData.paperCount)
                    //   //  console.log(this.basicData.paperCount,this.paperNum,"sadasdasdasdsa")
                    //   psCostBase = paperNum.value.split('/')[1];//加工费计费基准
                    //   psUnitPrice = Number(psCostBase)*Number(area);//加工单价
                    //   psCost = psUnitPrice*psCount;//人工费用
                    //   this.processingCost = {
                    //     area,psCount,psCostBase,psUnitPrice,psCost
                    //   }
                    
                }
                if(this.tunnelTissue.length !=0){
                   let height = 0;
                    let length = 0;
                    this.facialTissue.forEach(item=>{
                      height += Number(item.mtLength);
                      length += Number(item.mtWidth);
                      console.log(item,item.mtLength,item.mtWidth,22)
                    })

                    height = height-Math.abs((((Number(this.facialTissue.length) - 1)*1) - .5));
                    length = length-Math.abs((((Number(this.facialTissue.length) - 1)*1) - .5));
                    let kT  = this.kT.find(item => item.id == this.tunnelTissue[this.tunnelChoiseIndex].mtModel);
                    let mtUnitPrice = 0;
                    mtUnitPrice =  Number(height)*Number(length)*Number(kT.unitPrice).toFixed(3)/1;
                    // mtUnitPrice = ((Number(length*height)/1000000)*(Number(kT.unitPrice)/1000)*(Number(kT.gram)/1000)).toFixed(3)/1;
                    this.tunnelTissue.map(item =>{
                      item.mtLength = length;//坑纸长
                      item.mtHeight = height;//坑纸宽
                      item.mtUnitPrice = mtUnitPrice;//单价
                      item.gram = kT.gram;//克数
                    })
                    
                    console.log(this.tunnelTissue,'tunnelTissue')
                }

            
            },
            deep:true
        },
        basicData:{
          handler(value){
            if(this.facialTissue.length !=0){
              this.processing()
              // let facialLength =0; let facialWidth = 0;
              //   this.facialTissue.forEach(item =>{
              //     facialLength += item.mtLength;
              //     facialWidth += item.mtWidth;
              //   })
              //   // this.surface.area = ((Number(facialLength)*Number(facialWidth))*0.000001)
              //   let psUnitPrice,psCount,psCostBase,psCost,psType,area;
              //   area = ((Number(facialWidth)*Number(facialLength))/1000000).toFixed(3)/1;//面积
              //   psCount = value.odCount;//数量
               
              //   let paperNum = this.paperNum.find(item => item.id==value.paperCount)
              //   //  console.log(this.basicData.paperCount,this.paperNum,"sadasdasdasdsa")
              //   psCostBase = paperNum.value.split('/')[1];//加工费计费基准
              //   psUnitPrice = Number(psCostBase)*Number(area);//加工单价
              //   psCost = psUnitPrice*psCount;//人工费用
              //   this.processingCost = {
              //     area,psCount,psCostBase,psUnitPrice,psCost
              //   }
            }
          },
          deep:true
        }
        
    },
    computed:{
      totalCost(){
        let facialTissueCost = 0;let tunnelTissueCost = 0;let otherCost = 0;let printingCost = 0;let surfaceCost =0;let processingCost =0;
        this.facialTissue.forEach(item =>{
          facialTissueCost += Number(item.mtCost)
        })
        this.tunnelTissue.forEach(item =>{
          tunnelTissueCost += Number(item.mtCost)
        })
        this.other.forEach(item => {
          otherCost += Number(item.psCost)
          console.log(item)
        })
        printingCost = this.printing.psCost;//
        surfaceCost = this.surface.psCost;
        processingCost = this.processingCost.psCost;
        let totalCost  = (Number(facialTissueCost)+Number(tunnelTissueCost)+Number(otherCost)+printingCost+surfaceCost+processingCost).toFixed(3);
        console.log(totalCost,'totalCost','面子：'+facialTissueCost,"坑子:"+tunnelTissueCost,'其他：'+otherCost,'印刷费：'+printingCost,'表面：'+surfaceCost,'加工：'+processingCost)
        return isNaN(totalCost)?0:totalCost
      }
    },
  methods: {
    sureOrder(){
         this.$confirm('是否确定下单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          this.basicData.maters = [...this.facialTissue,...this.tunnelTissue];
          this.basicData.processcosts = [...this.other,this.printing,this.processingCost,this.surface];
          this.basicData.totalCost = this.totalCost;
          this.basicData.pdLength = this.finishedInfo.pdLength;
          this.basicData.pdWidth = this.finishedInfo.pdWidth;
          this.basicData.pdHigth = this.finishedInfo.pdHigth;
          console.log()
          let flag = true;
          for(let key in this.basicData){
            if(this.basicData[key]){
              flag = true
            }else{
              flag = false
              console.log(key,this.basicData[key])
            }
          }
          if(!flag){
            console.log(flag)
            return this.$message.warning("请填写所有信息")
          }
          try {
             this.sureLoding = true;
            await updataOrder(this.basicData)
            this.$message.success('下单成功');
            this.$router.push({
            name:'order'
            }).catch(err => {err})
            this.orderInfo = false;
          } catch (error) {
            
          }
          // console.log(this.basicData)
         
          this.sureLoding = false;
          
        }).catch(() => {
                
        });
    },
    handleClose(done) {
         this.$confirm('是否确定关闭', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          this.orderInfo = false

        }).catch(() => {
                
        });
      },
      choiseItem(item,index){
        console.log(111)
          this.facialChoiseIndex = index
      },
      ChoiseTunnelIndex(item,index){
           this.tunnelChoiseIndex = index
      },
      mtCountInput(value){
          console.log(value)
          this.facialTissue[this.facialChoiseIndex].mtCost = (value*this.facialTissue[this.facialChoiseIndex].mtUnitPrice).toFixed(3)/1;
            // console.log(this.facialTissue[this.facialChoiseIndex])
      },
      tMtCountInput(value){
          this.tunnelTissue[this.tunnelChoiseIndex].mtCost = (value*this.tunnelTissue[this.tunnelChoiseIndex].mtUnitPrice).toFixed(3)/1;
      },
      takeOrder(){

        this.orderInfo = true;
      },
    async dict() {
      this.loading = true;
      let boxTypeList = await boxList();
      this.boxTypeList = boxTypeList.data;
      this.tappingList = await dictApi("tapping");
      this.beerNum = await dictApi("beerNum");
      this.paperNum = await dictApi("paperNum");
      this.printingColor = await dictApi("printingColor");
      this.printingHandle = await dictApi("printingHandle");
      this.printingList =  await dictApi("printing");
      this.packAsk = await dictApi("packAsk");
      let spId = await supplierList();
      this.spId = spId.data;
      let mT =  await costList({type:1});
      this.mT = mT.data;
      let kT = await costList({type:2});
      this.kT = kT.data;
      let surfaceList = await costList({type:3});
      this.surfaceList =  surfaceList.data

      let userList = await accountList();
      this.userList = userList.data;
      let customer = await customerList();
      this.customer = customer.data;
      // console.log(this.boxTypeList)
      this.loading = false;
    },
    deleteItem(type,index){
        let list = ['是否删除该面纸','是否删除该坑纸','是否删除其他费用']
        let tips = list[type];
        this.$confirm(tips, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         if(type == 0){//面纸
            this.facialTissue.splice(index,1)
          }else if(type ==1){
            this.tunnelTissue.splice(index,1)
          }else{
            this.other.splice(index,1)
          }
        }).catch(() => {
                
        });
      
    },
    surfaceInput(value){
      this.surface.psCost =(Number(value)*this.surface.psUnitPrice).toFixed(3)/1;
    },
    surfaceChange(value){
      let surface = this.surfaceList.find(item => item.id == value);
      let psArea = surface.unitPrice;
      let psUnitPrice = (Number(this.surface.area)*surface.unitPrice).toFixed(3)/1;
      this.surface.psArea = psArea;this.surface.psUnitPrice = psUnitPrice;
    },

    mtTypeChange(value){
      
      let mT  = this.mT.find(item => item.id == value);
      let mtUnitPrice = 0;
      let width = this.facialTissue[this.facialChoiseIndex].mtWidth;
      let length = this.facialTissue[this.facialChoiseIndex].mtLength;
      mtUnitPrice = ((Number(length*width)/1000000)*(Number(mT.unitPrice)/1000)*(Number(mT.gram)/1000)).toFixed(3)/1;
       this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;
       this.facialTissue[this.facialChoiseIndex].gram = mT.gram;
    },
    ktTypeChange(value){
      let kT  = this.kT.find(item => item.id == value);
      let height = this.tunnelTissue[this.tunnelChoiseIndex].mtHeight;
      let length = this.tunnelTissue[this.tunnelChoiseIndex].mtLength;
      let mtUnitPrice = 0;
      // mtUnitPrice = ((Number(length*height)/1000000)*(Number(kT.unitPrice)/1000)*(Number(kT.gram)/1000)).toFixed(3)/1;
      mtUnitPrice =  Number(height)*Number(length)*Number(kT.unitPrice).toFixed(3)/1;
      console.log(Number(height),Number(length),Number(kT.unitPrice))
      this.tunnelTissue[this.tunnelChoiseIndex].mtUnitPrice = mtUnitPrice;
      this.tunnelTissue[this.tunnelChoiseIndex].gram = kT.gram;

    },
    caseChange(value){
      console.log(value,2222)
      let formula = this.boxTypeList.find(item => item.id==value);
      if(this.finishedInfo.pdWidth&&this.finishedInfo.pdHigth&&this.finishedInfo.pdLength){
        this.facialTissue[this.facialChoiseIndex].mtWidth = finishedInfoFormula(formula.widthMath,this.finishedInfo.pdLength,this.finishedInfo.pdWidth,this.finishedInfo.pdHigth);
        this.facialTissue[this.facialChoiseIndex].mtLength = finishedInfoFormula(formula.lengthMath,this.finishedInfo.pdLength,this.finishedInfo.pdWidth,this.finishedInfo.pdHigth);
      }
      
    },
    processing(){
        let facialLength =0; let facialWidth = 0;
                this.facialTissue.forEach(item =>{
                  facialLength += item.mtLength;
                  facialWidth += item.mtWidth;
                })

                // 表面 加工费
                this.surface.area = ((Number(facialLength)*Number(facialWidth))*0.000001).toFixed(3)/1
                let psUnitPrice,psCount,psCostBase,psCost,psType,area;
                area = ((Number(facialWidth)*Number(facialLength))/1000000).toFixed(3)/1;//面积
                psCount = this.basicData.odCount;//数量
               
                let paperNum = this.paperNum.find(item => item.id==this.basicData.paperCount)
                //  console.log(this.basicData.paperCount,this.paperNum,"sadasdasdasdsa")
                psCostBase = paperNum.value.split('/')[1];//加工费计费基准
                psUnitPrice = (Number(psCostBase)*Number(area)).toFixed(3)/1;//加工单价
                psCost = (psUnitPrice*psCount).toFixed(3)/1;//人工费用
                this.processingCost = {
                  area,psCount,psCostBase,psUnitPrice,psCost,psType:0
                }
    },
    addItem(type){
        if(type == 0){//面纸
        console.log(this.finishedInfo)
            if(this.finishedInfo.pdWidth&&this.finishedInfo.pdHigth&&this.finishedInfo.pdLength&&this.basicData.odCount&&this.basicData.paperCount&&this.basicData.caseType){
                let width,length,mtUnitPrice;
                let formula = this.boxTypeList.find(item => item.id==this.basicData.caseType) 
                console.log(formula)
                length = finishedInfoFormula(formula.lengthMath,this.finishedInfo.pdLength,this.finishedInfo.pdWidth,this.finishedInfo.pdHigth);
                width = finishedInfoFormula(formula.widthMath,this.finishedInfo.pdLength,this.finishedInfo.pdWidth,this.finishedInfo.pdHigth);
                // length = ((Number(this.finishedInfo.pdLength)*2 + Number(this.finishedInfo.pdWidth)*2)+5);
                // width = (Number(this.finishedInfo.pdHigth)+Number(this.finishedInfo.pdWidth)+5);
                mtUnitPrice = 0;
                
                let facialTissueInfo = {
                    spId:'',//供应商
                    mtModel:'',//面纸类型and面纸型号
                    mtLength:length,//面纸长
                    mtWidth:width,//面纸宽
                    mtUnitPrice:mtUnitPrice,//面纸单价,
                    mtCount:'',//面纸数量
                    mtCost:'',//面纸成本
                    mtType:1,//面纸
                    gram:''
                    //克数
                }

                this.facialTissue.push(facialTissueInfo);
                this.processing()
                // let facialLength =0; let facialWidth = 0;
                // this.facialTissue.forEach(item =>{
                //   facialLength += item.mtLength;
                //   facialWidth += item.mtWidth;
                // })

                // // 表面 加工费
                // this.surface.area = ((Number(facialLength)*Number(facialWidth))*0.000001).toFixed(3)/1
                // let psUnitPrice,psCount,psCostBase,psCost,psType,area;
                // area = ((Number(facialWidth)*Number(facialLength))/1000000).toFixed(3)/1;//面积
                // psCount = this.basicData.odCount;//数量
               
                // let paperNum = this.paperNum.find(item => item.id==this.basicData.paperCount)
                // //  console.log(this.basicData.paperCount,this.paperNum,"sadasdasdasdsa")
                // psCostBase = paperNum.value.split('/')[1];//加工费计费基准
                // psUnitPrice = (Number(psCostBase)*Number(area)).toFixed(3)/1;//加工单价
                // psCost = psUnitPrice*psCount;//人工费用
                // this.processingCost = {
                //   area,psCount,psCostBase,psUnitPrice,psCost
                // }
                // console.log(this.processingCost,'this.processingCost')

            }else{
                return this.$message.warning('请完成填写箱型,成品高，成品宽，成品宽，订单数量，纸层数的信息')
            }
        }else if(type == 1){//坑纸
          if(this.facialTissue.length == 0 ){
            return this.$message.warning('请完成填写面纸的信息')
          }else{
            let height = 0;let mtUnitPrice = 0;
            let length = 0;
            this.facialTissue.forEach(item=>{
              height += Number(item.mtLength);
              length += Number(item.mtWidth);
              console.log(item,item.mtLength,item.mtWidth)
            })
             height = height-Math.abs((((Number(this.facialTissue.length) - 1)*1) - .5));
            length = length-Math.abs((((Number(this.facialTissue.length) - 1)*1) - .5));
            // mtUnitPrice = Number(height)*Number(length);
              // debugger
              let tunnelTissueInfo = {
                    spId:'',//供应商
                    mtModel:'',//面纸类型and面纸型号
                    mtLength:length,//面纸长
                    mtHeight:height,//面纸宽
                    mtUnitPrice:mtUnitPrice,//面纸单价,
                    mtCount:'',//面纸数量
                    mtCost:'',//面纸成本
                    mtType:2,//坑纸
                    gram:''
                    //克数
                }
                this.tunnelTissue.push(tunnelTissueInfo)
              console.log(tunnelTissueInfo)
          }

        }else{
          let other = {
            psCost:0,
            psName:'',
            psType:3
          }
          this.other.push(other)
          console.log(this.other)
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.warp {
  .form-inline {
    width: 300px;
  }
  .form-inline-big{
    width: 400px;
  }
  .facialTissue {
    text-align: left;
    padding: 20px;
    .h1 {
      font-weight: 600;
      font-size: 26px;
    }
  }
}
</style>