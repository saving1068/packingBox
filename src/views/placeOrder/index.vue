<template>
  <div class="warp">
      <el-from sizi='mini'> 
          <el-form-item label="箱形">
            <el-select v-model="basicData.boxType" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="订单数量">
           <el-input v-model="basicData.orderNumber" placeholder="请输入订单数量"></el-input>
        </el-form-item>
        <el-form-item label="单价（元）">
           <el-input  v-model="basicData.unitPrice"  placeholder="请输入单价（元）"></el-input>
        </el-form-item>
        <el-form-item label="订单金额（元）">
           <el-input  v-model="basicData.allPrice"  placeholder="请输入订单金额（元）"></el-input>
        </el-form-item>
        <el-form-item label="加工工序">
            <el-select v-model="basicData.tapping" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="啤板名称">
             <el-input  v-model="basicData.beerPlate" placeholder="请输入啤板名称"></el-input>
        </el-form-item>
        <el-form-item label="啤板拼数">
            <el-select v-model="basicData.beerNum" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="纸层数">
            <el-select v-model="basicData.paperNum" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="印刷颜色">
            <el-select v-model="basicData.printingColor" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="印后处理">
            <el-select v-model="basicData.printingHandle" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="绳加半包">
            <el-select v-model="basicData.packAsk" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
      </el-from>
      <el-from sizi='mini'>
         <el-form-item label="成品长">
             <el-input v-model="finishedInfo.length" placeholder="请输入成品长"></el-input>
        </el-form-item>
        <el-form-item label="成品宽">
             <el-input v-model="finishedInfo.width" placeholder="请输入成品宽"></el-input>
        </el-form-item>
        <el-form-item label="成品高">
             <el-input v-model="finishedInfo.height" placeholder="请输入成品高"></el-input>
        </el-form-item>
      </el-from>
      <el-from sizi='mini'>
          <!-- <template slot="header">
                safsd
            </template> -->
         <el-form-item label="成品长">
             <el-input placeholder="请输入成品长"></el-input>
        </el-form-item>
        <el-form-item label="成品宽">
             <el-input placeholder="请输入成品宽"></el-input>
        </el-form-item>
        <el-form-item label="成品高">
             <el-input placeholder="请输入成品高"></el-input>
        </el-form-item>
      </el-from>
      <div class="facialTissue">
          
      </div>
    </div> 
</template>

<script>
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
            finishedInfo:{
                Length:'',
                width:"",
                height:''
            },
            orderInfo:{
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .warp{

    }
</style>