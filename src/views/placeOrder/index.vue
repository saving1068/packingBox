<template>
  <div class="warp">
      <el-form size='mini' inline  label-width="100px"> 
          <el-form-item label="箱形:"  class="form-inline">
            <el-select v-model="basicData.boxType" placeholder="请选择" >
                <el-option
                v-for="item in boxTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="订单数量:" class="form-inline">
           <el-input v-model="basicData.orderNumber" placeholder="请输入订单数量"></el-input>
        </el-form-item>
        <el-form-item label="包装要求:" class="form-inline">
            <el-select v-model="basicData.packAsk" placeholder="请选择">
                <el-option
                v-for="item in packAsk"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="加工工序:" class="form-inline">
            <el-select v-model="basicData.tapping" placeholder="请选择">
                <el-option
                v-for="item in tappingList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单价(元):" class="form-inline">
           <el-input  v-model="basicData.unitPrice"  placeholder="请输入单价（元）"></el-input>
        </el-form-item>
        
        
        <el-form-item label="啤板名称:" class="form-inline">
             <el-input  v-model="basicData.beerPlate" placeholder="请输入啤板名称"></el-input>
        </el-form-item>
         <el-form-item label="纸层数:" class="form-inline">
            <el-select v-model="basicData.paperNum" placeholder="请选择">
                <el-option
                v-for="item in paperNum"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="订单金额(元):" class="form-inline">
           <el-input  v-model="basicData.allPrice"  placeholder="请输入订单金额（元）"></el-input>
        </el-form-item>
       
        <el-form-item label="啤板拼数:" class="form-inline">
            <el-select v-model="basicData.beerNum" placeholder="请选择">
                <el-option
                v-for="item in beerNum"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="印刷颜色:" class="form-inline">
            <el-select v-model="basicData.printingColor" placeholder="请选择">
                <el-option
                v-for="item in printingColor"
               :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="印后处理:" class="form-inline">
            <el-select v-model="basicData.printingHandle" placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  class="form-inline">
            <!-- <el-select v-model="basicData.printingHandle" placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select> -->
        </el-form-item>
      </el-form>
      <el-form size='mini' inline label-width="100px">
         <el-form-item label="成品长:"  class="form-inline">
             <el-input v-model="finishedInfo.length" placeholder="请输入成品长"></el-input>
        </el-form-item>
        <el-form-item label="成品宽:"  class="form-inline">
             <el-input v-model="finishedInfo.width" placeholder="请输入成品宽"></el-input>
        </el-form-item>
        <el-form-item label="成品高:"  class="form-inline">
             <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input>
        </el-form-item>
      </el-form>

      <div class="facialTissue">
          <div class="space-between">
              <div class="h1">面纸</div> 
            <el-button type="primary" @click="addItem" icon="el-icon-edit">新增</el-button>
          </div>
         
         <el-form size='mini' inline label-width="100px" style="padding:20px">
            <el-form-item label="面纸供应商:"  class="form-inline">
               <el-select  placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="面纸型号:"  class="form-inline">
               <el-select  placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="面纸长:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
            <el-form-item label="面纸宽:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
            <el-form-item label="面纸单价:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
            <el-form-item label="面纸数量:"  class="form-inline">
                <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input>
            </el-form-item>
            <el-form-item label="面纸成本:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
            <el-form-item label="面纸类型:"  class="form-inline">
                <el-input  placeholder="请输入面纸类型"></el-input>
            </el-form-item>
            <el-form-item label="面纸克数:"  class="form-inline">
                <el-input  placeholder="请输入面纸克数"></el-input>
            </el-form-item>
            <el-form-item label="面纸单价:"  class="form-inline">
                <el-input  placeholder="请输入面纸单价"></el-input>
            </el-form-item>
        </el-form>
      </div>
      <div class="facialTissue">
          <div class="space-between">
              <div class="h1">坑纸</div> 
            <el-button type="primary" @click="addItem" icon="el-icon-edit">新增</el-button>
          </div>
         
         <el-form size='mini' inline label-width="100px" style="padding:20px">
            <el-form-item label="坑纸供应商:"  class="form-inline">
               <el-select  placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="坑纸型号:"  class="form-inline">
               <el-select  placeholder="请选择">
                <el-option
                v-for="item in printingHandle"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="面纸长:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
            <el-form-item label="坑纸高:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
            <el-form-item label="坑纸单价:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
            <el-form-item label="坑纸数量:"  class="form-inline">
                <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input>
                <!-- <span>123</span> -->
            </el-form-item>
            <el-form-item label="坑纸成本:"  class="form-inline">
                <!-- <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input> -->
                <span>123</span>
            </el-form-item>
        </el-form>
      </div>
    </div> 
</template>

<script>
import {dictApi} from '@/utils'
export default {
    data(){
        return{
            basicData:{
                boxType:'',//箱型
                orderNumber:'',//订单数量
                unitPrice:'',//单价
                allPrice:'',//订单金额
                tapping:"",//加工工序
                beerPlate:'',//啤板
                beerNum:"",//啤板拼数
                paperNum:'',//纸层数
                printingColor:'',//印刷颜色,
                printingHandle:'',//印后处理
                packAsk:'',//包装要求
            },
            boxTypeList:[],
            tappingList:[],
            beerNum:[],
            paperNum:[],
            printingColor:[],
            printingHandle:[],
            packAsk:[],
            finishedInfo:{
                Length:'',
                width:"",
                height:''
            },
            orderInfo:{
                
            },
            dataList:[]
        }
    },
    created(){
        this.dict().then(()=>{

        })
    },
    methods:{
        async dict(){
            this.boxTypeList = await dictApi('boxType');
            this.tappingList = await dictApi('tapping');
            this.beerNum = await dictApi('beerNum');
            this.paperNum = await dictApi('paperNum');
            this.printingColor = await dictApi('printingColor');
            this.printingHandle = await dictApi('printingHandle');
            // console.log(this.boxTypeList)
        }
    }
}
</script>

<style lang="scss" scoped>
    .warp{
        .form-inline{
            width: 300px;
        }
        .facialTissue{
            text-align: left;
            padding: 20px;
            .h1{
                font-weight: 600;
                font-size: 26px;
            }
        }
    }
</style>