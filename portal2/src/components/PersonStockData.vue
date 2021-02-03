<template>
  <div>
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
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PersonStockData',
  // props: ['name', 'table']
  props: {
    // name: {
    //   type: String,
    //   default: ''
    // },
    tableData: {
      type: Array,
      default: () => []
    }
  }
  // data() {
  //   return {
  //     name: '123',
  //     tableData: [
  //       {
  //         id: 1,
  //         name: '123'
  //       }
  //     ]
  //   }
  // }
}
</script>
