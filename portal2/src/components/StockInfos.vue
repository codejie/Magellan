<template>
  <div class="frame">
    <div style="display:flex; justify-content:flex-end; width:100%; padding:0;">
      <el-button type="primary" plain @click="onAdd">添加..</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 90%"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="60"
        />
        <el-table-column
          prop="name"
          label="名称"
          width="180"
        />
        <el-table-column
          prop="price"
          label="价格"
          width="180"
        />
        <el-table-column
          prop="open"
          label="今开"
          width="180"
        />
        <el-table-column
          prop="close"
          label="昨关"
          width="180"
        />
        <el-table-column
          prop="created"
          label="加入日期"
          width="200"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockInfos',
  props: {
    // tableData: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.frame {
  width: 90%;
  height: 100%;
}
.table {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 4px;
  padding-left: 4px;
}
</style>
