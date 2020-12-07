<template>
  <div>
    {{ tableData }}
    <el-table :data="tableData" class="table" border>
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
.table {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>
