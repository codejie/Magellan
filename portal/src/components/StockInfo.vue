<template>
  <div class="base">
    StockInfo Table
    <div>
      {{ hello }}
    </div>
    <!-- <StockInfoTable :data="[1,2,3]" /> -->
    <ApolloQuery
      ref="tableQuery"
      :query=query
      :variables={id}
    >
      <template v-slot="{ result: { loading, error, data }}">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error"> An Error</div>
        <div v-else-if="data">
           <StockInfoTable :data=data.StockInfo.many :removeMethod=removeStockInfo />
        </div>
        <div v-else>No Result</div>
      </template>
    </ApolloQuery>
    <div style="padding-top: 10px">
      <el-button class="btn" type="primary" @click="showDialog = true">Add Base Info</el-button>
      <el-dialog
        title="add base info"
        :visible.sync="showDialog"
        width="30%">
        <el-form :model="form">
          <el-form-item label="TYPE" label-width="50px">
            <el-input v-model="form.type"/>
          </el-form-item>
          <el-form-item label="MARKET" label-width="50px">
            <el-input v-model="form.market"/>
          </el-form-item>
          <el-form-item label="CODE" label-width="50px">
            <el-input v-model="form.code"/>
          </el-form-item>
          <el-form-item label="NAME" label-width="50px">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click=addStockInfo>Close</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import StockInfoTable from './StockInfoTable'

export default {
  components: {
    StockInfoTable
  },
  apollo: {
    info: {
      query: gql`query a($id: Int!) {
          StockInfo {
          one: oneById(id: $id) {
            id
          }
        }
      }`,
      update: data => data.StockInfo,
      variables: {
        id: 20
      }
    },
    queryHello () {
      return {
        query: gql`query {
          hello
        }`,
        update: (data) => {
          console.log(data.hello)
        }
      }
    },
    hello () {
      return {
        query: gql`query {
          hello
        }`
      }
    }
  },
  data () {
    return {
      info: {},
      hello: '',
      id: 19,
      query: (gql) => gql`query { StockInfo { many { id type market code name }}}`,
      showDialog: false,
      form: {
        type: 0,
        market: 1,
        code: '000000',
        name: 'name'
      }
    }
  },
  methods: {
    click () {
      console.log('click')
    },
    addStockInfo () {
      this.$apollo.mutate({
        mutation: gql`mutation addStockInfo ($type: Int!, $code: String!, $market: Int, $name: String) {
          StockInfo {
            add (type: $type, code: $code, market: $market, name: $name)
          }
        }`,
        variables: {
          type: parseInt(this.form.type, 10),
          market: parseInt(this.form.market, 10),
          code: this.form.code,
          name: this.form.name
        },
        update: (cache, { data }) => {
          console.log('mutation ret = ' + data.StockInfo.add)
          this.$refs.tableQuery.getApolloQuery().refetch()
        }
        // errorPolicy: 'all'
      })
      this.showDialog = false
    },
    removeStockInfo (id) {
      this.$apollo.mutate({
        mutation: gql`mutation removeStockInfo ($id: Int!) {
          StockInfo {
            remove (id: $id)
          }
        }`,
        variables: {
          id: id
        },
        update: (cache, { data }) => {
          this.$refs.tableQuery.getApolloQuery().refetch()
        }
      })
    }
  }
}
</script>
<style>
.btn {
  background-color: red;
}
</style>
