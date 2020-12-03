<template>
  <div>
    <h1>ddddd</h1>
    {{ tableData }}
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" width="100"/>
      <el-table-column prop="type" label="TYPE" width="100"/>
      <el-table-column prop="market" label="MARKET" width="100"/>
      <el-table-column prop="code" label="CODE" width="100"/>
      <el-table-column prop="name" label="NAME" width="100"/>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    tableData: function () {
      const ret = []
      // console.debug('data = ' + this.data)
      for (let i = 0; i < this.data.length; ++i) {
        // console.debug('i = ' + JSON.stringify(this.data[i]))
        ret.push(this.data[i])
      }
      return ret
    }
  }
}
</script>
