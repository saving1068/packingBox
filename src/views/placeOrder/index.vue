<template>
  <div class="warp">
    <el-form size="mini" inline label-width="100px">
      <el-form-item label="箱形:" class="form-inline">
        <el-select v-model="basicData.boxType" placeholder="请选择">
          <el-option
            v-for="item in boxTypeList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单数量:" class="form-inline">
        <el-input v-model="basicData.orderNumber" placeholder="请输入订单数量"></el-input>
      </el-form-item>
      <el-form-item label="包装要求:" class="form-inline">
        <el-select v-model="basicData.packAsk" placeholder="请选择">
          <el-option v-for="item in packAsk" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="加工工序:" class="form-inline">
        <el-select v-model="basicData.tapping" placeholder="请选择">
          <el-option
            v-for="item in tappingList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
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
        <el-select v-model="basicData.paperNum" placeholder="请选择">
          <el-option v-for="item in paperNum" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单金额(元):" class="form-inline">
        <el-input v-model="basicData.allPrice" placeholder="请输入订单金额（元）"></el-input>
      </el-form-item>

      <el-form-item label="啤板拼数:" class="form-inline">
        <el-select v-model="basicData.beerNum" placeholder="请选择">
          <el-option v-for="item in beerNum" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="印刷颜色:" class="form-inline">
        <el-select v-model="basicData.printingColor" placeholder="请选择">
          <el-option
            v-for="item in printingColor"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="印后处理:" class="form-inline">
        <el-select v-model="basicData.printingHandle" placeholder="请选择">
          <el-option
            v-for="item in printingHandle"
            :key="item.key"
            :label="item.value"
            :value="item.key"
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
        <el-input  v-model.number="finishedInfo.length" placeholder="请输入成品长"></el-input>
      </el-form-item>
      <el-form-item label="成品宽:" class="form-inline">
        <el-input v-model.number="finishedInfo.width" placeholder="请输入成品宽"></el-input>
      </el-form-item>
      <el-form-item label="成品高:" class="form-inline">
        <el-input v-model.number="finishedInfo.height" placeholder="请输入成品高"></el-input>
      </el-form-item>
    </el-form>

    <div class="facialTissue">
      <div class="space-between">
        <div class="h1">面纸</div> 
        <el-button type="primary" @click="addItem(0)" icon="el-icon-edit">新增</el-button>
      </div>

      <el-form size="mini" inline label-width="100px" style="padding:20px">
        <el-form-item v-for="(item,index) in facialTissue" :key='index' >
            {{item}}
            <div @click="choiseItem(item,index)">
                 <el-form-item label="面纸供应商:" class="form-inline">
            <el-select placeholder="请选择" v-model="item.spId">
              <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面纸型号:" class="form-inline">
            <el-select placeholder="请选择" v-model="item.mtModel">
              <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key"
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
            <el-input placeholder="请输入面纸类型"></el-input>
          </el-form-item>
          <el-form-item label="面纸克数:" class="form-inline">
            <el-input placeholder="请输入面纸克数"></el-input>
          </el-form-item>
          <el-form-item label="面纸单价:" class="form-inline">
            <el-input placeholder="请输入面纸单价"></el-input>
          </el-form-item>
            </div>
         
        </el-form-item>
      </el-form>
    </div>
    <div class="facialTissue">
      <div class="space-between">
        <!-- <div class="h1">坑纸</div>  -->
        <el-button type="primary" @click="addItem(1)" icon="el-icon-edit">新增</el-button>
      </div>

      <el-form size="mini" inline label-width="100px" style="padding:20px">
        <el-form-item label="坑纸" v-for="(item,index) in tunnelTissue" :key='index'>
          <el-form-item label="坑纸供应商:" class="form-inline" >
            <el-select placeholder="请选择">
              <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="坑纸型号:" class="form-inline">
            <el-select placeholder="请选择">
              <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面纸长:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>123</span>
          </el-form-item>
          <el-form-item label="坑纸高:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>123</span>
          </el-form-item>
          <el-form-item label="坑纸单价:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>123</span>
          </el-form-item>
          <el-form-item label="坑纸数量:" class="form-inline">
            <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input>
            <!-- <span>123</span> -->
          </el-form-item>
          <el-form-item label="坑纸成本:" class="form-inline">
            <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
            <span>123</span>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { dictApi } from "@/utils";
