<template>
  <div class="base">
    BaseInfo Table
    <div>
      {{ hello }}
    </div>
    <!-- <BaseInfoTable :data="[1,2,3]" /> -->
    <ApolloQuery :query=query
      :variables={id}
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error"> An Error</div>
        <div v-else-if="data">
           <BaseInfoTable :data=data.BaseInfo.many />
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
          <el-form-item label="TYPE" label-width="50px">
            <el-input v-model="form.market"/>
          </el-form-item>
          <el-form-item label="TYPE" label-width="50px">
            <el-input v-model="form.code"/>
          </el-form-item>
          <el-form-item label="TYPE" label-width="50px">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click=submit>Close</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import BaseInfoTable from './BaseInfoTable'

export default {
  components: {
    BaseInfoTable
  },
  apollo: {
    info: {
      query: gql`query a($id: Int!) {
          BaseInfo {
          one: oneById(id: $id) {
            id
          }
        }
      }`,
      update: data => data.BaseInfo,
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
    },
    addBaseInfo: {
      mutation: gql`mutation addBaseInfo ($type: Int!, $code: String!, $market: Int, $name: String) {
        BaseInfo {
          add (type: $type, code: $code, market: $market, name: $name)
        }
      }`,
      // variables: {
      //   type: this.data.form.type,
      //   market: this.data.form.market,
      //   code: this.data.form.code,
      //   name: this.data.form.name
      // },
      update: (data) => {
        console.log('mutation ret = ' + data)
      }
    }
  },
  data () {
    return {
      info: {},
      hello: '',
      id: 19,
      query: (gql) => gql`query { BaseInfo { many { id type market code name }}}`,
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
    submit () {
      this.$apollo.mutate({
        mutation: gql`mutation addBaseInfo ($type: Int!, $code: String!, $market: Int, $name: String) {
          BaseInfo {
            add (type: $type, code: $code, market: $market, name: $name)
          }
        }`,
        variables: {
          type: this.form.type,
          market: this.form.market,
          code: this.form.code,
          name: this.form.name
        },
        update: (cache, { data }) => {
          console.log('mutation ret = ' + data.BaseInfo.add)
        }
      })
      this.showDialog = false
    }
  }
}
</script>
<style>
.btn {
  background-color: red;
}
</style>
