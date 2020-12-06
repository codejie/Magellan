<template>
  <div>
    {{ tableData }}
    <el-table :data="tableData" style="border: 2px solid;">
      <el-table-column prop="id" label="ID" width="50"/>
      <el-table-column prop="type" label="TYPE"/>
      <el-table-column prop="market" label="MARKET"/>
      <el-table-column prop="code" label="CODE"/>
      <el-table-column prop="name" label="NAME"/>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    tableData: function () {
      const ret = []
      for (let i = 0; i < this.data.length; ++i) {
        ret.push(this.data[i])
      }
      return ret
    }
  }
}
</script>

<style scoped>
.el-table::before {
  background-color: blueviolet;
}
</style>
