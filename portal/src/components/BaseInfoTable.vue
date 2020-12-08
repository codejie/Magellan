<template>
  <div>
    {{ tableData }}
    <el-table :data="tableData" class="table" border>
      <el-table-column prop="id" label="ID" width="50"/>
      <el-table-column prop="type" label="TYPE"/>
      <el-table-column prop="market" label="MARKET"/>
      <el-table-column prop="code" label="CODE"/>
      <el-table-column prop="name" label="NAME"/>
      <el-table-column label="Operation" width="100">
        <template slot-scope="scope">
          <el-button @click="removeInfo(scope.row.id)" type="text" size="small">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['data', 'removeMethod'],
  computed: {
    tableData: function () {
      const ret = []
      for (let i = 0; i < this.data.length; ++i) {
        ret.push(this.data[i])
      }
      return ret
    }
  },
  methods: {
    removeInfo (id) {
      console.log(id)
      this.$confirm('Remove this record ?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.removeMethod(id)
      })
      // this.$parent.methods.click()
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
