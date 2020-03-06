<template>
  <div class="warp" v-loading="loading">
    <div class="from">
      <el-form size="mini" inline label-width="100px">
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
          <el-input v-model.number="basicData.odCount" placeholder="请输入订单数量"></el-input>
        </el-form-item>
        <el-form-item label="包装要求:" class="form-inline">
          <el-select v-model="basicData.packageRequire" placeholder="请选择">
            <el-option
              v-for="item in packAsk"
              :key="Number(item.key)"
              :label="item.value"
              :value="Number(item.key)"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="加工工序:" class="form-inline">
          <el-select v-model="basicData.workProsedure" placeholder="请选择">
            <el-option
              v-for="item in tappingList"
              :key="Number(item.key)"
              :label="item.value"
              :value="Number(item.key)"
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
            <el-option
              v-for="item in paperNum"
              :key="Number(item.key)"
              :label="item.value"
              :value="Number(item.key)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单金额(元):" class="form-inline">
          <el-input v-model="basicData.odMoney" placeholder="请输入订单金额（元）"></el-input>
        </el-form-item>

        <el-form-item label="啤板拼数:" class="form-inline">
          <el-select v-model="basicData.beerCount" placeholder="请选择">
            <el-option
              v-for="item in beerNum"
              :key="Number(item.key)"
              :label="item.value"
              :value="Number(item.key)"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="印刷颜色:" class="form-inline">
          <el-select v-model="basicData.printColor" placeholder="请选择">
            <el-option
              v-for="item in printingColor"
              :key="Number(item.key)"
              :label="item.value"
              :value="Number(item.key)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="印后处理:" class="form-inline">
          <el-select v-model="basicData.printDealType" placeholder="请选择">
            <el-option
              v-for="item in printingHandle"
              :key="Number(item.key)"
              :label="item.value"
              :value="Number(item.key)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-inline">
          <!-- <el-select v-model="basicData.printingHandle" placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="Number(item.key)"
                :label="item.value"
                :value="Number(item.key)">
                </el-option>
          </el-select>-->
        </el-form-item>
      </el-form>
      <el-form size="mini" inline label-width="100px">
        <el-form-item label="成品长:" class="form-inline">
          <el-input v-model.number="finishedInfo.pdLength" placeholder="请输入成品长"></el-input>
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
          <el-form-item v-for="(item,index) in facialTissue" :key="index" :class="{'materActive':item.active}">
            <!-- {{item}} -->
            <div @click="choiseItem(item,index)">
             
              <el-form-item label="面纸供应商:" class="form-inline">
                <el-select placeholder="请选择"  @click.native="choiseItem(item,index)" @change="mtSpChange" v-model="item.spId">
                  <el-option
                    v-for="item in spId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面纸型号:" class="form-inline">
                <el-select placeholder="请选择" v-model="item.mtModel" @click.native="choiseItem(item,index)">
                  <el-option v-for="item in mT" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面纸长:" class="form-inline">
                <el-input  v-model.number="item.mtLength" placeholder="请输入面纸长"></el-input>
                <!-- <span>{{item.mtLength}}</span> -->
              </el-form-item>
              <el-form-item label="面纸宽:" class="form-inline">
                <el-input  v-model.number="item.mtWidth" placeholder="请输入面纸宽"></el-input>
                <!-- <span>{{item.mtWidth}}</span> -->
              </el-form-item>
              <el-form-item label="面纸单价:" class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>{{item.mtUnitPrice}}</span>
              </el-form-item>
              <el-form-item label="面纸数量:" class="form-inline">
                <el-input  v-model.number="item.mtCount" placeholder="请输入成品高"></el-input>
              </el-form-item>
              <el-form-item label="面纸成本:" class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>{{item.mtCost}}</span>
              </el-form-item>
              <el-form-item label="面纸类型:" class="form-inline">
                <el-select placeholder="请选择" v-model="item.mtModel" disabled>
                  <el-option v-for="item in mT" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面纸克数:" class="form-inline">
                <span>{{item.gram}}</span>
              </el-form-item>

              <!-- <template slot="footer"> -->
              <div style="text-align: right;">
                <el-button type="danger" size="medium" @click="deleteItem(0,index,item)">删除</el-button>
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
          <el-form-item v-for="(item,index) in tunnelTissue" :key="index" :class="{'materActive':item.active}">
            <div @click="ChoiseTunnelIndex(item,index)">
              <el-form-item label="坑纸供应商:" class="form-inline">
                <el-select placeholder="请选择" @click.native="ChoiseTunnelIndex(item,index)" @change="ktSpChange" v-model="item.spId">
                  <el-option
                    v-for="item in spId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="坑纸型号:" class="form-inline">
                <el-select placeholder="请选择" @click.native="ChoiseTunnelIndex(item,index)" v-model="item.mtModel" @change="ktTypeChange">
                  <el-option v-for="item in kT" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="坑纸长:" class="form-inline">
                <el-input  v-model="item.mtLength" placeholder="请输入成品高"></el-input>
                <!-- <span>{{item.mtLength}}</span> -->
              </el-form-item>
              <el-form-item label="坑纸高:" class="form-inline">
                <el-input  v-model="item.mtHeight" placeholder="请输入成品高"></el-input>
                <!-- <span>{{item.mtHeight}}</span> -->
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
                <el-select placeholder="请选择" v-model="item.mtModel" disabled>
                  <el-option v-for="item in kT" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="坑纸克数:" class="form-inline">
                <span>{{item.gram}}</span>
              </el-form-item>
              <div style="text-align: right;">
                <el-button type="danger" size="medium" @click="deleteItem(1,index,item)">删除</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="facialTissue">
        <div class="space-between">
          <div class="h1">表面处理</div>
        </div>
        <el-form size="mini" inline label-width="120px" style="padding:20px">
          <el-form-item label="表面处理供应商:" class="form-inline-big">
            <el-select v-model="surface.spId" placeholder="请选择" @change='surfaceSpChange' >
              <el-option v-for="item in spId" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表面处理要求:" class="form-inline-big">
            <el-select v-model="surface.surfaceRequired" placeholder="请选择" @change="surfaceChange">
              <el-option
                v-for="item in surfaceList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
      <div class="facialTissue">
        <div class="space-between">
          <div class="h1">印刷</div>
        </div>
        <el-form size="mini" inline label-width="120px" style="padding:20px">
          <el-form-item label="印刷厂家:">
            <el-select v-model="printing.spId" placeholder="请选择">
              <el-option v-for="item in spId" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="印刷机类型:">
            <el-select v-model="printing.printType" placeholder="请选择">
              <el-option
                v-for="item in printingList"
                :key="Number(item.key)"
                :label="item.value"
                :value="Number(item.key)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="印刷费用:">
            <el-input v-model.number="printing.psCost" placeholder="印刷费用"></el-input>
          </el-form-item>
          <el-form-item label="印刷备注:">
            <el-input v-model.number="printing.remark" placeholder="印刷备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="facialTissue">
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
            <el-input v-model="processingCost.psCost" placeholder="人工费用"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="facialTissue">
        <div class="space-between">
          <div class="h1">其他费用</div>
          <el-button type="primary" @click="addItem(2)" icon="el-icon-edit">新增</el-button>
        </div>
        <el-form size="mini" inline label-width="120px" style="padding:20px">
          <el-form-item v-for="(item,index) in other" :key="index">
            <el-form-item label="费用备注:">
              <el-select v-model="item.remarkKey" placeholder="请选择">
                <el-option
                  v-for="item in costRemake"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
              <!-- <el-input v-model.trim="item." placeholder="备注"></el-input> -->
            </el-form-item>
            <el-form-item label="费用:" class="form-inline">
              <el-input v-model.number="item.psCost" placeholder="费用"></el-input>
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="danger" size="medium" @click="deleteItem(2,index,item)">删除</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="facialTissue">
        <div class="space-between">
          <div class="h1">上传图纸</div>
        </div>
        <div class="center">
          <el-upload
            class="upload"
            :action="action"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :headers="headers"
            :on-success="uploadSuccess"
            multiple
            show-file-list
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
      <div class="center">
        <el-button type="primary" v-if="basicData.id" @click="takeOrder">确认修改({{totalCost}})</el-button>
        <el-button type="primary" v-else @click="takeOrder">我要下单({{totalCost}})</el-button>
      </div>
    </div>

    <el-dialog
      :title="this.basicData.id?'修改订单':'我要下单'"
      :visible.sync="orderInfo"
      width="80%"
      :before-close="handleClose"
    >
      <el-form
        inline
        size="mini"
        label-width="120px"
        ref="orderInfo"
        :model="basicData"
        :rules="orderInfoRules"
      >
        <el-form-item label="产品名字:" prop="odName">
          <el-input v-model="basicData.odName" placeholder="请输入产品名字"></el-input>
        </el-form-item>
        <el-form-item label="业务员:" prop="salesmanId">
          <el-select placeholder="请选择" v-model="basicData.salesmanId">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.contactName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品规格:" prop="productGuige">
          <el-input v-model="basicData.productGuige" placeholder="请输入产品规格"></el-input>
        </el-form-item>
        <!-- <el-form-item label="合同编号:">
             <el-input v-model="basicData.contractNumber" placeholder="请输入合同编号"></el-input>
        </el-form-item>-->
        <el-form-item label="客户合同编号:" prop="ctContractNumber">
          <el-input v-model="basicData.ctContractNumber" placeholder="请输入客户合同编号"></el-input>
        </el-form-item>
        <el-form-item label="跟单员:" prop="merchandiserId">
          <el-select placeholder="请选择" v-model="basicData.merchandiserId">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.contactName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户:" prop="customerId">
          <el-select placeholder="请选择" v-model="basicData.customerId">
            <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单日期:" prop="odSetdate">
          <el-date-picker
            v-model="basicData.odSetdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="订单日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="交货日期:" prop="odFinishdate">
          <el-date-picker
            v-model="basicData.odFinishdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="交货日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          v-if="$route.query.type == 1"
          type="warning"
          :loading="sureLoding"
          @click="sureOrder(0)"
        >另存为</el-button>
        <el-button
          v-else
          type="primary"
          :loading="sureLoding"
          @click="sureOrder(1)"
        >{{basicData.id?'确定修改':'确定下单'}}</el-button>
      </span>
    </el-dialog>
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
  </div>
