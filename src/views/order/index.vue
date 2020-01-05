<template>
  <div class="warp">
    <div class="search">
      <div>
        <el-input
          clearable
          size="mini"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchValue"
        ></el-input>
      </div>

      <el-select size="mini" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="table center">
      <el-table :data="tableData" fit >
        <el-table-column prop="date" align='center' label="日期" width="180"></el-table-column>
        <el-table-column prop="name" align='center' label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" align='center' label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  // flex-direction: column;
}
.table{
	padding: 0 20px;
}
</style>

