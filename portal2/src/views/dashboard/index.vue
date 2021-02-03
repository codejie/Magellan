<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <ApolloQuery
      :query="gql.query"
      :variables="gql.variables"
    >
      <template #default="{ result: { loading, error, data }}">
        <div v-if="loading">Loading..</div>
        <div v-else-if="error">Fetch Data Failed</div>
        <div v-else-if="data">
          {{ data }}
          <person-stock-data :table="data.Person.stockData" />
        </div>
      </template>
    </ApolloQuery>
    <person-stock-data :table-data="tableData" />
  </div>
</template>

<script>
import PersonStockData from '@/components/PersonStockData.vue'
import { mapGetters } from 'vuex'
import QueryPersonStockData from '@/graphql/schema/person-stock-data.gql'

export default {
  name: 'Dashboard',
  components: {
    'person-stock-data': PersonStockData
  },
  data() {
    return {
      gql: {
        query: QueryPersonStockData,
        variables: {}
      },
      tableData: [
        {
          id: 1,
          name: 'name'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
