<template>
  <div>
    {{ tableData }}
    <el-table
      class="table"
      border
      :data="tableData"
      @row-click="onRowClick"
    >
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
    },
    onRowClick (data) {
      console.log(data)
      this.$router.push({
        name: 'Runtime',
        params: {
          id: data.id,
          today: new Date()
        },
        props: true
      })
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