export default {
  data() {
    return {
      basicData: {
        boxType: "", //箱型
        orderNumber: "", //订单数量
        unitPrice: "", //单价
        allPrice: "", //订单金额
        tapping: "", //加工工序
        beerPlate: "", //啤板
        beerNum: "", //啤板拼数
        paperNum: "", //纸层数
        printingColor: "", //印刷颜色,
        printingHandle: "", //印后处理
        packAsk: "" //包装要求
      },
      boxTypeList: [],
      tappingList: [],
      beerNum: [],
      paperNum: [],
      printingColor: [],
      printingHandle: [],
      packAsk: [],
      finishedInfo: {
        length: "",
        width: "",
        height: ""
      },
      orderInfo: {},
      dataList: [],
      facialTissue:[],//面纸
      tunnelTissue:[],//坑纸
      choiseIndex:0
    };
  },
  created() {
    this.dict().then(() => {});
  },
    watch:{
        finishedInfo:{
            handler(value,oldValue){
                console.log(value,2222)
                let mtWidth,mtLength,mtUnitPrice;
                mtWidth = ((Number(value.length)*2 + Number(value.width)*2)+5);
                mtLength = (Number(value.height)+Number(value.width)+5);
                mtUnitPrice = ((Number(mtLength*mtWidth)/1000000)*(Number(4370)/1000)*(Number(350)/1000)).toFixed(3)/1;
                let obj = {
                    mtWidth,
                    mtLength,
                    mtUnitPrice,
                    // ...this.facialTissue[this.choiseIndex]
                }
                if(this.facialTissue.length !=0){
                    this.facialTissue[this.choiseIndex].mtWidth = mtWidth;
                     this.facialTissue[this.choiseIndex].mtLength = mtLength;
                      this.facialTissue[this.choiseIndex].mtUnitPrice = mtUnitPrice;
                }
            
            },
            deep:true
        }
        
        
    },
  methods: {
      choiseItem(item,index){
          this.choiseIndex = index
      },
      mtCountInput(value){
          console.log(value)
          this.facialTissue[this.choiseIndex].mtCost = (value*this.facialTissue[this.choiseIndex].mtUnitPrice).toFixed(3)/1;
            console.log(this.facialTissue[this.choiseIndex])
      },
    async dict() {
      this.boxTypeList = await dictApi("boxType");
      this.tappingList = await dictApi("tapping");
      this.beerNum = await dictApi("beerNum");
      this.paperNum = await dictApi("paperNum");
      this.printingColor = await dictApi("printingColor");
      this.printingHandle = await dictApi("printingHandle");
      // console.log(this.boxTypeList)
    },
    addItem(type){
        if(type == 0){//面纸
        console.log(this.finishedInfo)
            if(this.finishedInfo.width&&this.finishedInfo.height&&this.finishedInfo.length){
                let width,length,mtUnitPrice;
                width = ((Number(this.finishedInfo.length)*2 + Number(this.finishedInfo.width)*2)+5);
                length = (Number(this.finishedInfo.height)+Number(this.finishedInfo.width)+5);
                mtUnitPrice = ((Number(length*width)/1000000)*(Number(4370)/1000)*(Number(350)/1000)).toFixed(3)/1;
    
                let facialTissueInfo = {
                    spId:'',//供应商
                    mtModel:'',//面纸类型and面纸型号
                    mtLength:length,//面纸长
                    mtWidth:width,//面纸宽
                    mtUnitPrice:mtUnitPrice,//面纸单价,
                    mtCount:'',//面纸数量
                    mtCost:'',//面纸成本
                    mtType:1,//面纸
                    //克数
                }

                this.facialTissue.push(facialTissueInfo);

            }else{
                return this.$message.warning('请完成填写成品高，成品宽，成品宽的信息')
            }
        }else{//坑纸

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