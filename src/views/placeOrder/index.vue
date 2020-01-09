<template>
  <div class="warp">
      <el-from sizi='mini'> 
          <el-form-item label="加工工序">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
      </el-from>
    </div> 
</template>

<script>
export default {
    data(){
        return{
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