</template>

<script>
import { dictApi, finishedInfoFormula } from "@/utils";
import {
  updataOrder,
  orderDetail,
  uploadFile,
  delFile,
  delMater,
  delProcesscost
} from "@/api/order";
import { costList } from "@/api/cost";
import { supplierList } from "@/api/supplier";
import { accountList } from "@/api/user";
import { customerList } from "@/api/customer";
import { boxList } from "@/api/box";
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
        ctContractNumber: "", //客户合同编号
        customerId: "", //客户ID
        merchandiserId: "", //跟单员ID,
        odFinishdate: "", //交货日期
        odName: "", //订单名称
        odSetdate: "", //订单日期
        productGuige: "", //产品规格
        salesmanId: "", //业务员ID
        maters: [], //订单材料 坑子and 面子
        processcosts: [], //订单费用,
        totalCost: 0,
        id: "" //订单id
      },
      boxTypeList: [],
      tappingList: [], //加工工序
      beerNum: [], //啤板拼数
      paperCount: [],
      printingColor: [], //印刷颜色
      printingHandle: [], //印后处理
      printingList: [],
      packAsk: [],
      paperNum: [],
      spId: [],
      mT: [],
      kT: [],
      surfaceList: [],
      finishedInfo: {
        pdLength: "",
        pdWidth: "",
        pdHigth: ""
      },

      dataList: [],
      facialTissue: [], //面纸
      tunnelTissue: [], //坑纸
      facialChoiseIndex: 0,
      tunnelChoiseIndex: 0,
      surface: {
        spId: "",
        surfaceRequired: "", //要求
        area: 0, //面积
        psArea: 0, //平方价
        psUnitPrice: 0, //单价
        psCount: 0, //数量
        psCost: 0, //成本
        psType: 2
      },
      printing: {
        //印刷
        psType: 1,
        remark: "",
        psCost: 0,
        printType: "",
        spId: ""
      },
      processingCost: {
        //加工
        psUnitPrice: 0,
        psCount: 0,
        psCostBase: 0,
        psCost: 0,
        psType: 0,
        area: 0
      },
      other: [
        //其他费用
      ], //其他费用
      orderInfo: false,
      loading: false,
      userList: [], //用户
      customer: [], //客户
      sureLoding: false,
      costRemake: [],
      fileList: [],
      suerFile: [],
      action: "http://wearewwx.com:8080/order/upload",
      headers: {
        token: window.sessionStorage.getItem("token")
      },
      orderInfoRules: {
        odName: { required: true, message: "内容不能为空" },
        salesmanId: { required: true, message: "内容不能为空" },
        productGuige: { required: true, message: "内容不能为空" },
        ctContractNumber: { required: true, message: "内容不能为空" },
        merchandiserId: { required: true, message: "内容不能为空" },
        customerId: { required: true, message: "内容不能为空" },
        odSetdate: { required: true, message: "内容不能为空" },
        odFinishdate: { required: true, message: "内容不能为空" }
      }
    };
  },
  created() {
    this.dict().then(() => {});
  },
  watch: {
    finishedInfo: {
      handler(value, oldValue) {
        console.log(value, oldValue, "handler");
        let formula = this.boxTypeList.find(
          item => item.id == this.basicData.caseType
        );
        if (this.facialTissue.length != 0) {
          let mtWidth, mtLength;

          mtLength = finishedInfoFormula(
            formula.faceLengthMath,
            value.pdLength,
            value.pdWidth,
            value.pdHigth
          );
          mtWidth = finishedInfoFormula(
            formula.faceWidthMath,
            value.pdLength,
            value.pdWidth,
            value.pdHigth
          );

          // let obj = {
          //     mtWidth,
          //     mtLength,
          //     mtUnitPrice,
          //     // ...this.facialTissue[this.facialChoiseIndex]
          // }
          this.facialTissue[this.facialChoiseIndex].mtWidth = mtWidth;
          this.facialTissue[this.facialChoiseIndex].mtLength = mtLength;
          //单价
          let mT = this.mT.find(
            item => item.id == this.facialTissue[this.facialChoiseIndex].mtModel
          );
          let mtUnitPrice = 0;
          let width = this.facialTissue[this.facialChoiseIndex].mtWidth;
          let length = this.facialTissue[this.facialChoiseIndex].mtLength;
          mtUnitPrice =
            (
              (Number(length * width) / 1000000) *
              (Number(mT.unitPrice) / 1000) *
              (Number(mT.gram) / 1000)
            ).toFixed(3) / 1;
          this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;
          this.facialTissue[this.facialChoiseIndex].gram = mT.gram;
          this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;

          //总价
          this.facialTissue[this.facialChoiseIndex].mtCost =
            (
              this.facialTissue[this.facialChoiseIndex].mtCount * mtUnitPrice
            ).toFixed(3) / 1;

          // 表面 加工费
          this.processing();
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
        if (this.tunnelTissue.length != 0) {
          console.log(
            this.tunnelChoiseIndex,
            "this.tunnelChoiseIndex",
            this.tunnelTissue
          );
          let height = 0;
          let length = 0;
          length = finishedInfoFormula(
            formula.pitLengthMath,
            this.finishedInfo.pdLength,
            this.finishedInfo.pdWidth,
            this.finishedInfo.pdHigth
          );
          height = finishedInfoFormula(
            formula.pitHeightMath,
            this.finishedInfo.pdLength,
            this.finishedInfo.pdWidth,
            this.finishedInfo.pdHigth
          );

          // height = height-Math.abs((((Number(this.facialTissue.length) - 1)*1) - .5));
          // length = length-Math.abs((((Number(this.facialTissue.length) - 1)*1) - .5));
          let kT = this.kT.find(
            item => item.id == this.tunnelTissue[this.tunnelChoiseIndex].mtModel
          );
          let mtUnitPrice = 0;
          mtUnitPrice =
            (
              (Number(height) * Number(length) * Number(kT.unitPrice)) /
              1000000
            ).toFixed(3) / 1;
          this.tunnelTissue[this.tunnelChoiseIndex].mtCost =
            (
              this.tunnelTissue[this.tunnelChoiseIndex].mtCount * mtUnitPrice
            ).toFixed(3) / 1;
          // mtUnitPrice = ((Number(length*height)/1000000)*(Number(kT.unitPrice)/1000)*(Number(kT.gram)/1000)).toFixed(3)/1;
          this.tunnelTissue.map(item => {
            item.mtLength = length; //坑纸长
            item.mtHeight = height; //坑纸宽
            item.mtUnitPrice = mtUnitPrice; //单价
            item.gram = kT.gram; //克数
          });

          console.log(this.tunnelTissue, "tunnelTissue");
        }
      },
      deep: true
    },
    basicData: {
      handler(value) {
        if (this.facialTissue.length != 0) {
          this.processing();
        }
        // console.log(value)
        this.orderCost();
      },
      deep: true
    },
    facialTissue:{
       handler(value,oldValue){
         console.log(value)
        value.forEach((item,index)=>{
          let {width,length} = {width:item.mtWidth,length:item.mtLength};
          // console.log(width,length,index,item)
          
        let mT = this.mT.find(
          items => items.id == item.mtModel
        );
        console.log(mT)
        if(!mT){
          return
        }
        let mtUnitPrice = 0;
        mtUnitPrice = (
            (Number(length * width) / 1000000) *
            (Number(mT.unitPrice) / 1000) *
            (Number(mT.gram) / 1000)
          ).toFixed(3) / 1
          // :
          // (
          //   (Number(length * width) / 1000000) *
          //   (Number(mT.unitPrice) / 1000) *
          //   (Number(mT.gram) / 1000)
          // ).toFixed(3) / 1;
          item.unitPrice = mT.unitPrice;
        item.mtUnitPrice = mtUnitPrice;
        item.mtCost =(item.mtCount * mtUnitPrice).toFixed(3) / 1;
          item.gram = mT.gram;
          console.log(item,item.mtCost)
          this.processing()
         
        })
       
      },
      deep:true
    },

    tunnelTissue:{
      handler(value,oldValue){

          value.forEach((item,index)=>{
            console.log(item)
              let {height,length} = {height:item.mtHeight,length:item.mtLength};
          //  let height = this.tunnelTissue[this.tunnelChoiseIndex].mtHeight;
          // let length = value;
          let kT = this.kT.find(
            items => items.id == item.mtModel
          );
          if(!kT){
            return
          }
          let mtUnitPrice = 0;
          mtUnitPrice =(
              (Number(height) * Number(length) * Number(kT.unitPrice)) /
              1000000
            ).toFixed(3) / 1
          item.mtUnitPrice = mtUnitPrice;
          item.mtCost =
            (
              item.mtCount * mtUnitPrice
            ).toFixed(3) / 1;
          item.gram = kT.gram;
          })
          
          },
          deep:true
    },
  },
  computed: { 
    totalCost() {
      let facialTissueCost = 0;
      let tunnelTissueCost = 0;
      let otherCost = 0;
      let printingCost = 0;
      let surfaceCost = 0;
      let processingCost = 0;
      this.facialTissue.forEach(item => {
        facialTissueCost += Number(item.mtCost);
      });
      this.tunnelTissue.forEach(item => {
        tunnelTissueCost += Number(item.mtCost);
      });
      this.other.forEach(item => {
        otherCost += Number(item.psCost);
        console.log(item);
      });
      printingCost = this.printing.psCost; //
      surfaceCost = this.surface.psCost;
      processingCost = this.processingCost.psCost;
      let totalCost = (
        Number(facialTissueCost) +
        Number(tunnelTissueCost) +
        Number(otherCost) +
        Number(printingCost) +
        Number(surfaceCost) +
        Number(processingCost)
      ).toFixed(3);
      console.log(
        totalCost,
        "totalCost",
        "面子：" + facialTissueCost,
        "坑子:" + tunnelTissueCost,
        "其他：" + otherCost,
        "印刷费：" + printingCost,
        "表面：" + surfaceCost,
        "加工：" + processingCost
      );
      return isNaN(totalCost) ? 0 : totalCost;
    },


  },
  methods: {
    async mtSpChange(value){
      this.facialTissue[this.facialChoiseIndex].mtModel ='';
      let res =  await costList({ supplierId:value,type: 1 })
      this.mT = res.data;
      // let width = this.facialTissue[this.facialChoiseIndex].mtWidth;
      // let length = this.facialTissue[this.facialChoiseIndex].mtLength;
      // let obj ={
      //   width,length
      // }
      // this.mtCompute(obj);
      
    },
    async ktSpChange(value){
       this.tunnelTissue[this.tunnelChoiseIndex].mtModel ='';
      let res =  await costList({ supplierId:value,type: 2 })
      this.kT = res.data;
      //  let height = this.tunnelTissue[this.tunnelChoiseIndex].mtHeight;
      // let length = this.tunnelTissue[this.tunnelChoiseIndex].mtLength;;
      // let obj = {
      //   height,length
      // }
      // this.ktCompute(obj)
    },
    async surfaceSpChange(value){
      this.surface.surfaceRequired = '';
      let res =  await costList({ supplierId:value,type: 3 })
      this.surfaceList = res.data
      
    },
    mtWInput(value) {
      let width = value;
      let length = this.facialTissue[this.facialChoiseIndex].mtLength;
     let obj ={
        width,length
      }
      this.mtCompute(obj);
      // let mT = this.mT.find(
      //   item => item.id == this.facialTissue[this.facialChoiseIndex].mtModel
      // );
      // let mtUnitPrice = 0;
      // mtUnitPrice =
      //   (
      //     (Number(length * width) / 1000000) *
      //     (Number(mT.unitPrice) / 1000) *
      //     (Number(mT.gram) / 1000)
      //   ).toFixed(3) / 1;
      // this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;
      // this.facialTissue[this.facialChoiseIndex].mtCost =
      //   (
      //     this.facialTissue[this.facialChoiseIndex].mtCount * mtUnitPrice
      //   ).toFixed(3) / 1;
    },
    mtCompute(obj){
      let {width,length} = {...obj}
      // let width = value;
      // let length = this.facialTissue[this.facialChoiseIndex].mtLength;
      let mT = this.mT.find(
        item => item.id == this.facialTissue[this.facialChoiseIndex].mtModel
      );
      //  console.log(mT)
      if(!mT){
        return
      }
     
      let mtUnitPrice = 0;
      mtUnitPrice =
        (
          (Number(length * width) / 1000000) *
          (Number(mT.unitPrice) / 1000) *
          (Number(mT.gram) / 1000)
        ).toFixed(3) / 1;
      this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;
      this.facialTissue[this.facialChoiseIndex].mtCost =
        (
          this.facialTissue[this.facialChoiseIndex].mtCount * mtUnitPrice
        ).toFixed(3) / 1;
        this.facialTissue[this.facialChoiseIndex].gram = mT.gram;
        this.processing()
    },

    mtLInput(value) {
      let width = this.facialTissue[this.facialChoiseIndex].mtWidth;
      let length = value;
      let obj ={
        width,length
      }
      this.mtCompute(obj);
      // let mT = this.mT.find(
      //   item => item.id == this.facialTissue[this.facialChoiseIndex].mtModel
      // );
      // let mtUnitPrice = 0;
      // mtUnitPrice =
      //   (
      //     (Number(length * width) / 1000000) *
      //     (Number(mT.unitPrice) / 1000) *
      //     (Number(mT.gram) / 1000)
      //   ).toFixed(3) / 1;
      // this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;
      // this.facialTissue[this.facialChoiseIndex].mtCost =
      //   (
      //     this.facialTissue[this.facialChoiseIndex].mtCount * mtUnitPrice
      //   ).toFixed(3) / 1;
    },
    ktCompute(obj){
      let {height,length} = {...obj};
      //  let height = this.tunnelTissue[this.tunnelChoiseIndex].mtHeight;
      // let length = value;
      let kT = this.kT.find(
        item => item.id == this.tunnelTissue[this.tunnelChoiseIndex].mtModel
      );
      if(!kT){
        return
      }
      let mtUnitPrice = 0;
      mtUnitPrice =
        (
          (Number(height) * Number(length) * Number(kT.unitPrice)) /
          1000000
        ).toFixed(3) / 1;
      this.tunnelTissue[this.tunnelChoiseIndex].mtUnitPrice = mtUnitPrice;
      this.tunnelTissue[this.tunnelChoiseIndex].mtCost =
        (
          this.tunnelTissue[this.tunnelChoiseIndex].mtCount * mtUnitPrice
        ).toFixed(3) / 1;
      this.tunnelTissue[this.tunnelChoiseIndex].gram = kT.gram;
    },
    ktLInput(value) {
      let height = this.tunnelTissue[this.tunnelChoiseIndex].mtHeight;
      let length = value;
      let obj = {
        height,length
      }
      this.ktCompute(obj)
      // let kT = this.kT.find(
      //   item => item.id == this.tunnelTissue[this.tunnelChoiseIndex].mtModel
      // );
      // let mtUnitPrice = 0;
      // mtUnitPrice =
      //   (
      //     (Number(height) * Number(length) * Number(kT.unitPrice)) /
      //     1000000
      //   ).toFixed(3) / 1;
      // this.tunnelTissue[this.tunnelChoiseIndex].mtUnitPrice = mtUnitPrice;
      // this.tunnelTissue[this.tunnelChoiseIndex].mtCost =
      //   (
      //     this.tunnelTissue[this.tunnelChoiseIndex].mtCount * mtUnitPrice
      //   ).toFixed(3) / 1;
    },
    ktHInput(value) {
      let height = value;
      let length = this.tunnelTissue[this.tunnelChoiseIndex].mtLength;
      let obj = {
        height,length
      }
      this.ktCompute(obj)
      // let kT = this.kT.find(
      //   item => item.id == this.tunnelTissue[this.tunnelChoiseIndex].mtModel
      // );
      // let mtUnitPrice = 0;
      // mtUnitPrice =
      //   (
      //     (Number(height) * Number(length) * Number(kT.unitPrice)) /
      //     1000000
      //   ).toFixed(3) / 1;
      // this.tunnelTissue[this.tunnelChoiseIndex].mtUnitPrice = mtUnitPrice;
      // this.tunnelTissue[this.tunnelChoiseIndex].mtCost =
      //   (
      //     this.tunnelTissue[this.tunnelChoiseIndex].mtCount * mtUnitPrice
      //   ).toFixed(3) / 1;
    },
    async initOrder() {
      try {
        let res = await orderDetail({ id: this.$route.query.id });
        console.log(res, "res");

        let {
          beerCount,
          caseType,
          odCount,
          packageRequire,
          workProsedure,
          unitPrice,
          beerPlate,
          paperCount,
          odMoney,
          printColor,
          printDealType,
          id,
          odName,
          salesmanId,
          productGuige,
          ctContractNumber,
          merchandiserId,
          customerId,
          odSetdate,
          odFinishdate
        } = { ...res.data };

        this.basicData = {
          beerCount,
          caseType,
          odCount,
          packageRequire,
          workProsedure,
          unitPrice,
          beerPlate,
          paperCount,
          odMoney,
          printColor,
          printDealType,
          id,
          odName,
          salesmanId,
          productGuige,
          ctContractNumber,
          merchandiserId,
          customerId,
          odSetdate,
          odFinishdate
        };
        let { pdLength, pdWidth, pdHigth } = { ...res.data };
        this.finishedInfo = { pdLength, pdWidth, pdHigth };
        // if (this.$route.query.type != 1) {
          let facialTissue = res.data.maters.filter(item => item.mtType == 1);
          facialTissue.map((item)=>{
            item.active = false;
          })
          this.facialTissue = facialTissue;
          let tunnelTissue = res.data.maters.filter(item => item.mtType == 2);
          tunnelTissue.map((item)=>{
            item.active = false;
          })
          this.tunnelTissue = tunnelTissue;
          let surface = res.data.processcosts.find(item => item.psType == 2);

          this.surface = surface ? surface : this.surface;
          // debugger
          let printing = res.data.processcosts.find(item => item.psType == 1);
          this.printing = printing ? printing : this.printing;
          let processingCost = res.data.processcosts.find(
            item => item.psType == 0
          );
          this.processingCost = processingCost
            ? processingCost
            : this.processingCost;
          let other = res.data.processcosts.filter(item => item.psType == 3);

          this.other = other ? other : this.other;
      if(this.$route.query.type == 1){
         this.fileList =[];
          this.suerFile = [];
      }else{
         let list = [];
          res.data.attachments.forEach(item => {
            let obj = {
              name: item.oldName,
              id: item.id,
              odId: item.odId,
              realName: item.realName
            };
            list.push(obj);
          });

          this.fileList = [...list];
          this.suerFile = res.data.attachments;
      }

         
        // } else {
        // }
      } catch (error) {
        console.log(error);
      }

      // console.log(res.data)
    },
    sureOrder(type) {
      this.$refs["orderInfo"].validate(valid => {
        console.log(valid);
        if (valid) {
          let tips = this.basicData.id ? "是否确定修改订单" : "是否确定下单";
          this.$confirm(tips, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              this.basicData.id = type == 0 ? "" : this.basicData.id;
              this.basicData.maters = [
                ...this.facialTissue,
                ...this.tunnelTissue
              ];
              this.basicData.processcosts = [
                ...this.other,
                this.printing,
                this.processingCost,
                this.surface
              ];
              this.basicData.totalCost = this.totalCost;
              this.basicData.pdLength = this.finishedInfo.pdLength;
              this.basicData.pdWidth = this.finishedInfo.pdWidth;
              this.basicData.pdHigth = this.finishedInfo.pdHigth;
              this.basicData.attachments = this.suerFile;
              console.log(this.basicData.maters)
              // debugger
              let flag = true;
              for (let key in this.basicData) {
                if (this.basicData[key]) {
                  flag = true;
                } else {
                  flag = false;
                  console.log(key, this.basicData[key]);
                }
              }
              if (!flag) {
                console.log(flag);
                return this.$message.warning("请填写所有信息");
              }
              try {
                this.sureLoding = true;
                let res = await updataOrder(this.basicData);
                this.$message.success(res.returnMsg);
                this.$router
                  .push({
                    name: "order"
                  })
                  .catch(err => {
                    err;
                  });
                this.orderInfo = false;
              } catch (error) {}
              // console.log(this.basicData)

              this.sureLoding = false;
            })
            .catch(() => {});
        } else {
          return this.$message.warning("请填写完整信息!!");
        }
      });
    },
    handleClose(done) {
      this.$confirm("是否确定关闭", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.orderInfo = false;
        })
        .catch(() => {});
    },
    choiseItem(item, index) {
      console.log(index);
      this.facialChoiseIndex = index;
      this.facialTissue.map((item,sindex)=>{
        if(index == sindex){
          item.active = true;
        }else{
          item.active = false;
        }
        

      })
      // this.facialTissue[index].active = true;
    },
    ChoiseTunnelIndex(item, index) {
      console.log(index)
      this.tunnelChoiseIndex = index;
       this.tunnelTissue.map((item,sindex)=>{
        if(index == sindex){
          item.active = true;
        }else{
          item.active = false;
        }
       })
    },
    mtCountInput(value) {
      console.log(value);
      this.facialTissue[this.facialChoiseIndex].mtCost =
        (value * this.facialTissue[this.facialChoiseIndex].mtUnitPrice).toFixed(
          3
        ) / 1;
      // console.log(this.facialTissue[this.facialChoiseIndex])
    },
    tMtCountInput(value) {
      this.tunnelTissue[this.tunnelChoiseIndex].mtCost =
        (value * this.tunnelTissue[this.tunnelChoiseIndex].mtUnitPrice).toFixed(
          3
        ) / 1;
    },
    takeOrder() {
      if (this.facialTissue.length || this.tunnelTissue.length) {
        this.orderInfo = true;
      } else {
        this.$message.warning("请添加材料");
      }
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
      this.printingList = await dictApi("printing");
      this.packAsk = await dictApi("packAsk");
      this.costRemake = await dictApi("costRemake");
      let spId = await supplierList();
      this.spId = spId.data;
      if(this.$route.query.id){
        let mT = await costList({ type: 1 });
        this.mT = mT.data;
        let kT = await costList({ type: 2 });
        this.kT = kT.data;
        let surfaceList = await costList({ type: 3 });
        this.surfaceList = surfaceList.data;

      }
      
      let userList = await accountList();
      this.userList = userList.data;
      let customer = await customerList();
      this.customer = customer.data;

      // console.log(this.boxTypeList)
      if (this.$route.query.id) {
        await this.initOrder();
      }
      this.loading = false;
    },
    deleteItem(type, index, item) {
      let list = ["是否删除该面纸", "是否删除该坑纸", "是否删除其他费用"];
      let tips = list[type];
      this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            if (item.id) {
              let res;
              if (type == 0) {
                //面纸
                res = await delMater({ id: item.id });
                this.facialTissue.splice(index, 1);
              } else if (type == 1) {
                res = await delMater({ id: item.id });
                this.tunnelTissue.splice(index, 1);
              } else {
                res = await delProcesscost({ id: item.id });
                this.other.splice(index, 1);
              }
              this.$message.success(res.returnMsg);
            } else {
              if (type == 0) {
                //面纸
                this.facialTissue.splice(index, 1);
              } else if (type == 1) {
                this.tunnelTissue.splice(index, 1);
              } else {
                this.other.splice(index, 1);
              }
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {});
    },
    surfaceInput(value) {
      this.surface.psCost =
        (Number(value) * this.surface.psUnitPrice).toFixed(3) / 1;
    },
    surfaceChange(value) {
      let surface = this.surfaceList.find(item => item.id == value);
      let psArea = surface.unitPrice;
      let psUnitPrice =
        (Number(this.surface.area) * Number(surface.unitPrice)).toFixed(3) / 1;
      this.surface.psArea = psArea;
      this.surface.psUnitPrice = psUnitPrice;
    },

    mtTypeChange(value) {
      let mT = this.mT.find(item => item.id == value);
      let mtUnitPrice = 0;
      let width = this.facialTissue[this.facialChoiseIndex].mtWidth;
      let length = this.facialTissue[this.facialChoiseIndex].mtLength;
      let obj = {
        width,length
      }
      this.mtCompute(obj)
      // mtUnitPrice =
      //   (
      //     (Number(length * width) / 1000000) *
      //     (Number(mT.unitPrice) / 1000) *
      //     (Number(mT.gram) / 1000)
      //   ).toFixed(3) / 1;
      // this.facialTissue[this.facialChoiseIndex].mtUnitPrice = mtUnitPrice;
      // this.facialTissue[this.facialChoiseIndex].gram = mT.gram;
    },
    ktTypeChange(value) {
      // let kT = this.kT.find(item => item.id == value);
      let height = this.tunnelTissue[this.tunnelChoiseIndex].mtHeight;
      let length = this.tunnelTissue[this.tunnelChoiseIndex].mtLength;
       let obj = {
        height,length
      }
      this.ktCompute(obj)
      // let mtUnitPrice = 0;
      // // mtUnitPrice = ((Number(length*height)/1000000)*(Number(kT.unitPrice)/1000)*(Number(kT.gram)/1000)).toFixed(3)/1;
      // mtUnitPrice =
      //   (
      //     (Number(height) * Number(length) * Number(kT.unitPrice)) /
      //     1000000
      //   ).toFixed(3) / 1;
      // console.log(Number(height), Number(length), Number(kT.unitPrice));
      // this.tunnelTissue[this.tunnelChoiseIndex].mtUnitPrice = mtUnitPrice;
      // this.tunnelTissue[this.tunnelChoiseIndex].gram = kT.gram;
    },
    caseChange(value) {
      console.log(value, 2222);
      let formula = this.boxTypeList.find(item => item.id == value);
      // console.log(formula,this.boxTypeList)
      if (
        this.finishedInfo.pdWidth &&
        this.finishedInfo.pdHigth &&
        this.finishedInfo.pdLength
      ) {
        this.facialTissue[this.facialChoiseIndex].mtWidth = finishedInfoFormula(
          formula.faceWidthMath,
          this.finishedInfo.pdLength,
          this.finishedInfo.pdWidth,
          this.finishedInfo.pdHigth
        );
        this.facialTissue[
          this.facialChoiseIndex
        ].mtLength = finishedInfoFormula(
          formula.faceLengthMath,
          this.finishedInfo.pdLength,
          this.finishedInfo.pdWidth,
          this.finishedInfo.pdHigth
        );
        this.tunnelTissue[
          this.tunnelChoiseIndex
        ].mtHeight = finishedInfoFormula(
          formula.pitHeightMath,
          this.finishedInfo.pdLength,
          this.finishedInfo.pdWidth,
          this.finishedInfo.pdHigth
        );
        this.tunnelTissue[
          this.tunnelChoiseIndex
        ].mtLength = finishedInfoFormula(
          formula.pitLengthMath,
          this.finishedInfo.pdLength,
          this.finishedInfo.pdWidth,
          this.finishedInfo.pdHigth
        );
      }
    },
    orderCost() {
      this.basicData.odMoney =
        (
          Number(this.basicData.odCount) * Number(this.basicData.unitPrice)
        ).toFixed(3) / 1; //订单金额
    },
    processing() {
      // let facialLength = 0;
      // let facialWidth = 0;
      let surfaceArea = 0;
      this.facialTissue.forEach(item => {
        surfaceArea += (Number(item.mtLength) * Number(item.mtWidth) * 0.000001).toFixed(3) / 1;
        // facialLength += Number(item.mtLength);
        // facialWidth += Number(item.mtWidth);
      });

      // 表面 加工费
      this.surface.area = surfaceArea;
      let psUnitPrice, psCount, psCostBase, psCost, psType, area;

      area = surfaceArea<0.5? 0.5 :surfaceArea; //面积
      let beerNum = this.beerNum.find(
        item => item.key == this.basicData.beerCount
      ).value;
      // console.log(beerNum, "beerNum");
      psCount = Number(this.basicData.odCount) / Number(beerNum); //数量
      // console.log(psCount, "psCount");
      let paperNum = this.paperNum.find(
        item => item.key == this.basicData.paperCount
      );
      //  console.log(this.basicData.paperCount,this.paperNum,"sadasdasdasdsa")
      psCostBase = paperNum.value.split("/")[1]; //加工费计费基准
      psUnitPrice = (Number(psCostBase) * Number(area)).toFixed(3) / 1; //加工单价
      psCost = this.processingCost.psCost
      // psCost = (psUnitPrice * psCount).toFixed(3) / 1; //人工费用
      this.processingCost = {
        area,
        psCount,
        psCostBase,
        psUnitPrice,
        psCost,
        psType: 0,
        id: this.$route.query.id ? this.processingCost.id : ""
      };
    },
    addItem(type) {
      if (type == 0) {
        //面纸

        if (
          this.finishedInfo.pdWidth &&
          this.finishedInfo.pdHigth &&
          this.finishedInfo.pdLength &&
          String(this.basicData.odCount) &&
          String(this.basicData.paperCount) &&
          String(this.basicData.caseType) &&
          String(this.basicData.beerCount)
        ) {
          let width, length, mtUnitPrice;
          let formula = this.boxTypeList.find(
            item => item.id == this.basicData.caseType
          );
          console.log(formula);
          length = finishedInfoFormula(
            formula.faceLengthMath,
            this.finishedInfo.pdLength,
            this.finishedInfo.pdWidth,
            this.finishedInfo.pdHigth
          );
          width = finishedInfoFormula(
            formula.faceWidthMath,
            this.finishedInfo.pdLength,
            this.finishedInfo.pdWidth,
            this.finishedInfo.pdHigth
          );
          // length = ((Number(this.finishedInfo.pdLength)*2 + Number(this.finishedInfo.pdWidth)*2)+5);
          // width = (Number(this.finishedInfo.pdHigth)+Number(this.finishedInfo.pdWidth)+5);
          mtUnitPrice = 0;

          let facialTissueInfo = {
            spId: "", //供应商
            mtModel: "", //面纸类型and面纸型号
            mtLength: length, //面纸长
            mtWidth: width, //面纸宽
            mtUnitPrice: mtUnitPrice, //面纸单价,
            mtCount: "", //面纸数量
            mtCost: "", //面纸成本
            mtType: 1, //面纸
            gram: "",
            active:''
            //克数
          };

          this.facialTissue.push(facialTissueInfo);
          this.processing();
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
        } else {
          return this.$message.warning(
            "请完成填写箱型,成品高，成品宽，成品宽，订单数量，纸层数，啤板拼数的信息"
          );
        }
      } else if (type == 1) {
        //坑纸
        // if(this.facialTissue.length == 0 ){
        //   // return this.$message.warning('请完成填写面纸的信息')

        // }else{
        if (
          this.finishedInfo.pdWidth &&
          this.finishedInfo.pdHigth &&
          this.finishedInfo.pdLength &&
          String(this.basicData.odCount) &&
          String(this.basicData.paperCount) &&
          String(this.basicData.caseType) &&
          String(this.basicData.beerCount)
        ) {
          let height = 0;
          let mtUnitPrice = 0;
          let length = 0;
          // this.facialTissue.forEach(item=>{
          //   height += Number(item.mtLength);
          //   length += Number(item.mtWidth);
          //   console.log(item,item.mtLength,item.mtWidth)
          // })
          let formula = this.boxTypeList.find(
            item => item.id == this.basicData.caseType
          );
          console.log(formula);
          length = finishedInfoFormula(
            formula.pitLengthMath,
            this.finishedInfo.pdLength,
            this.finishedInfo.pdWidth,
            this.finishedInfo.pdHigth
          );
          height = finishedInfoFormula(
            formula.pitHeightMath,
            this.finishedInfo.pdLength,
            this.finishedInfo.pdWidth,
            this.finishedInfo.pdHigth
          );
          // mtUnitPrice = Number(height)*Number(length);
          // debugger
          let tunnelTissueInfo = {
            spId: "", //供应商
            mtModel: "", //面纸类型and面纸型号
            mtLength: length, //面纸长
            mtHeight: height, //面纸宽
            mtUnitPrice: mtUnitPrice, //面纸单价,
            mtCount: "", //面纸数量
            mtCost: "", //面纸成本
            mtType: 2, //坑纸
            gram: "",
            active:''
            //克数
          };
          this.tunnelTissue.push(tunnelTissueInfo);
          // console.log(tunnelTissueInfo);
        } else {
          return this.$message.warning(
            "请完成填写箱型,成品高，成品宽，成品宽，订单数量，纸层数,啤板拼数的信息"
          );
        }
        // }
      } else {
        let other = {
          psCost: 0,
          remarkKey: "",
          psType: 3
        };
        this.other.push(other);
        console.log(this.other);
      }
    },
    async handleRemove(file, fileList) {
      console.log(file, fileList);

      let fileInfo = file.response ? file.response.data[0] : file;
      let obj = {
        id: fileInfo.id,
        realName: fileInfo.realName
      };
      console.log(obj);
      let res = await delFile(obj);
      let index = this.fileList.findIndex(
        item => item.realName == fileInfo.realName
      );
      // this.fileList.splice(index,1);
      this.suerFile.splice(index, 1);
      this.$message({
        type: "success",
        message: res.returnMsg
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      // console.log(file)
      return this.$confirm(`确定移除 ${file.name}？`);
      // if (file && file.status==="success") {
      //移除前方法

      // }
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      let fileArr = [];
      response.data.forEach(item => {
        let obj = {
          name: item.oldName
        };
        fileArr.push(obj);
      });

      this.suerFile = [...this.suerFile, ...response.data];
      this.fileLis = [...fileArr];
      console.log(this.fileList, this.suerFile, "file");
    }
  }
};
</script>

<style lang="scss" scoped>
.warp {
  .materActive{
    background: rgba(238, 241, 246,.8)
  }
  .form-inline {
    width: 300px;
  }
  .form-inline-big {
    width: 400px;
  }
  .facialTissue {
    text-align: left;
    padding: 20px;
    .h1 {
      font-weight: 600;
      font-size: 26px;
    }
    .upload {
      padding: 20px;
      width: 360px;
    }
  }
}
</style>